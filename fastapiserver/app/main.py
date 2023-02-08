from fastapi import FastAPI
from threading import Thread
from fastapi.middleware.cors import CORSMiddleware
from fastapi.param_functions import Depends
from .config import origins
from .routers import centros, monitorizacions, estadisticas, conexion, listados, usuarios, save_data, switches, dashboard, avisos
from .monitorizacion import monitorizacion
from app.routers.usuarios import get_current_user

###### IMPORTANTE ######

# app = FastAPI(dependencies=[Depends(get_query_token)])
# UTILIZAR ISTO CANDO FINALICE PARA QUE TODA ACCIÓN REQUIRA ESTAR AUTENTICADO

###### IMPORTANTE ######

#thread = Thread(target=monitorizacion)
#thread.daemon = True
# thread.start()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(usuarios.router)
app.include_router(centros.router)
app.include_router(monitorizacions.router)
app.include_router(estadisticas.router)
app.include_router(avisos.router)
app.include_router(conexion.router)
app.include_router(listados.router, dependencies=[Depends(get_current_user)])
app.include_router(save_data.router, dependencies=[Depends(get_current_user)])
app.include_router(switches.router, dependencies=[Depends(get_current_user)])
app.include_router(dashboard.router)


@app.get("/")
async def root():
    return
