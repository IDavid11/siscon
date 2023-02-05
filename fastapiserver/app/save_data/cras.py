from serverproba import collection


cras = []
codigos_cra = []


def search_cras():
    resultados = collection.find({"centro": {"$regex": "CRA"}})

    for resultado in resultados:
        centroId = str(resultado["_id"])
        resultado["_id"] = centroId
        cras.append(resultado)

    for cra in cras:
        centro = cra["centro"][0:8]
        codigos_cra.append(centro)

    import pandas as pd
    # CSV
    csv = pd.read_csv("glpi.csv", on_bad_lines='skip')
    csv = csv.fillna("")
    centros_csv = (csv['Centro'].tolist())

    comentarios = []
    for codigo in codigos_cra:
        data = csv[csv["Centro"].str.contains(codigo)]
        csv = csv.fillna("")
        for index in data.index:
            comentario = csv.iloc[int(index)]["Comentario"]
            comentarios.append({
                "codigo": codigo,
                "comentario": comentario
            })

    # ENGADIMOS COMENTARIO DE CRA SEDE AO RESTO DE CRAS CO MESMO CÓDIGO
    for comentario in comentarios:
        collection.update_many({"centro": {"$regex": comentario["codigo"]}}, {
            "$set": {"comentario": comentario["comentario"]}})

    # CONVERTIMOS ATRIBUTO COMENTARIO EN ARRAY EN MONGODB
    from serverproba.utils.util_functions import split_comentarios_glpi
    split_comentarios_glpi(comentarios)
