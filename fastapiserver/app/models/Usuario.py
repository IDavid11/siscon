from enum import Enum
from typing import Optional
from pydantic import BaseModel


class SearchUser(BaseModel):
    username: str


class Login(BaseModel):
    username: str
    password: str


class Group(str, Enum):
    n1 = "n1"
    sistemas = "sistemas"
    aplicacions = "aplicacions"


class Usuario(BaseModel):
    usuarioId: Optional[str]
    nome: Optional[str]
    usuario: str
    grupo: Optional[str]


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class User(BaseModel):
    usuario: str
    nome: Optional[str] = None
    grupo: Optional[str] = 'n1'
    autenticado: Optional[bool] = False
    admin: Optional[bool] = False
    contrasinal: Optional[str] = None


class UserInDB(User):
    contrasinal_hashed: str
