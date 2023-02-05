from app.db import centros_collection

# centros_collection.update_many({}, {"$set": {"planos": []}}, False, None)
# centros_collection.update_many({"rede.electronica": {"$exists": False}}, {"$set": {"rede.electronica": []}})

for centro in centros_mongo:
    if len(centro["rede"]["electronica"]) < 1:
        rango_splitted = centro["rede"]["lans"][0]["rango"].split('/')
        ip = rango_splitted[0].split('.')
        centro["rede"]["electronica"].append({
            "_id": ObjectId(),
            "nome": "",
            "ip": f"{ip[0]}.{ip[1]}.{ip[2]}.1",
            "tipo": 1,
            "ubicacion": "",
            "status": "up"
        })
        centros_collection.update_one({"_id": ObjectId(centro["_id"])}, {"$set": {"rede.electronica": centro["rede"]["electronica"]}})
        print(f"{centro['centro']} actualizado")