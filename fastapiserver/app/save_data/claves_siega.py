import pandas as pd
from app.db import centros_collection


def contrasinais_electronica_siega():
    # EXCEL
    excel = pd.read_excel("Listado Centros Educativos 25-02-2021.ods")
    centros_excel = excel["Centro"].tolist()
    codigos_excel = []
    for centro in centros_excel:
        codigos_excel.append(centro[0:8])

    # CONTRASINAIS ELECTRONICA CONMUTADORES
    df_siega = pd.read_excel(
        "contrasinais_electronica.ods",
        sheet_name="APs Siega",
        usecols=["CODIGO", "Clave Admin", "Clave WPA"],
    )
    df_siega = df_siega.fillna("")
    df_siega["CODIGO"] = df_siega["CODIGO"].apply(str)

    # RECOLLE AS CLAVES DO EXCEL DOS CENTROS QUE APARECEN NO EXCEL DE CONTRASINAIS
    codigos_electronica = df_siega["CODIGO"].tolist()

    # ELIMINANDO CODIGOS REPETIDOS
    codigos = []
    for codigo in codigos_electronica:
        if codigo not in codigos:
            codigos.append(codigo)

    # GARDANDO EN BASE DE DATOS OS CONTRASINAIS
    contrasinais = []
    codigos_usados = []
    for codigo in codigos:
        if codigo in codigos_excel:
            centro = df_siega[df_siega["CODIGO"].str.contains(codigo, na=False)]
            for index in centro.index:
                codigo = df_siega.iloc[int(index)]["CODIGO"]
                contrasinal_admin = df_siega.iloc[int(index)]["Clave Admin"]
                contrasinal_siega = df_siega.iloc[int(index)]["Clave WPA"]

                contrasinais.append(
                    {
                        "codigo": codigo,
                        "siega": {
                            "admin": contrasinal_admin,
                            "siega": contrasinal_siega,
                        },
                    }
                )

    for contrasinal in contrasinais:
        centros_collection.update_many(
            {"centro": {"$regex": contrasinal["codigo"]}},
            {"$set": {"contrasinais.siega": contrasinal["siega"]}},
        )
