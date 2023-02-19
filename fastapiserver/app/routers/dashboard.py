import json
from bson import json_util
from fastapi import APIRouter
from app.routers import centros, monitorizacions, estadisticas
from starlette.responses import JSONResponse
from fastapi import status
from app.utils.format_to_json import format_aviso_to_json, format_centro_to_json, format_monitorizacion_to_json

router = APIRouter(
    prefix="/dashboard",
    tags=["dashboard"],
    responses={404: {"description": "Not found"}}
)


@router.get("/")
def dashboard():
    try:
        centros_data = centros.centros()
        monitorizacions_data = monitorizacions.monitorizacions()
        estadisticas_data = estadisticas.estadisticas_centros()
        data = {
            "centros": centros_data,
            "monitorizacions": monitorizacions_data,
            "estadisticas": estadisticas_data
        }

        return json.loads(json_util.dumps(data))
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro engadindo o dispositivo."})


from app.db import centros_collection, avisos_collection, monitorizacion_collection


@router.get("/dashboard2")
def dashboard2():
    try:
        centros = []
        avisos = []
        monitorizacions = []
        estadisticas_data = estadisticas.estadisticas_centros()
        centros_mongo = centros_collection.find()

        for centro in centros_mongo:

            avisos_mongo = avisos_collection.find(
                {"centroId": centro["_id"]})
            avisos_centro = []
            for aviso in avisos_mongo:
                aviso["electronica"] = next(
                    (item for item in centro["rede"]["electronica"] if item["_id"] == aviso["electronicaId"]), None)
                aviso = format_aviso_to_json(aviso)
                avisos_centro.append(aviso)
                # avisos.append(aviso)

            monitorizacions_mongo = monitorizacion_collection.find(
                {"centroId": centro["_id"], "status": "open"})
            monitorizacions_centro = []
            for monitorizacion in monitorizacions_mongo:
                monitorizacion["electronica"] = next(
                    (item for item in centro["rede"]["electronica"] if item["_id"] == monitorizacion["electronicaId"]), None)
                monitorizacion = format_monitorizacion_to_json(monitorizacion)
                monitorizacions_centro.append(monitorizacion)
                # monitorizacions.append(monitorizacion)

            centro = format_centro_to_json(centro)
            centros.append({"centro": centro, "avisos": avisos_centro,
                           "monitorizacions": monitorizacions_centro})

        data = {
            "centros": centros,
            "avisos": avisos,
            "monitorizacions": monitorizacions,
        }

        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": {"centros": centros, "estadisticas": estadisticas_data}})
        # return json.loads(json_util.dumps(data))
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro cargando o panel."})
