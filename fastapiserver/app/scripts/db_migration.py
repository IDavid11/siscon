from app.db import centros_collection, cluster2


local_centros_collection = cluster2["uac"]["centros"]
local_centros_collection.update_many({"comentario": {"$exists": False}}, {
                                     "$set": {"comentario": ""}})
local_centros_collection.update_many({"contrasinais": {"$exists": False}}, {
                                     "$set": {"contrasinais": []}})
local_centros_collection.update_many({"electronica.principal": {"$exists": False}}, {
                                     "$set": {"electronica.principal": []}})
local_centros_collection.update_many({"imaxe": {"$exists": False}}, {
                                     "$set": {"imaxe": ""}})

local_centros_collection = local_centros_collection.find()
centros = []

for index, centro in enumerate(local_centros_collection):

    comentario_formateado = " ".join(centro["comentario"])
    proxecto = "Estándar"

    if centro["eva"] != "Non":
        proxecto = "EVA"

    rango_edu_xunta_gal = ""
    if len(centro["lan"]) > 1:
        rango_edu_xunta_gal = centro["lan"][-1]

    lans_formateado = []
    for lan in centro["lan"]:
        lans_formateado.append({
            "rango": lan,
            "dhcp": centro["dhcp"],
        })

    switches_formateado = []
    for switch in centro["electronica"]["switches"]:
        switches_formateado.append({
            "ip": switch,
        })

    principal_formateado = []
    for principal in centro["electronica"]["principal"]:
        principal_formateado.append({"ip": principal["ip"]})

    rede_formateado = {
        "principal": principal_formateado,
        "lans": lans_formateado,
        "racks": [],
        "switches": centro["electronica"]["switches"],
        "edu_xunta_gal": centro["electronica"]["edu_xunta_es"],
        "tap": centro["tecnoloxia"],
        "tar": centro["tecnoloxia_respaldo"],
        "wifi_siega": [],
    }

    centro_formateado = {
        "sf": centro["sf"],
        "centro": centro["centro"],
        "concello": centro["concello"],
        "comentario": comentario_formateado,
        "ubicacion": centro["ubicacion"],
        "proxecto": proxecto,
        "rede": rede_formateado,
        "planos": centro["planos"],
        "imaxe": centro["imaxe"],
        "contrasinais": centro["contrasinais"],
    }

    centros.append(centro_formateado)


centros_collection.insert_many(centros)
