from fastapi import APIRouter, Response
from datetime import datetime, timedelta
from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.hash import pbkdf2_sha256
from passlib.context import CryptContext
from starlette.responses import JSONResponse
from pymongo.collection import ReturnDocument

from app.db import users_collection
from app import config
from app.models.Usuario import Login, SearchUser, TokenData, User, Usuario
from bson.objectid import ObjectId

router = APIRouter(
    prefix="/usuarios", tags=["usuarios"], responses={404: {"description": "Not found"}}
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, config.SECRET_KEY, algorithm=config.ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token inválido",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, config.SECRET_KEY,
                             algorithms=[config.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = users_collection.find_one({"usuario": payload.get("sub")})
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@router.get("/users/me/", response_model=User, tags=["usuarios"])
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user


@router.get("/users/me/items/", tags=["usuarios"])
async def read_own_items(current_user: User = Depends(get_current_active_user)):
    return [{"item_id": "Foo", "owner": current_user.username}]

##################################################################


@router.post("/buscar-usuario", tags=["usuarios"])
async def get_user(username_request: SearchUser):
    user = users_collection.find_one({"usuario": username_request.username})
    if user:
        user["_id"] = str(user["_id"])
        return JSONResponse(status_code=status.HTTP_200_OK, content={"usuario": user["usuario"], "autenticado": user["autenticado"]})
    else:
        return {"error": "Usuario non rexistrado na base de datos"}


async def xerar_token(usuario, response: Response):
    access_token_expires = timedelta(
        minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": usuario["usuario"]}, expires_delta=access_token_expires
    )
    response.set_cookie(key="token", value=access_token)
    return access_token


async def gardar_contrasinal(usuario, contrasinal):
    contrasinal_cifrado = pbkdf2_sha256.hash(contrasinal)
    users_collection.update_one(
        {"usuario": usuario["usuario"]}, {
            "$set": {"contrasinal": contrasinal_cifrado, "autenticado": True}}
    )


@router.post("/login")
async def login(login_request: Login, response: Response):
    usuario = users_collection.find_one({"usuario": login_request.username})
    if usuario["autenticado"]:
        contrasinal_verificado = pbkdf2_sha256.verify(
            login_request.password, usuario["contrasinal"]
        )

        if not contrasinal_verificado:
            # raise HTTPException(
            #    status_code=status.HTTP_401_UNAUTHORIZED,
            #    detail="Contrasinal incorrecto",
            #    headers={"WWW-Authenticate": "Bearer"},
            # )
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Contrasinal incorrecto."})

        access_token = await xerar_token(usuario, response)
        del usuario["contrasinal"], usuario["_id"]
        return {"usuario": usuario, "access_token": access_token, "token_type": "bearer"}

    await gardar_contrasinal(usuario, login_request.password)
    access_token = await xerar_token(usuario, response)
    del usuario["contrasinal"], usuario["_id"]
    return {"usuario": usuario, "access_token": access_token, "token_type": "bearer"}


@router.get("/")
def get_users():
    try:
        users_mongo = users_collection.find()
        users = []
        for user in users_mongo:
            users.append(
                {
                    "_id": str(user["_id"]),
                    "nome": user["nome"],
                    "usuario": user["usuario"],
                    "grupo": user["grupo"],
                }
            )

        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": users})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro obtendo os usuarios."})


@router.post("/engadir")
def engadir_usuario(request: User):
    try:
        user_db = users_collection.find_one({"usuario": request.usuario})
        if user_db:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Usuario xa rexistrado na base de datos."})
        users_collection.insert_one({
            "nome": request.nome,
            "usuario": request.usuario,
            "grupo": request.grupo,
            "autenticado": False,
            "admin": False
        })
        usuarios = []
        resultados = users_collection.find()
        for usuario in resultados:
            usuario["_id"] = str(usuario["_id"])
            usuarios.append(usuario)
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": usuarios})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro engadindo o usuario."})


@router.post("/actualizar")
def actualizar_usuario(request: Usuario):
    try:
        user_bd_id = users_collection.find_one(
            {"_id": ObjectId(request.usuarioId)})
        if not user_bd_id:
            print("O usuario non existe")
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "O usuario non existe."})
        if user_bd_id and user_bd_id["usuario"] != request.usuario:
            user_bd_usuario = users_collection.find_one(
                {"usuario": ObjectId(request.usuarioId)})
            if user_bd_usuario:
                return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Usuario xa rexistrado na base de datos."})
        usuario_actualizado = users_collection.find_one_and_update({"_id": ObjectId(request.usuarioId)}, {"$set": {
            "nome": request.nome,
            "usuario": request.usuario,
            "grupo": request.grupo,
        }}, return_document=ReturnDocument.AFTER)
        if usuario_actualizado:
            usuarios = []
            resultados = users_collection.find()
            for usuario in resultados:
                usuario["_id"] = str(usuario["_id"])
                usuarios.append(usuario)
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": usuarios})
        else:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro actualizando o usuario."})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro actualizando o usuario."})


@router.post("/eliminar")
def eliminar_usuario(request: Usuario):
    try:
        usuario_eliminado = users_collection.find_one_and_delete(
            {'_id': ObjectId(request.usuarioId)})
        if usuario_eliminado:
            usuarios = []
            resultados = users_collection.find()
            for usuario in resultados:
                usuario["_id"] = str(usuario["_id"])
                usuarios.append(usuario)
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": usuarios})
        else:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro eliminando o usuario."})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro eliminando o usuario."})


@router.post("/renovar-contrasinal")
def renovar_contrasinal(request: Usuario):
    try:
        user_db = users_collection.find_one(
            {"_id": ObjectId(request.usuarioId)})
        if not user_db:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "O usuario non existe."})
        usuario_actualizado = users_collection.find_one_and_update({"_id": ObjectId(request.usuarioId)}, {"$set": {
            "contrasinal": "",
            "autenticado": False,
        }}, return_document=ReturnDocument.AFTER)

        if usuario_actualizado:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok"})
        else:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro renovando o contrasinal do usuario."})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro renovando o contrasinal do usuario."})
