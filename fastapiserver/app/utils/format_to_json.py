def format_aviso_to_json(aviso):
    aviso["_id"] = str(aviso["_id"])
    aviso["centroId"] = str(aviso["centroId"])
    aviso["electronicaId"] = str(
        aviso["electronicaId"])
    aviso["data"] = str(aviso["data"])

    return aviso


def format_monitorizacion_to_json(monitorizacion):
    monitorizacion["_id"] = str(monitorizacion["_id"])
    monitorizacion["centroId"] = str(monitorizacion["centroId"])
    monitorizacion["electronicaId"] = str(
        monitorizacion["electronicaId"])
    monitorizacion["data"] = str(monitorizacion["data"])

    return monitorizacion


def format_centro_to_json(centro):
    up = []
    down = []
    del centro["contrasinais"]
    centro["_id"] = str(centro["_id"])
    for plano in centro["planos"]:
        plano["_id"] = str(plano["_id"])
        for planta in plano["plantas"]:
            planta["_id"] = str(planta["_id"])
    for lan in centro["rede"]["lans"]:
        lan["_id"] = str(lan["_id"])
    for item in centro["rede"]["electronica"]:
        item["_id"] = str(item["_id"])
        if item["status"] == "up":
            up.append(item)
        if item["status"] == "down":
            down.append(item)
    for rack in centro["rede"]["racks"]:
        rack["_id"] = str(rack["_id"])
    centro["porcentaxe"] = round(
        (len(up) / len(centro["rede"]["electronica"])) * 100)

    return centro


def format_electronica_to_json(electronica):
    for item in electronica:
        item["_id"] = str(item["_id"])

    return electronica
