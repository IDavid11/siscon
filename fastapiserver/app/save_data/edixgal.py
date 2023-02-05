import pandas as pd

# CSV
csv = pd.read_csv("glpi.csv", on_bad_lines="skip")
csv = csv.fillna("")
centros_csv = csv["Centro"].tolist()

# EXCEL
excel = pd.read_excel("Listado Centros Educativos 25-02-2021.ods")
centros_excel = excel["Centro"].tolist()

datos_reais = []
datos_falsos = []

codigos_csv = []
codigos_excel = []


datos_cxr = []

# CENTROS NO CSV
for centro in centros_csv:
    if len(centro) < 1:
        continue
    elif centro[0].isdigit():
        codigos_csv.append(centro[0:8])
        datos_reais.append(centro.upper())
    else:
        datos_falsos.append(centro)

# CENTROS NO EXCEL
for centro in centros_excel:
    codigos_excel.append(centro[0:8])


# COMPROBA OS CODIGOS DO CSV COS CODIGOS DO EXCEL
for codigo in codigos_csv:
    if codigo in codigos_excel:
        datos_cxr.append(codigo)

# MOSTRA OS CRAS NO EXCEL DO CXR
cras = []
raros = []

for centro in centros_excel:
    centro = centro.split(" - ")
    if len(centro) > 1:
        centro = centro[1]
        if centro[0:3] == "CRA":
            cras.append(centro)
    else:
        raros.append(centro)

# RECOLLE OS COMENTARIOS DO CSV DOS CENTROS QUE APARECEN NO EXCEL
comentarios = []
for codigo in codigos_excel:
    if codigo[0].isdigit():
        data = csv[csv["Centro"].str.contains(codigo)]
        csv = csv.fillna("")
        for index in data.index:
            comentario = csv.iloc[int(index)]["Comentario"]
            comentarios.append({"codigo": codigo, "comentario": comentario})
