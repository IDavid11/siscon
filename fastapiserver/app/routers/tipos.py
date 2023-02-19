from starlette.responses import JSONResponse
from fastapi import APIRouter
from app.db import tipo_electronica_collection
from fastapi import status

router = APIRouter(
    prefix="/tipos",
    tags=["tipos"],
    responses={404: {"description": "Not found"}}
)


@router.get("/")
async def switches():
    try:
        tipos = []
        resultados = tipo_electronica_collection.find()

        for resultado in resultados:
            tipos.append(
                {"id": resultado["id"], "nome": resultado["nome"], "ubicacion": resultado["ubicacion"]})

        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": tipos})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro engadindo o rack."})
