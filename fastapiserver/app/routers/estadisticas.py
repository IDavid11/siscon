import json
from bson.objectid import ObjectId
from bson.son import SON
from bson import json_util
from fastapi import APIRouter
from app.db import monitorizacion_collection, centros_collection

router = APIRouter(
    prefix="/estadisticas",
    tags=["estadisticas"],
    responses={404: {"description": "Not found"}}
)


@router.get("/centros")
def estadisticas_centros():
    estadisticas = []
    centros_mongo = centros_collection.count_documents({})

    pipeline = [
        {"$group": {"rede.electronica.tipo": 1, "centros": {"$sum": 1}}},
        {"$project": {"status": "up"}}]

    pipeline2 = [
        {"$collStats": {"rede.electronica": {"tipo": 1, "status": "up"}}}
    ]

    filtro_routers_up = {"rede.electronica.tipo": 1,
                         "rede.electronica.status": "up"}
    centros_up = centros_collection.count_documents(filtro_routers_up)

    centros_abalar = centros_collection.count_documents({"proxecto": "Abalar"})
    centros_abalar_up = centros_collection.count_documents(
        {
            "proxecto": "Abalar", "rede.electronica.tipo": 1, "rede.electronica.status": "up"})

    sw_abalar_totais = centros_collection.count_documents(
        {"proxecto": "Abalar", "rede.electronica.tipo": 7})
    sw_abalar_up = centros_collection.count_documents({"proxecto": "Abalar",
                                                       "rede.electronica.tipo": 7, "rede.electronica.status": "up"})

    sw_siega_totais = centros_collection.count_documents(
        {"rede.electronica.tipo": 2})
    sw_siega_up = centros_collection.count_documents({"rede.electronica.tipo": 2,
                                                      "rede.electronica.status": "up"})

    aps_edu_totais = centros_collection.count_documents(
        {"rede.electronica.tipo": 4})
    aps_edu_up = centros_collection.count_documents({"rede.electronica.tipo": 4,
                                                     "rede.electronica.status": "up"})

    estadisticas.append({
        "centros": {
            "up": centros_up,
            "con_incidencias": 13,
            "down": centros_mongo - centros_up
        }})
    estadisticas.append({
        "centros abalar": {
            "up": centros_abalar_up,
            "con_incidencias": 13,
            "down": centros_abalar - centros_abalar_up
        }})
    estadisticas.append({
        "sw_abalar": {
            "up": sw_abalar_up,
            "con_incidencias": 13,
            "down": sw_abalar_totais - sw_abalar_up
        }})
    estadisticas.append({
        "sw_siega": {
            "up": sw_siega_up,
            "con_incidencias": 13,
            "down": sw_siega_totais - sw_siega_up
        }})
    estadisticas.append({
        "routers": {
            "up": centros_up,
            "con_incidencias": 13,
            "down": centros_mongo - centros_up
        }})
    estadisticas.append({
        "aps": {
            "up": aps_edu_up,
            "con_incidencias": 13,
            "down": aps_edu_totais - aps_edu_up
        }})

    return json.loads(json_util.dumps(estadisticas))
