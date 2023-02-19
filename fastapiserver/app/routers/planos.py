from bson.objectid import ObjectId
from fastapi import APIRouter, File, UploadFile, Depends, Form
from app.db import centros_collection
from ..models.Centro import Plano
from starlette.responses import JSONResponse
from fastapi import status
from app.utils import cloudinaryFunctions

router = APIRouter(
    prefix="/plano",
    tags=["plano"],
    responses={404: {"description": "Not found"}}
)

#### EDIFICIOS ####


@router.post("/engadir-edificio")
def engadir_edificio(request: Plano):
    try:
        centro = centros_collection.find_one(
            {"_id": ObjectId(request.centroId)})

        if not centro:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "O centro non existe."})

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
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": edificio})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro engadindo o edificio."})


@router.post("/actualizar-edificio")
def actualizar_edificio(request: Plano):
    try:
        centro = centros_collection.find_one(
            {"_id": ObjectId(request.centroId)})

        if not centro:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "O centro non existe."})

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
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": planos})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro actualizando o edificio."})


@router.post("/eliminar-edificio")
def eliminar_edificio(request: Plano):
    try:
        centro = centros_collection.find_one(
            {"_id": ObjectId(request.centroId)})

        if not centro:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "O centro non existe."})

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
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": planos})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro eliminando o edificio."})

#### PLANTAS ####


@router.post("/engadir-planta")
def engadir_planta(request: Plano):
    try:
        centro = centros_collection.find_one(
            {"_id": ObjectId(request.centroId)})

        if not centro:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "O centro non existe."})

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
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": planos})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro engadindo a planta."})


@router.post("/actualizar-planta")
def actualizar_planta(request: Plano):
    try:
        centro = centros_collection.find_one(
            {"_id": ObjectId(request.centroId)})

        if not centro:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "O centro non existe."})

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
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": planos})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro actualinado a planta."})


@router.post("/eliminar-planta")
def eliminar_planta(request: Plano):
    try:
        centro = centros_collection.find_one(
            {"_id": ObjectId(request.centroId)})

        if not centro:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "O centro non existe."})

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
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": planos})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro eliminando a planta."})

#### PLANOS ####


@router.post("/cambiar-plano")
async def cambiar_plano(plano: UploadFile = File(...), centroId: str = Form(...), edificioId: str = Form(...), plantaId: str = Form(...)):
    try:
        centro = centros_collection.find_one({"_id": ObjectId(centroId)})
        if not centro:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "O centro non existe."})
        planos = centro["planos"]
        for edificio in planos:
            if str(edificio["_id"]) == edificioId:
                for planta in edificio["plantas"]:
                    if str(planta["_id"]) == plantaId:
                        if planta["plano"] and planta["plano"] != "":
                            delStatus = await cloudinaryFunctions.delete_photo(
                                planta["plano"])
                            if delStatus["result"] != "ok":
                                return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro eliminando o plano actual."})
                        planoUrl = await cloudinaryFunctions.upload_photo(plano)
                        if not planoUrl:
                            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro subindo o plano."})
                        else:
                            planta["plano"] = planoUrl

        centros_collection.update_one(
            {"_id": centro["_id"]}, {
                "$set": {"planos": planos}})

        for edificio in planos:
            edificio["_id"] = str(edificio["_id"])
            for planta in edificio["plantas"]:
                planta["_id"] = str(planta["_id"])
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": planos})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro cambiando o plano."})
