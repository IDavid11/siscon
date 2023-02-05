from app.db import centros_collection


def buscar_centros():
    centros_mongo = centros_collection.find()
    centros = []
    for centro in centros_mongo:
        centros.append(centro)

    print(centros)


def save_location(centros):
    for centro in centros:
        print(centro.centro)
