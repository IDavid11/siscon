from typing import List, Optional
from pydantic import BaseModel
from fastapi import File, UploadFile


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


class Centro(BaseModel):
    centroId: Optional[str]
    centro: str
    sf: str
    concello: str
    proxecto: str
    tap: str
    tar: str
    comentario: str


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


class ActualizarLAN(BaseModel):
    centroId: str
    lanId: str
    rango: str
    rede: str
    dhcp: bool


class EngadirLAN(BaseModel):
    centroId: str
    rango: str
    rede: str
    dhcp: bool


class LAN(BaseModel):
    centroId: Optional[str]
    lanId: Optional[str]
    rango: Optional[str]
    rede: Optional[str]
    dhcp: Optional[bool]


class Dispositivo(BaseModel):
    centroId: Optional[str]
    dispositivoId: Optional[str]
    ip: Optional[str]
    tipo: Optional[str]
    modelo: Optional[str]
    ubicacion: Optional[str]
    nome: Optional[str]


class Rack(BaseModel):
    centroId: Optional[str]
    rackId: Optional[str]
    nome: Optional[str]
    tipo: Optional[str]
    ubicacion: Optional[str]


class Plano(BaseModel):
    centroId: Optional[str]
    edificioId: Optional[str]
    plantaId: Optional[str]
    nome: Optional[str]
    plano: Optional[str]


class CambiarPlano(BaseModel):
    centroId: Optional[str]
    edificioIndex: Optional[str]
    plantaIndex: Optional[str]
    plano: UploadFile = File(...)
