import { instance } from "./axios"


export const buscarUsuarios = async () => {
    const {data} = await instance.get("http://127.0.0.1:8000/usuarios/usuarios")
    return data
}

export const crearUsuario = async ({name, username, group}) => {
    const {data} = await instance.post("http://127.0.0.1:8000/usuarios/add-user", {
        "name": name,
        "username": username,
        "group": group
    })
    return data
}