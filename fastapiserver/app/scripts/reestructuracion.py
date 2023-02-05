from app.db import centros_collection
from bson.objectid import ObjectId


def checkIsRouter(ip):
    ip = ip.split('.')
    if (ip[-1] == '1'):
        return True
    return False


def checkIsSiega(ip):
    ip = ip.split('.')
    if (ip[-1] == '10'):
        return True
    return False


centros = []
centrosf = centros_collection.find()
for centro in centrosf:
    centros.append(centro)

for index, centro in enumerate(centros):

    electronica = []
    if centro["rede"]["principal"] and len(centro["rede"]["principal"]) > 0:
        for router in centro["rede"]["principal"]:
            isRouter = checkIsRouter(router["ip"])
            if (isRouter):
                electronica.append({
                    "_id": ObjectId(),
                    "nome": "",
                    "ip": router["ip"],
                    "tipo": 1,
                    "ubicacion": "",
                    "status": "up",
                })
                break

    if centro["rede"]["switches"] and len(centro["rede"]["switches"]) > 0:
        for switch in centro["rede"]["switches"]:
            isSiega = checkIsSiega(switch["ip"])
            if (isSiega):
                electronica.append({
                    "_id": ObjectId(),
                    "nome": "",
                    "ip": switch["ip"],
                    "tipo": 2,
                    "ubicacion": "",
                    "status": "up",
                })
            else:
                electronica.append({
                    "_id": ObjectId(),
                    "nome": "",
                    "ip": switch["ip"],
                    "tipo": 3,
                    "ubicacion": "",
                    "status": "up",
                })

    if centro["rede"]["edu_xunta_gal"] and len(centro["rede"]["edu_xunta_gal"]["aps"]) > 0:
        for ap in centro["rede"]["edu_xunta_gal"]["aps"]:
            electronica.append({
                "_id": ObjectId(),
                "nome": ap["deviceName"],
                "ip": ap["ip"],
                "tipo": 4,
                "ubicacion": "",
                "status": "up",
            })

    if centro["rede"]["edu_xunta_gal"]:
        controladora = centro["rede"]["edu_xunta_gal"]["controladora"]
    else:
        controladora = ""

    rede_formateado = {
        "lans": centro["rede"]["lans"],
        "racks": [],
        "electronica": electronica,
        "tap": centro["rede"]["tap"],
        "tar": centro["rede"]["tar"],
        "controladora": controladora,
    }

    centros_collection.update_one({"_id": centro["_id"]}, {
        "$set": {"rede": rede_formateado}})

    print(f"{index} - {centro['centro']} actualizado")
