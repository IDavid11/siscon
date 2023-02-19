import json
from bson import json_util
from fastapi import APIRouter
from app.db import centros_collection
from starlette.responses import JSONResponse
from fastapi import status

router = APIRouter(
    prefix="/estadisticas",
    tags=["estadisticas"],
    responses={404: {"description": "Not found"}}
)


@router.get("/centros")
def estadisticas_centros():
    try:
        estadisticas = []
        centros_mongo = centros_collection.count_documents({})

        filtro_routers_up = {"rede.electronica.tipo": "Router",
                             "rede.electronica.status": "up"}
        centros_up = centros_collection.count_documents(filtro_routers_up)

        centros_abalar = centros_collection.count_documents(
            {"proxecto": "ABALAR"})
        centros_abalar_up = centros_collection.count_documents(
            {
                "proxecto": "ABALAR", "rede.electronica.tipo": "SW_Abalar", "rede.electronica.status": "up"})

        sw_abalar_totais = centros_collection.count_documents(
            {"proxecto": "ABALAR", "rede.electronica.tipo": "SW_Abalar"})
        sw_abalar_up = centros_collection.count_documents({"proxecto": "ABALAR",
                                                           "rede.electronica.tipo": "SW_Abalar", "rede.electronica.status": "up"})

        sw_siega_totais = centros_collection.count_documents(
            {"rede.electronica.tipo": "SW_Siega"})
        sw_siega_up = centros_collection.count_documents({"rede.electronica.tipo": "SW_Siega",
                                                          "rede.electronica.status": "up"})

        aps_edu_totais = centros_collection.count_documents(
            {"rede.electronica.tipo": "AP_edu_xunta_gal"})
        aps_edu_up = centros_collection.count_documents({"rede.electronica.tipo": "AP_edu_xunta_gal",
                                                        "rede.electronica.status": "up"})

        estadisticas.append({
            "centros": {
                "up": centros_up,
                "down": centros_mongo - centros_up
            }})
        estadisticas.append({
            "centros abalar": {
                "up": centros_abalar_up,
                "down": centros_abalar - centros_abalar_up
            }})
        estadisticas.append({
            "sw_abalar": {
                "up": sw_abalar_up,
                "down": sw_abalar_totais - sw_abalar_up
            }})
        estadisticas.append({
            "sw_siega": {
                "up": sw_siega_up,
                "down": sw_siega_totais - sw_siega_up
            }})
        estadisticas.append({
            "routers": {
                "up": centros_up,
                "down": centros_mongo - centros_up
            }})
        estadisticas.append({
            "aps": {
                "up": aps_edu_up,
                "down": aps_edu_totais - aps_edu_up
            }})

        return estadisticas
        # return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": estadisticas})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro obtendo as estadísticas."})
