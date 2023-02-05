import pandas as pd
from serverproba import collection
from serverproba.save_data import edixgal


def buscar_comentarios_glpi():
    for comentario in edixgal.comentarios:
        query = {"centro": {"$regex": comentario["codigo"]}}
        update = {"$set": {"comentario": comentario["comentario"]}}
        collection.update_one(query, update)


def split_comentarios_glpi(comentarios):
    for comentario in comentarios:
        comentarios_centro = []
        codigo = comentario["codigo"]
        comentario = comentario["comentario"]
        comentario_splited = comentario.split('|')

        for split in comentario_splited:
            comentarios.append(split.strip())

        query = {"centro": {"$regex": codigo}}
        update = {"$set": {"comentario": comentarios_centro}}
        collection.update_one(query, update)


def buscar_centros_edixgal():
    for comentario in edixgal.comentarios:
        codigo = comentario["codigo"]
        comentario = comentario["comentario"]

        if "EVA" in comentario:
            comentario_splited = comentario.split('|')
            for split in comentario_splited:
                if "EVA" in split:
                    query = {"centro": {"$regex": codigo}}
                    update = {"$set": {"eva": split.strip()}}
                    collection.update_one(query, update)


from serverproba.utils.format import format_lan


def gardar_datos_excel():
    df = pd.read_excel("../Listado Centros Educativos 25-02-2021.ods")
    centros = (df['Centro'].tolist())

    for index, centro in enumerate(centros):
        data = df[df["Centro"].str.contains(centro)]
        id = df.iloc[index]["ID"]
        centro = df.iloc[index]["Centro"]
        concello = df.iloc[index]["Concello"]
        lan = df.iloc[index]["LAN"]
        dhcp = df.iloc[index]["DHCP"]
        tecnoloxia = df.iloc[index]["Tecnoloxía Acceso Principal"]
        tecnoloxia_respaldo = df.iloc[index]["Tecnoloxía Acceso Respaldo"]
        eva = "Non"

        if dhcp == "Si":
            dhcp = True
        else:
            dhcp = False

        lan = format_lan(lan)
        df = df.fillna("")

        if tecnoloxia_respaldo == "":
            tecnoloxia_respaldo = "Non ten liña de backup"

        centroNovo = {"sf": id, "centro": centro, "concello": concello, "lan": lan, "dhcp": dhcp,
                      "tecnoloxia": tecnoloxia, "tecnoloxia_respaldo": tecnoloxia_respaldo, "eva": eva}

        print(centroNovo)
        collection.insert_one(centroNovo)
