from http.client import HTTPException
from bson.objectid import ObjectId
from fastapi import APIRouter
from app.db import centros_collection
from ..models.Centro import Plano
from starlette.responses import JSONResponse
from fastapi import HTTPException, status

router = APIRouter(
    prefix="/plano",
    tags=["plano"],
    responses={404: {"description": "Not found"}}
)


@router.post("/engadir")
def engadir_plano(request: Plano):

    centro = centros_collection.find_one(
        {"_id": ObjectId(request.centroId)})

    if not centro:
        raise HTTPException(
            status_code=400, detail="Non se atopou o centro indicado")

    planos = centro["planos"]
    plano = {
        "_id": ObjectId(),
        "nome": request.nome,
        "tipo": request.tipo,
    }
    planos.append(plano)

    centros_collection.update_one(
        {"_id": centro["_id"]}, {
            "$set": {"planos": planos}})

    plano["_id"] = str(plano["_id"])
    return JSONResponse(status_code=status.HTTP_200_OK, content=plano)


@router.post("/actualizar")
def actualizar_plano(request: Plano):

    centro = centros_collection.find_one(
        {"_id": ObjectId(request.centroId)})

    if not centro:
        raise HTTPException(
            status_code=400, detail="Non se atopou o centro indicado")

    planos = centro["planos"]
    for plano in planos:
        if str(plano["_id"]) == request.planoId:
            plano["nome"] = request.nome
            plano["tipo"] = request.tipo
            plano["ubicacion"] = request.ubicacion

    centros_collection.update_one(
        {"_id": centro["_id"]}, {
            "$set": {"planos": planos}})

    for plano in planos:
        plano["_id"] = str(plano["_id"])
    return JSONResponse(status_code=status.HTTP_200_OK, content=planos)


@router.post("/eliminar")
def eliminar_plano(request: Plano):

    centro = centros_collection.find_one(
        {"_id": ObjectId(request.centroId)})

    if not centro:
        raise HTTPException(
            status_code=400, detail="Non se atopou o centro indicado")

    planos = centro["planos"]
    for plano in planos:
        if str(plano["_id"]) == request.planoId:
            planos.remove(plano)
    centros_collection.update_one(
        {"_id": centro["_id"]}, {
            "$set": {"planos": planos}})

    for plano in planos:
        plano["_id"] = str(plano["_id"])
    return JSONResponse(status_code=status.HTTP_200_OK, content=planos)
