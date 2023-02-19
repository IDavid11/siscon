from fastapi import APIRouter
from app.db import hardware_collection
from starlette.responses import JSONResponse
from fastapi import status

router = APIRouter(
    prefix="/listados",
    tags=["listados"],
)


@router.get("/hardware")
def listados_hardware():
    try:
        data = []
        hardware = hardware_collection.find()
        for equipo in hardware:
            equipo["_id"] = str(equipo["_id"])
            data.append(equipo)

        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": data})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro obtendo o listado."})
