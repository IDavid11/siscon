import os
import subprocess
from datetime import datetime
from bson.objectid import ObjectId
from app.db import centros_collection, monitorizacion_collection, avisos_collection

pings = ["1", "7", "10"]
FNULL = open(os.devnull, 'wb')


def comprobar_failed_ping(centro, item):
    with open(os.devnull, "wb") as limbo:
        res = subprocess.Popen(
            ["ping", "-n", "3", "-w", "200", item["ip"]], stdout=limbo, stderr=limbo).wait()
        if res == 0 and item["status"] == "up":
            return 0
        elif res == 0 and item["status"] == "down":
            cambiar_status(centro, item)
        else:
            filter = {"electronicaId": ObjectId(item["_id"]), "status": "open"}
            monitorizacion = monitorizacion_collection.find_one(filter)
            print(monitorizacion)
            if monitorizacion:
                return 1
            else:
                data = datetime.now()
                data = data.strftime("%d/%m/%Y %H:%M")
                monitorizacion_collection.insert_one({
                    "centroId": centro["_id"],
                    "electronicaId": item["_id"],
                    "data": datetime.today(),
                    "status": "open"
                })
                if item["status"] == "up":
                    cambiar_status(centro, item)
                return 1


def monitorizacion():
    centros = []
    resultados = centros_collection.find({})

    for resultado in resultados:
        centros.append(resultado)

    while True:
        for centro in centros:
            electronica = centro["rede"]["electronica"]
            resultadosPing = []
            print("Comeza bucle")
            with open(os.devnull, "wb") as limbo:
                for item in electronica:
                    print("Continuando")
                    res = subprocess.Popen(
                        ["ping", "-n", "1", "-w", "200", item["ip"]], stdout=limbo, stderr=limbo).wait()
                    if res == 0:
                        print("Ping to", item["ip"], "OK")
                    else:
                        print("Ping to", item["ip"], "FAILED")
                        failed = comprobar_failed_ping(centro, item)
                        # if failed and item["tipo"] == 1:
                        #    break

                resultadosPing.append(resultado)

        return resultadosPing


def cambiar_status(centro, item):
    status = "down" if item["status"] == "up" else "up"
    centros_collection.update_one({"_id": ObjectId(centro["_id"]), "rede.electronica._id": ObjectId(
        item["_id"])}, {"$set": {"rede.electronica.$.status": status}})
    avisos_collection.insert_one({"_id": ObjectId(), "centroId": ObjectId(
        centro["_id"]), "electronicaId": ObjectId(item["_id"]), "data": datetime.today(), "status": status})
