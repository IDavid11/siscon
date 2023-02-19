from bson.objectid import ObjectId
from fastapi import APIRouter
from app.db import switches_collection
from ..models.Centro import Switch
from starlette.responses import JSONResponse
from fastapi import status
from pymongo.collection import ReturnDocument

router = APIRouter(
    prefix="/switches",
    tags=["switches"],
    responses={404: {"description": "Not found"}}
)


@router.get("/")
async def switches():
    try:
        switches = []
        resultados = switches_collection.find()

        for switch in resultados:
            switch["_id"] = str(switch["_id"])
            switches.append(switch)

        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": switches})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro obtendo os switches."})


@router.post("/engadir")
def engadir_switch(request: Switch):
    try:
        sw = switches_collection.find_one(
            {"nome": request.nome.strip().upper()})
        if sw:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Xa existe un switch con ese nome."})

        switches_collection.insert_one(
            {"nome": request.nome.strip().upper(), "portos": request.portos})
        switches = []
        resultados = switches_collection.find()
        for switch in resultados:
            switch["_id"] = str(switch["_id"])
            switches.append(switch)
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": switches})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro engadindo o switch."})


@router.post("/actualizar")
def actualizar_switch(request: Switch):
    try:
        sw = switches_collection.find_one(
            {"nome": request.nome.strip().upper()})
        if sw:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Xa existe un switch con ese nome."})

        sw_actualizado = switches_collection.find_one_and_update({"_id": ObjectId(request.swId)}, {"$set": {
            "nome": request.nome.strip().upper(),
            "portos": request.portos,
        }}, return_document=ReturnDocument.AFTER)

        if sw_actualizado:
            switches = []
            resultados = switches_collection.find()
            for switch in resultados:
                switch["_id"] = str(switch["_id"])
                switches.append(switch)
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": switches})
        else:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro actualizando o switch."})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro actualizando o switch."})


@router.post("/eliminar")
def eliminar_switch(request: Switch):
    try:
        sw_eliminado = switches_collection.find_one_and_delete(
            {"_id": ObjectId(request.swId)})

        if sw_eliminado:
            switches = []
            resultados = switches_collection.find()
            for switch in resultados:
                switch["_id"] = str(switch["_id"])
                switches.append(switch)
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": switches})
        else:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro eliminando o switch."})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro eliminando o switch."})
