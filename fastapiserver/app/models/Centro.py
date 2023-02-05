from email.policy import default
from typing import List
from fastapi import Body, FastAPI
from pydantic import BaseModel, Field


class Lan(BaseModel):
    nome: str
    rango: str
    dhcp: bool
    rede_principal: bool


class Ubicacion(BaseModel):
    lat: str
    lng: str


class BuscarCentro(BaseModel):
    index: str


class CrearCentro(BaseModel):
    sf: str
    codigo: str
    nome_centro: str
    concello: str
    proxecto: str
    comentario: str


class ActualizarCentro(BaseModel):
    sf: str
    centro: str
    concello: str
    proxecto: str
    comentario: str
    lans: Lan
    planos: List[str]
    ubicacion: Ubicacion
    rede: List[str]
    imaxe: str
    contrasinais: List[str]


class EngadirInfoRede(BaseModel):
    centro: str
    lans: list[Lan]
    controladora: str
    rango: str
    rango_principal: bool
