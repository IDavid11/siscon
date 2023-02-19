import json
from bson.objectid import ObjectId
from bson import json_util
from fastapi import APIRouter
from app.db import monitorizacion_collection, centros_collection
from starlette.responses import JSONResponse
from fastapi import status
from app.utils.format_to_json import format_monitorizacion_to_json

router = APIRouter(
    prefix="/monitorizacions",
    tags=["monitorizacions"],
    responses={404: {"description": "Not found"}}
)


@router.get("/")
def monitorizacions():
    try:
        monitorizacions = []
        resultados = monitorizacion_collection.find()

        for resultado in resultados:

            centro = centros_collection.find_one(
                {"_id": ObjectId(resultado["centroId"])})

            pipeline = [
                {"$unwind": "$rede.electronica"},
                {"$match": {
                    "rede.electronica._id": ObjectId(resultado["electronicaId"])
                }}]

            res = centros_collection.aggregate(
                pipeline)
            electronica = []
            for item in res:
                electronica.append(item["rede"]["electronica"])

            monitorizacion = {
                "_id": str(resultado["_id"]),
                "data": resultado["data"],
                "centro": centro["centro"],
                "electronica": electronica[0],
                "status": resultado["status"],
            }
            monitorizacion["electronica"]["_id"] = str(
                monitorizacion["electronica"]["_id"])
            monitorizacions.append(monitorizacion)

        return json.loads(json_util.dumps(monitorizacions))
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro obtendo as monitorizacións."})


@router.get("/{electronicaId}")
async def monitorizacions_electronica(electronicaId):
    try:
        historial = []
        monitorizacions_mongo = monitorizacion_collection.find(
            {"electronicaId": ObjectId(electronicaId)})
        for monitorizacion in monitorizacions_mongo:
            monitorizacion = format_monitorizacion_to_json(monitorizacion)
            historial.append(monitorizacion)

        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": historial})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro obtendo o historial de monitorizacións."})
