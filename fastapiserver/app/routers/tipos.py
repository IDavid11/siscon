from fastapi import APIRouter
from app.db import tipo_electronica_collection

router = APIRouter(
    prefix="/tipos",
    tags=["tipos"],
    responses={404: {"description": "Not found"}}
)


@router.get("/")
async def switches():
    tipos = []
    resultados = tipo_electronica_collection.find()

    for resultado in resultados:
        tipos.append(
            {"id": resultado["id"], "nome": resultado["nome"], "ubicacion": resultado["ubicacion"]})

    return tipos
