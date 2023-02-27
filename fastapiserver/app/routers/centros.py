from http.client import HTTPException
import json
from urllib.request import Request
from bson.objectid import ObjectId
from bson import json_util
from fastapi import APIRouter, Request
from app.db import centros_collection, monitorizacion_collection, tipo_electronica_collection, avisos_collection
from ..models.Centro import BuscarCentro, Centro, CrearCentro, ActualizarLAN, EngadirLAN, PredecirCentro, EscollerCentro
from starlette.responses import JSONResponse
from fastapi import HTTPException, status
from pymongo.collection import ReturnDocument
from app.utils.format_to_json import format_aviso_to_json, format_centro_to_json, format_monitorizacion_to_json

router = APIRouter(
    prefix="/centros",
    tags=["centros"],
    responses={404: {"description": "Not found"}}
)


@router.get("/")
def centros():
    try:
        centros = []
        resultados = centros_collection.find()

        for centro in resultados:
            up = []
            down = []
            del centro["contrasinais"]
            centro["_id"] = str(centro["_id"])
            for plano in centro["planos"]:
                plano["_id"] = str(plano["_id"])
                for planta in plano["plantas"]:
                    planta["_id"] = str(planta["_id"])
            for lan in centro["rede"]["lans"]:
                lan["_id"] = str(lan["_id"])
            for item in centro["rede"]["electronica"]:
                item["_id"] = str(item["_id"])
                if item["status"] == "up":
                    up.append(item)
                if item["status"] == "down":
                    down.append(item)
            for rack in centro["rede"]["racks"]:
                rack["_id"] = str(rack["_id"])
            centro["porcentaxe"] = round(
                (len(up) / len(centro["rede"]["electronica"])) * 100)

            avisos = []
            filter = {"centroId": ObjectId(centro["_id"]), "status": "open"}
            monitorizacions = monitorizacion_collection.find(filter)

            for monitorizacion in monitorizacions:
                monitorizacion["_id"] = str(monitorizacion["_id"])
                monitorizacion["centroId"] = str(monitorizacion["centroId"])
                monitorizacion["electronicaId"] = str(
                    monitorizacion["electronicaId"])
                avisos.append(monitorizacion)

            resposta = {
                "centro": centro,
                "avarias": avisos
            }
            centros.append(resposta)

        return json.loads(json_util.dumps(centros))
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro obtendo os centros."})


@router.post("/buscar")
def pick(index_request: BuscarCentro):
    centro = centros_collection.find_one(
        {'_id': ObjectId(index_request.index)})

    centro["_id"] = str(centro["_id"])
    del centro["contrasinais"]

    return centro


@router.get("/ubicacions")
def pick():
    centros = []
    centros_db = centros_collection.find()
    for centro in centros_db:
        centros.append(
            {"location": centro["ubicacion"], "network_status": centro["network_status"]})

    return centros


@router.post("/crear")
def crear_centro(request: CrearCentro):

    # CAMBIAR ISTO
    centro = centros_collection.find_one(
        {"centro": {"$regex": request.codigo}})

    if centro:
        raise HTTPException(status_code=400, detail="O centro xa existe")

    novo_centro = {
        "sf": request.sf,
        "centro": f"{request.codigo} - {request.nome_centro.upper()}",
        "concello": request.concello,
        "proxecto": request.proxecto,
        "comentario": request.comentario
    }

    centros_collection.insert_one(novo_centro)

    return "Done"


@router.post("/actualizar")
def actualizar_centro(request: Centro):
    try:

        centro_mongo = centros_collection.find_one(
            {"_id": ObjectId(request.centroId)})
        if not centro_mongo:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "O centro non existe."})

        centro_actualizado = centros_collection.find_one_and_update({"_id": ObjectId(request.centroId)}, {"$set": {
            "centro": request.centro.upper(),
            "sf": request.sf.upper(),
            "concello": request.concello.upper(),
            "proxecto": request.proxecto,
            "comentario": request.comentario,
            "rede.tap": request.tap,
            "rede.tar": request.tar,
        }}, return_document=ReturnDocument.AFTER)
#
        for plano in centro_actualizado["planos"]:
            plano["_id"] = str(plano["_id"])
            for planta in plano["plantas"]:
                planta["_id"] = str(planta["_id"])
        for lan in centro_actualizado["rede"]["lans"]:
            lan["_id"] = str(lan["_id"])
        for item in centro_actualizado["rede"]["electronica"]:
            item["_id"] = str(item["_id"])
        for rack in centro_actualizado["rede"]["racks"]:
            rack["_id"] = str(rack["_id"])
#
        centro_actualizado["_id"] = str(centro_actualizado["_id"])

        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": centro_actualizado})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro actualizando o centro."})


@router.get("/info-sistemas/{centroId}")
def obter_info_sistemas(centroId):
    try:
        centro = centros_collection.find_one(
            {"_id": ObjectId(centroId)})
        infoSistemas = {
            "controladora": centro["rede"]["controladora"],
            "contrasinal_conmutadores": centro["contrasinais"]["siega"]["admin"],
            "contrasinal_siega": centro["contrasinais"]["siega"]["siega"],
        }
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": infoSistemas})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro obtendo a información de sistemas."})


@router.post("/busqueda")
def pick(request: PredecirCentro):
    try:
        prediccions = []
        resultados = centros_collection.find(
            {"centro": {"$regex": request.centro.upper()}})
        for centro in resultados.limit(5):
            centro = format_centro_to_json(centro)
            prediccions.append(centro)
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": prediccions})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro realizando a búsqueda."})


@router.get("/{centroId}")
def pick(centroId):
    try:
        centro = centros_collection.find_one(
            {"_id": ObjectId(centroId)})

        monitorizacions_mongo = monitorizacion_collection.find(
            {"centroId": centro["_id"], "status": "open"})
        monitorizacions_centro = []
        for monitorizacion in monitorizacions_mongo:
            monitorizacion["electronica"] = next(
                (item for item in centro["rede"]["electronica"] if item["_id"] == monitorizacion["electronicaId"]), None)
            monitorizacion = format_monitorizacion_to_json(monitorizacion)
            monitorizacions_centro.append(monitorizacion)

        centro = format_centro_to_json(centro)
        data = {"centro": centro, "monitorizacions": monitorizacions_centro}

        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": data})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro realizando a búsqueda."})
