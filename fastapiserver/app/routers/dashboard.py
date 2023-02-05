import json
from bson.objectid import ObjectId
from bson.son import SON
from bson import json_util
from fastapi import APIRouter
from app.db import monitorizacion_collection, centros_collection
from app.routers import centros, monitorizacions, estadisticas

router = APIRouter(
    prefix="/dashboard",
    tags=["dashboard"],
    responses={404: {"description": "Not found"}}
)


@router.get("/")
def dashboard():
    centros_data = centros.centros()
    monitorizacions_data = monitorizacions.monitorizacions()
    estadisticas_data = estadisticas.estadisticas_centros()
    data = {
        "centros": centros_data,
        "monitorizacions": monitorizacions_data,
        "estadisticas": estadisticas_data
    }

    return json.loads(json_util.dumps(data))
