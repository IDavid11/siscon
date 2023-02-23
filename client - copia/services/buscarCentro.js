import { instance } from "./axios"

export const buscarCentro = async (codigo) => {
    const { data } = await instance.post("http://127.0.0.1:8000/centros/buscar-centro", {
        codigo: codigo.trim().toUpperCase()
    })

    return data
}