from bson.objectid import ObjectId
from fastapi import APIRouter
from app.db import centros_collection
from ..models.Centro import Rack
from starlette.responses import JSONResponse
from fastapi import status
from app.models.Centro import ElectronicaRack
from app.utils.format_to_json import format_electronica_to_json

router = APIRouter(
    prefix="/rack",
    tags=["rack"],
    responses={404: {"description": "Not found"}}
)


@router.post("/electronica")
async def electronica_rack(request: ElectronicaRack):
    try:
        electronicaRack = []
        centro = centros_collection.find_one(
            {"_id": ObjectId(request.centroId)})

        for item in centro["rede"]["electronica"]:
            if item["ubicacion"] == request.nomeRack:
                electronicaRack.append(item)

        electronicaRack = format_electronica_to_json(electronicaRack)

        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": electronicaRack})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro obtendo a electrónica do rack."})


@router.post("/engadir")
def engadir_rack(request: Rack):
    try:
        centro = centros_collection.find_one(
            {"_id": ObjectId(request.centroId)})

        if not centro:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "O centro non existe."})

        racks = centro["rede"]["racks"]
        rack = {
            "_id": ObjectId(),
            "nome": request.nome,
            "tipo": request.tipo,
            "ubicacion": request.ubicacion
        }
        racks.append(rack)

        centros_collection.update_one(
            {"_id": centro["_id"]}, {
                "$set": {"rede.racks": racks}})

        rack["_id"] = str(rack["_id"])
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": rack})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro engadindo o rack."})


@router.post("/actualizar")
def actualizar_rack(request: Rack):
    try:
        centro = centros_collection.find_one(
            {"_id": ObjectId(request.centroId)})

        if not centro:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "O centro non existe."})

        racks = centro["rede"]["racks"]
        for rack in racks:
            if str(rack["_id"]) == request.rackId:
                rack["nome"] = request.nome
                rack["tipo"] = request.tipo
                rack["ubicacion"] = request.ubicacion

        centros_collection.update_one(
            {"_id": centro["_id"]}, {
                "$set": {"rede.racks": racks}})

        for rack in racks:
            rack["_id"] = str(rack["_id"])
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": racks})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro actualizando o rack."})


@router.post("/eliminar")
def eliminar_rack(request: Rack):
    try:
        centro = centros_collection.find_one(
            {"_id": ObjectId(request.centroId)})

        if not centro:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "O centro non existe."})

        racks = centro["rede"]["racks"]
        for rack in racks:
            if str(rack["_id"]) == request.rackId:
                racks.remove(rack)
        centros_collection.update_one(
            {"_id": centro["_id"]}, {
                "$set": {"rede.racks": racks}})

        for rack in racks:
            rack["_id"] = str(rack["_id"])
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": racks})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro eliminando o rack."})
