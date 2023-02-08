import json
from bson import json_util
from fastapi import APIRouter
from threading import Thread
import queue
import multiprocessing
import re
from bson.objectid import ObjectId
from app.models.Centro import BuscarCentro
from app.models.Conexion import IP
from app.db import centros_collection, tipo_electronica_collection
from app.functions.ping import network_ping
from app.functions.monitorizar_ip import monitorizar_ip

router = APIRouter(
    prefix="/conexion",
    tags=["conexión"],
    responses={404: {"description": "Not found"}}
)


def check_network_thread(index, q):
    centro = centros_collection.find_one(
        {'_id': ObjectId(index)})

    resultados = []

    for item in centro["rede"]["electronica"]:
        item["status"] = network_ping(item["ip"])
        resultados.append(item)

    centros_collection.find_one_and_update(
        {"_id": centro["_id"]}, {
            "$set": {"rede.electronica": resultados}}
    )

    q.put(resultados)

    return resultados


@router.post("/network")
def check_network(request_centro: BuscarCentro):
    q = queue.Queue()

    thread = Thread(target=check_network_thread,
                    args=(request_centro.index, q,))
    thread.daemon = True
    thread.start()

    result = q.get()

    for item in result:
        tipo_electronica = tipo_electronica_collection.find_one(
            {"id": item["tipo"]})
        item["tipo"] = tipo_electronica["nome"]

    return json.loads(json_util.dumps(result))


@router.post("/buscar-ip")
def buscar_ip(request_ip: IP):
    ip_validation = re.match(
        r"^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$", request_ip.ip)
    print(ip_validation)
    if ip_validation:
        splitted_ip = request_ip.ip.split('.')
        splitted_ip.pop()
        ip = '.'.join(splitted_ip)
        print(ip)
        centro = centros_collection.find_one({"lan": {"$regex": ip}})
        if centro:
            centro = centro["centro"]
            return centro
        return ({"message": "IP non atopada"})
    return ({"message": "Formato non válido"})


@router.post("/monitorizar-ip")
def monitorizar_ip_route(request_ip: IP):
    # minutos = request.json["minutos"]
    minutos = 0.3
    resultadosPing = []
    queue = multiprocessing.Queue()
    queue.put(resultadosPing)
    p = multiprocessing.Process(
        target=monitorizar_ip, name="MonitorizarIP", args=(request_ip.ip, queue,))
    p.start()
    p.join(60 * minutos)
    resultadosPing.append(queue.get())

    if p.is_alive():
        print('Tempo finalizado')
        p.terminate()
        p.join()
        return resultadosPing

    resultadosPing.append(queue.get())
    resultadosPing.pop(0)
    print(resultadosPing)
    return resultadosPing
