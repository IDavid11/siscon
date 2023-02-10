from http.client import HTTPException
from bson.objectid import ObjectId
from fastapi import APIRouter
from app.db import centros_collection
from ..models.Centro import Dispositivo
from starlette.responses import JSONResponse
from fastapi import HTTPException, status

router = APIRouter(
    prefix="/electronica",
    tags=["electronica"],
    responses={404: {"description": "Not found"}}
)


@router.post("/engadir")
def engadir_dispositivo(request: Dispositivo):
    centro = centros_collection.find_one(
        {"_id": ObjectId(request.centroId)})

    if not centro:
        raise HTTPException(
            status_code=400, detail="Non se atopou o centro indicado")

    electronica = centro["rede"]["electronica"]
    dispositivo = {
        "_id": ObjectId(),
        "ip": request.ip,
        "tipo": request.tipo,
        "modelo": request.modelo,
        "ubicacion": request.ubicacion,
        "nome": request.nome,
        "status": "up"
    }
    electronica.append(dispositivo)

    centros_collection.update_one(
        {"_id": centro["_id"]}, {
            "$set": {"rede.electronica": electronica}})

    dispositivo["_id"] = str(dispositivo["_id"])
    return JSONResponse(status_code=status.HTTP_200_OK, content=dispositivo)


@router.post("/actualizar")
def actualizar_dispositivo(request: Dispositivo):

    centro = centros_collection.find_one(
        {"_id": ObjectId(request.centroId)})

    if not centro:
        raise HTTPException(
            status_code=400, detail="Non se atopou o centro indicado")

    electronica = centro["rede"]["electronica"]
    for dispositivo in electronica:
        if str(dispositivo["_id"]) == request.dispositivoId:
            dispositivo["ip"] = request.ip
            dispositivo["tipo"] = request.tipo
            dispositivo["modelo"] = request.modelo
            dispositivo["ubicacion"] = request.ubicacion
            dispositivo["nome"] = request.nome
    centros_collection.update_one(
        {"_id": centro["_id"]}, {
            "$set": {"rede.electronica": electronica}})

    for dispositivo in electronica:
        dispositivo["_id"] = str(dispositivo["_id"])

    return JSONResponse(status_code=status.HTTP_200_OK, content=electronica)


@router.post("/eliminar")
def eliminar_dispositivo(request: Dispositivo):

    centro = centros_collection.find_one(
        {"_id": ObjectId(request.centroId)})

    if not centro:
        raise HTTPException(
            status_code=400, detail="Non se atopou o centro indicado")

    electronica = centro["rede"]["electronica"]
    for dispositivo in electronica:
        if str(dispositivo["_id"]) == request.dispositivoId:
            electronica.remove(dispositivo)
    centros_collection.update_one(
        {"_id": centro["_id"]}, {
            "$set": {"rede.electronica": electronica}})
    for dispositivo in electronica:
        dispositivo["_id"] = str(dispositivo["_id"])
    return JSONResponse(status_code=status.HTTP_200_OK, content=electronica)
