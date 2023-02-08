import json
from bson.objectid import ObjectId
from bson.son import SON
from bson import json_util
from fastapi import APIRouter
from app.db import monitorizacion_collection, centros_collection, avisos_collection, tipo_electronica_collection

router = APIRouter(
    prefix="/avisos",
    tags=["avisos"],
    responses={404: {"description": "Not found"}}
)


@router.get("/")
def avisos():
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
            "_id": resultado["_id"],
            "data": resultado["data"],
            "centro": centro["centro"],
            "electronica": electronica[0],
            "status": resultado["status"],
        }
        avisos.append(aviso)

    return json.loads(json_util.dumps(avisos))
