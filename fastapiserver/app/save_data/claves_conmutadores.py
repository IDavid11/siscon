from numpy import dtype
import pandas as pd
from serverproba import collection


def contrasinais_electronica():
    # EXCEL
    excel = pd.read_excel("Listado Centros Educativos 25-02-2021.ods")
    centros_excel = (excel['Centro'].tolist())
    codigos_excel = []
    for centro in centros_excel:
        codigos_excel.append(centro[0:8])

    # CONTRASINAIS ELECTRONICA CONMUTADORES
    df_conmutadores = pd.read_excel("contrasinais_electronica.ods",
                                    sheet_name="Conmutadores",
                                    usecols=["NOME", "CODIGO", "CONTRASINAL", "DESCRICION"])
    df_conmutadores = df_conmutadores.fillna("")
    df_conmutadores['CODIGO'] = df_conmutadores['CODIGO'].apply(str)

    # RECOLLE AS CLAVES DO EXCEL DOS CENTROS QUE APARECEN NO EXCEL DE CONTRASINAIS
    codigos_electronica = df_conmutadores["CODIGO"].tolist()

    # ELIMINANDO CODIGOS REPETIDOS
    codigos = []
    for codigo in codigos_electronica:
        if codigo not in codigos:
            codigos.append(codigo)

    # GARDANDO EN BASE DE DATOS OS CONTRASINAIS
    contrasinais = []
    codigos_usados = []
    for codigo in codigos:
        codigo = codigo.split('.')
        codigo = codigo[0]
        if codigo in codigos_excel:
            centro = df_conmutadores[df_conmutadores["CODIGO"].str.contains(
                codigo, na=False)]
            for index in centro.index:
                codigo = df_conmutadores.iloc[int(index)]["CODIGO"]
                codigo = codigo.split('.')
                codigo = codigo[0]
                nome = df_conmutadores.iloc[int(index)]["NOME"]
                contrasinal_rango = df_conmutadores.iloc[int(
                    index)]["CONTRASINAL"]
                rango = df_conmutadores.iloc[int(index)]["DESCRICION"]

                if codigo not in codigos_usados:
                    contrasinais.append({
                        "codigo": codigo,
                        "conmutadores": {
                            "nome": nome,
                            "rangos": [
                                {
                                    "rango": rango,
                                    "contrasinal": contrasinal_rango
                                }
                            ],
                        }
                    })
                    codigos_usados.append(codigo)
                else:
                    for contrasinal in contrasinais:
                        if codigo == contrasinal["codigo"]:
                            contrasinal["conmutadores"]["rangos"].append({
                                "rango": rango,
                                "contrasinal": contrasinal_rango
                            })
    for contrasinal in contrasinais:
        print(contrasinal)
        collection.update_many({"centro": {"$regex": contrasinal["codigo"]}}, {
            "$set": {"contrasinais": {"conmutadores": contrasinal["conmutadores"]}}})
