from fastapi import APIRouter
from app.db import switches_collection

router = APIRouter(
    prefix="/switches",
    tags=["switches"],
    responses={404: {"description": "Not found"}}
)


@router.get("/")
async def switches():
    switches = []
    resultados = switches_collection.find()

    for resultado in resultados:
        switchId = str(resultado["_id"])
        resultado["_id"] = switchId
        switches.append(resultado)

    return switches
