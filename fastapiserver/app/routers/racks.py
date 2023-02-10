from http.client import HTTPException
from bson.objectid import ObjectId
from fastapi import APIRouter
from app.db import centros_collection
from ..models.Centro import Rack
from starlette.responses import JSONResponse
from fastapi import HTTPException, status

router = APIRouter(
    prefix="/rack",
    tags=["rack"],
    responses={404: {"description": "Not found"}}
)


@router.post("/engadir")
def engadir_rack(request: Rack):

    centro = centros_collection.find_one(
        {"_id": ObjectId(request.centroId)})

    if not centro:
        raise HTTPException(
            status_code=400, detail="Non se atopou o centro indicado")

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
    return JSONResponse(status_code=status.HTTP_200_OK, content=rack)


@router.post("/actualizar")
def actualizar_rack(request: Rack):

    centro = centros_collection.find_one(
        {"_id": ObjectId(request.centroId)})

    if not centro:
        raise HTTPException(
            status_code=400, detail="Non se atopou o centro indicado")

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
    return JSONResponse(status_code=status.HTTP_200_OK, content=racks)


@router.post("/eliminar")
def eliminar_rack(request: Rack):

    centro = centros_collection.find_one(
        {"_id": ObjectId(request.centroId)})

    if not centro:
        raise HTTPException(
            status_code=400, detail="Non se atopou o centro indicado")

    racks = centro["rede"]["racks"]
    for rack in racks:
        if str(rack["_id"]) == request.rackId:
            racks.remove(rack)
    centros_collection.update_one(
        {"_id": centro["_id"]}, {
            "$set": {"rede.racks": racks}})

    for rack in racks:
        rack["_id"] = str(rack["_id"])
    return JSONResponse(status_code=status.HTTP_200_OK, content=racks)
