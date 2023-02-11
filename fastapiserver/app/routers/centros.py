from http.client import HTTPException
import json
from urllib.request import Request
from bson.objectid import ObjectId
from bson import json_util
from fastapi import APIRouter, Request
from app.db import centros_collection, monitorizacion_collection, tipo_electronica_collection
from ..models.Centro import BuscarCentro, CrearCentro, ActualizarLAN, EngadirLAN
from starlette.responses import JSONResponse
from fastapi import HTTPException, status

router = APIRouter(
    prefix="/centros",
    tags=["centros"],
    responses={404: {"description": "Not found"}}
)


@router.get("/")
def centros():
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
            avisos.append(monitorizacion)

        resposta = {
            "centro": centro,
            "avarias": avisos
        }
        centros.append(resposta)

    return json.loads(json_util.dumps(centros))


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
async def actualizar_centro(request: Request):
    try:
        data = await request.json()
        centro = data["centro"]
        centroId = ObjectId(centro["_id"])
        del centro["_id"], centro["main_network_checked"], centro["network_checked"]
        print(centro)

        centros_collection.update_one(
            {"_id": centroId}, {"$set": centro})

        return JSONResponse(status_code=status.HTTP_200_OK, content="")
    except:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="")
