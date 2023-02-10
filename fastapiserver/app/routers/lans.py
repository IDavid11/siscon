from http.client import HTTPException
from bson.objectid import ObjectId
from fastapi import APIRouter
from app.db import centros_collection
from ..models.Centro import LAN
from starlette.responses import JSONResponse
from fastapi import HTTPException, status

router = APIRouter(
    prefix="/lan",
    tags=["lan"],
    responses={404: {"description": "Not found"}}
)


@router.post("/engadir")
def engadir_lan(request: LAN):

    centro = centros_collection.find_one(
        {"_id": ObjectId(request.centroId)})

    if not centro:
        raise HTTPException(
            status_code=400, detail="Non se atopou o centro indicado")

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
    return JSONResponse(status_code=status.HTTP_200_OK, content=lan)


@router.post("/actualizar")
def actualizar_lan(request: LAN):

    centro = centros_collection.find_one(
        {"_id": ObjectId(request.centroId)})

    if not centro:
        raise HTTPException(
            status_code=400, detail="Non se atopou o centro indicado")

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
    return JSONResponse(status_code=status.HTTP_200_OK, content=lans)


@router.post("/eliminar")
def eliminar_lan(request: LAN):

    centro = centros_collection.find_one(
        {"_id": ObjectId(request.centroId)})

    if not centro:
        raise HTTPException(
            status_code=400, detail="Non se atopou o centro indicado")

    lans = centro["rede"]["lans"]
    for lan in lans:
        if str(lan["_id"]) == request.lanId:
            lans.remove(lan)
    centros_collection.update_one(
        {"_id": centro["_id"]}, {
            "$set": {"rede.lans": lans}})

    for lan in lans:
        lan["_id"] = str(lan["_id"])
    return JSONResponse(status_code=status.HTTP_200_OK, content=lans)
