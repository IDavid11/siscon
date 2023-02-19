import json
from bson import json_util
from fastapi import APIRouter
from app.routers import centros, monitorizacions, estadisticas
from starlette.responses import JSONResponse
from fastapi import status

router = APIRouter(
    prefix="/dashboard",
    tags=["dashboard"],
    responses={404: {"description": "Not found"}}
)


@router.get("/")
def dashboard():
    try:
        centros_data = centros.centros()
        monitorizacions_data = monitorizacions.monitorizacions()
        estadisticas_data = estadisticas.estadisticas_centros()
        data = {
            "centros": centros_data,
            "monitorizacions": monitorizacions_data,
            "estadisticas": estadisticas_data
        }

        return json.loads(json_util.dumps(data))
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro engadindo o dispositivo."})
