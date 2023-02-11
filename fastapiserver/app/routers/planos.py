from http.client import HTTPException
from bson.objectid import ObjectId
from fastapi import APIRouter, File, UploadFile, Depends, Form
from app.db import centros_collection
from ..models.Centro import Plano, CambiarPlano
from starlette.responses import JSONResponse
from fastapi import HTTPException, status
from app.utils import cloudinaryFunctions

router = APIRouter(
    prefix="/plano",
    tags=["plano"],
    responses={404: {"description": "Not found"}}
)

#### EDIFICIOS ####


@router.post("/engadir-edificio")
def engadir_edificio(request: Plano):

    centro = centros_collection.find_one(
        {"_id": ObjectId(request.centroId)})

    if not centro:
        raise HTTPException(
            status_code=400, detail="Non se atopou o centro indicado")

    planos = centro["planos"]
    edificio = {
        "_id": ObjectId(),
        "nome_edificio": request.nome,
        "plantas": []
    }
    planos.append(edificio)

    centros_collection.update_one(
        {"_id": centro["_id"]}, {
            "$set": {"planos": planos}})

    edificio["_id"] = str(edificio["_id"])
    return JSONResponse(status_code=status.HTTP_200_OK, content=edificio)


@router.post("/actualizar-edificio")
def actualizar_edificio(request: Plano):

    centro = centros_collection.find_one(
        {"_id": ObjectId(request.centroId)})

    if not centro:
        raise HTTPException(
            status_code=400, detail="Non se atopou o centro indicado")

    planos = centro["planos"]
    for edificio in planos:
        if str(edificio["_id"]) == request.edificioId:
            edificio["nome_edificio"] = request.nome

    centros_collection.update_one(
        {"_id": centro["_id"]}, {
            "$set": {"planos": planos}})

    for edificio in planos:
        edificio["_id"] = str(edificio["_id"])
        for planta in edificio["plantas"]:
            planta["_id"] = str(planta["_id"])
    return JSONResponse(status_code=status.HTTP_200_OK, content=planos)


@router.post("/eliminar-edificio")
def eliminar_edificio(request: Plano):

    centro = centros_collection.find_one(
        {"_id": ObjectId(request.centroId)})

    if not centro:
        raise HTTPException(
            status_code=400, detail="Non se atopou o centro indicado")

    planos = centro["planos"]
    for edificio in planos:
        if str(edificio["_id"]) == request.edificioId:
            planos.remove(edificio)
    centros_collection.update_one(
        {"_id": centro["_id"]}, {
            "$set": {"planos": planos}})

    for edificio in planos:
        edificio["_id"] = str(edificio["_id"])
        for planta in edificio["plantas"]:
            planta["_id"] = str(planta["_id"])
    return JSONResponse(status_code=status.HTTP_200_OK, content=planos)

#### PLANTAS ####


@router.post("/engadir-planta")
def engadir_planta(request: Plano):

    centro = centros_collection.find_one(
        {"_id": ObjectId(request.centroId)})

    if not centro:
        raise HTTPException(
            status_code=400, detail="Non se atopou o centro indicado")

    planos = centro["planos"]
    planta = {
        "_id": ObjectId(),
        "planta": request.nome,
        "aps_planta": 0,
        "plano": "",
    }
    for edificio in planos:
        if str(edificio["_id"]) == request.edificioId:
            edificio["plantas"].append(planta)

    centros_collection.update_one(
        {"_id": centro["_id"]}, {
            "$set": {"planos": planos}})

    planta["_id"] = str(planta["_id"])
    return JSONResponse(status_code=status.HTTP_200_OK, content=planta)


@router.post("/actualizar-planta")
def actualizar_planta(request: Plano):

    centro = centros_collection.find_one(
        {"_id": ObjectId(request.centroId)})

    if not centro:
        raise HTTPException(
            status_code=400, detail="Non se atopou o centro indicado")

    planos = centro["planos"]
    for edificio in planos:
        if str(edificio["_id"]) == request.edificioId:
            for planta in edificio["plantas"]:
                if str(planta["_id"]) == request.plantaId:
                    planta["planta"] = request.nome

    centros_collection.update_one(
        {"_id": centro["_id"]}, {
            "$set": {"planos": planos}})

    for edificio in planos:
        edificio["_id"] = str(edificio["_id"])
        for planta in edificio["plantas"]:
            planta["_id"] = str(planta["_id"])
    return JSONResponse(status_code=status.HTTP_200_OK, content=planos)


@router.post("/eliminar-planta")
def eliminar_planta(request: Plano):

    centro = centros_collection.find_one(
        {"_id": ObjectId(request.centroId)})

    if not centro:
        raise HTTPException(
            status_code=400, detail="Non se atopou o centro indicado")

    planos = centro["planos"]
    for edificio in planos:
        if str(edificio["_id"]) == request.edificioId:
            for planta in edificio["plantas"]:
                if str(planta["_id"]) == request.plantaId:
                    edificio["plantas"].remove(planta)

    centros_collection.update_one(
        {"_id": centro["_id"]}, {
            "$set": {"planos": planos}})

    for edificio in planos:
        edificio["_id"] = str(edificio["_id"])
        for planta in edificio["plantas"]:
            planta["_id"] = str(planta["_id"])
    return JSONResponse(status_code=status.HTTP_200_OK, content=planos)


#### PLANOS ####

@router.post("/cambiar-plano")
async def cambiar_plano(plano: UploadFile = File(...), centroId: str = Form(...), edificioIndex: int = Form(...), plantaIndex: int = Form(...)):
    try:
        planoUrl = await cloudinaryFunctions.upload_photo(plano)
        centros_collection.update_one({"_id": ObjectId(centroId)}, {"$set": {
                                      f"planos[{edificioIndex}]['plantas'][{plantaIndex}]['plano']": planoUrl}})
        return JSONResponse(status_code=status.HTTP_200_OK, content={"centroId": centroId,
                                                                     "edificioIndex": edificioIndex,
                                                                     "plantaIndex": plantaIndex,
                                                                     "plano": plano.filename, })
    except KeyError:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"error": True, "message": "Erro cambiando a foto"})
