from bson.objectid import ObjectId
from fastapi import APIRouter
from app.db import centros_collection
from ..models.Centro import LAN
from starlette.responses import JSONResponse
from fastapi import status
from app.utils.format_to_json import format_electronica_to_json

router = APIRouter(
    prefix="/lan",
    tags=["lan"],
    responses={404: {"description": "Not found"}}
)


@router.post("/electronica")
async def electronica_rack(request: LAN):
    try:
        electronicaLan = []
        centro = centros_collection.find_one(
            {"rede.lans._id": ObjectId(request.lanId)})

        for lan in centro["rede"]["lans"]:
            if lan["_id"] == ObjectId(request.lanId):
                lan = lan["rango"].split(".")
                lan = f"{lan[0]}.{lan[1]}.{lan[2]}"
                print(lan)
                for item in centro["rede"]["electronica"]:
                    lan_ip = item["ip"].split(".")
                    lan_ip = f"{lan_ip[0]}.{lan_ip[1]}.{lan_ip[2]}"
                    if lan_ip == lan:
                        electronicaLan.append(item)

        electronicaLan = format_electronica_to_json(electronicaLan)

        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": electronicaLan})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro obtendo a electrónica da LAN."})


@router.post("/engadir")
def engadir_lan(request: LAN):
    try:
        centro = centros_collection.find_one(
            {"_id": ObjectId(request.centroId)})

        if not centro:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "O centro non existe."})

        lans = centro["rede"]["lans"]
        lan = {
            "_id": ObjectId(),
            "rango": request.rango,
            "rede": request.rede,
            "dhcp": request.dhcp
        }
        lans.append(lan)

        centros_collection.update_one(
            {"_id": centro["_id"]}, {
                "$set": {"rede.lans": lans}})

        lan["_id"] = str(lan["_id"])
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": lan})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro engadindo a LAN."})


@router.post("/actualizar")
def actualizar_lan(request: LAN):
    try:
        centro = centros_collection.find_one(
            {"_id": ObjectId(request.centroId)})

        if not centro:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "O centro non existe."})

        lans = centro["rede"]["lans"]

        for lan in lans:
            if str(lan["_id"]) == request.lanId:
                lan["rango"] = request.rango
                lan["rede"] = request.rede
                lan["dhcp"] = request.dhcp

        centros_collection.update_one(
            {"_id": centro["_id"]}, {
                "$set": {"rede.lans": lans}})

        for lan in lans:
            lan["_id"] = str(lan["_id"])
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": lans})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro actualizando a LAN."})


@router.post("/eliminar")
def eliminar_lan(request: LAN):
    try:
        centro = centros_collection.find_one(
            {"_id": ObjectId(request.centroId)})

        if not centro:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "O centro non existe."})

        lans = centro["rede"]["lans"]
        for lan in lans:
            if str(lan["_id"]) == request.lanId:
                lans.remove(lan)
        centros_collection.update_one(
            {"_id": centro["_id"]}, {
                "$set": {"rede.lans": lans}})

        for lan in lans:
            lan["_id"] = str(lan["_id"])
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": lans})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro eliminando a LAN."})
