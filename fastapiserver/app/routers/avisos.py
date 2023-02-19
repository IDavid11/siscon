from bson.objectid import ObjectId
from fastapi import APIRouter
from app.db import centros_collection, avisos_collection, tipo_electronica_collection
from starlette.responses import JSONResponse
from fastapi import status
from app.utils.format_to_json import format_aviso_to_json

router = APIRouter(
    prefix="/avisos",
    tags=["avisos"],
    responses={404: {"description": "Not found"}}
)


@router.get("/")
def avisos():
    try:
        avisos = []
        resultados = avisos_collection.find()

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

            tipo_electronica = tipo_electronica_collection.find_one(
                {"id": electronica[0]["tipo"]})
            electronica[0]["tipo"] = tipo_electronica["nome"]

            aviso = {
                "_id": str(resultado["_id"]),
                "data": resultado["data"],
                "centro": centro["centro"],
                "electronica": electronica[0],
                "status": resultado["status"],
            }
            aviso["electronica"]["_id"] = str(aviso["electronica"]["_id"])
            avisos.append(aviso)

        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": avisos})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro obtendo os avisos."})


@router.get("/{electronicaId}")
async def avisos_electronica(electronicaId):
    try:
        historial = []
        avisos_mongo = avisos_collection.find(
            {"electronicaId": ObjectId(electronicaId)})
        for aviso in avisos_mongo:
            aviso = format_aviso_to_json(aviso)
            historial.append(aviso)

        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": historial})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro obtendo o historial de avisos."})
