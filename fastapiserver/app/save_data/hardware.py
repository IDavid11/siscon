import pandas as pd
from app.db import hardware_collection


def save_hardware_file():
    # EXCEL
    df = pd.read_excel("FollaExpedientes_21.ods")
    df = df.fillna("")

    dispositivos = [
        "NETBOOK",
        "CARRO",
        "PORTATIL",
        "SOBREMESA",
        "PROXECTOR",
        "PDI",
        "IMPRESORA",
    ]
    resultados = []
    matrices = []

    for dispositivo in dispositivos:
        resultado = df[df["GARANTÍA"].str.contains(dispositivo, na=False)]
        for index in resultado.index:
            resultados.append(index)

    for index, resultado in enumerate(resultados):
        if index + 1 < len(resultados):
            matriz = df.iloc[resultado + 1 : resultados[index + 1], :]
        else:
            matriz = df.iloc[resultado + 1 :, :]
        matrices.append(matriz)

    # GARDANDO EN BASE DE DATOS O EQUIPAMENTO
    for i, matriz in enumerate(matrices):
        for index in matriz.index:
            garantia = df.iloc[int(index)]["GARANTÍA"].capitalize()
            marca_modelo = df.iloc[int(index)]["MARCA E MODELO"]
            expediente = df.iloc[int(index)]["EXPEDIENTE / CONCURSO"]
            ns = df.iloc[int(index)]["N/S EXEMP"]
            tecnico = df.iloc[int(index)]["TÉCNICO"]
            grupo_escalado = df.iloc[int(index)]["GRUPO ESCALADO"]
            equipamento = df.iloc[int(index)]["Equipamento"]
            so = df.iloc[int(index)]["S.O. Orixinal"]
            tipo_hardware = dispositivos[i].capitalize()

            marca_modelo = marca_modelo.split(" ")
            marca = marca_modelo[0]
            modelo = " ".join(marca_modelo[1:])

            hardware = {
                "marca": marca,
                "modelo": modelo,
                "expediente": expediente,
                "ns": ns,
                "tecnico": tecnico,
                "grupo_escalado": grupo_escalado,
                "equipamento": equipamento,
                "so": so,
                "garantia": garantia,
                "tipo_hardware": tipo_hardware,
            }

            hardware_collection.insert_one(hardware)

    return "Finalizado"
