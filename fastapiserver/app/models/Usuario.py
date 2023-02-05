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


class AddUser(BaseModel):
    name: str
    username: str
    group: Group


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class User(BaseModel):
    username: str
    full_name: Optional[str] = None
    group: Optional[str] = None
    authenticated: Optional[bool] = False
    admin: Optional[bool] = False
    password: Optional[str] = None


class UserInDB(User):
    hashed_password: str
