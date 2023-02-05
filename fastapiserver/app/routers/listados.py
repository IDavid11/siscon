from itertools import groupby
from fastapi import APIRouter
import pandas as pd
from app.db import centros_collection, hardware_collection

router = APIRouter(
    prefix="/listados",
    tags=["listados"],
)


@router.get("/centros-educativos")
def listados_centros_educativos():
    centros = centros_collection.find()
    data = []

    for index, centro in enumerate(centros):
        centro["_id"] = str(centro["_id"])
        resultado_lans = centro["rede"]["lans"]
        lans = []
        for lan in resultado_lans:
            lans.append(lan["rango"])
        lans = ", ".join(lans)
        data.append(
            {
                "index": index,
                "concello": centro["concello"],
                "centro": centro["centro"],
                "lans": lans,
                "tap": centro["rede"]["tap"],
            }
        )

    return data


@router.get("/hardware")
def listados_hardware():
    data = []
    hardware = hardware_collection.find()
    for equipo in hardware:
        equipo["_id"] = str(equipo["_id"])
        data.append(equipo)

    return data


@router.get("/contrasinais")
def listados_contrasinais():
    df = pd.read_excel(
        "contrasinais_electronica.ods",
        sheet_name="Conmutadores",
        usecols=["NOME", "CENTRO", "CONTRASINAL", "DESCRICION"],
    )
    df = df.fillna("")

    data = []
    for index in df.index:
        nome = df.iloc[int(index)]["NOME"]
        centro = df.iloc[int(index)]["CENTRO"]
        contrasinal = df.iloc[int(index)]["CONTRASINAL"]
        descricion = df.iloc[int(index)]["DESCRICION"]
        data.append(
            {
                "index": int(index),
                "nome": nome,
                "centro": centro,
                "contrasinal": contrasinal,
                "descricion": descricion,
            }
        )

    return data
