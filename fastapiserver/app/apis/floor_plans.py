import cloudinary
import requests
from bs4 import BeautifulSoup
from app.db import centros_collection
from app import config
import os
from PIL import Image

type_names = [
    "edif", "edi", "edf", "ed.", "ximnasio", "taller", "anexo", "bloque", "pabellon", "primaria", "infantil"]

centros_fallo_foto = []
centros_sen_foto = []


def upload_photo(original_image):
    headers = config.ARUBA_PHOTO_HEADERS

    photo_url = f"{config.ARUBA_PHOTO_URL1}/{original_image}"
    #photo_url = f"{config.ARUBA_PHOTO_URL2}/{original_image}"
    photo = requests.get(photo_url, headers=headers, verify=False).content

    cloudinary.config(cloud_name=config.CLOUD_NAME,
                      api_key=config.CLOUD_API_KEY, api_secret=config.CLOUD_API_SECRET)

    with open('file.png', 'wb') as handler:
        handler.write(photo)
        image = Image.open("file.png")
        image.save("file.png")
        weight = os.stat('file.png').st_size

    if weight < 10485760 and os.path.exists('file.png'):
        upload = cloudinary.uploader.upload(
            "file.png", folder="planos_centros")
        upload_url = upload["secure_url"]
        return upload_url
    else:
        centros_fallo_foto.append(original_image)
        return ""


def scrape_floor_plans(centros):
    with open('app/floor_plans_data2.xml', encoding="utf8") as xml_file:
        soup = BeautifulSoup(xml_file, 'xml')

    for index, centro in enumerate(centros[945:]):

        print(f"{index} - {centro['centro']}")
        codigo = centro["centro"][0:8]

        centro_actual = {
            "centro": "",
            "edificios": []
        }

        for index, site in enumerate(soup.find_all('site')):
            centro_site = site['building_name']
            planta = site['name']
            aps_planta = site['ap_placement_concern']
            original_image = site.image.filename.text

            for relative_url in site.find_all('relative-url'):
                splitted_relative_url = relative_url.text.split('/')
                if splitted_relative_url[-1] == "original.jpg" or splitted_relative_url[-1] == "original.png":
                    original_image = relative_url.text

            splitted_site = centro_site.split('-')
            edf = splitted_site[-1]

            nome_edificio = "Edificio Principal"
            if codigo in centro_site:
                centro_actual["centro"] = centro["centro"]
                original_image = upload_photo(original_image)
                for type_name in type_names:
                    if type_name.upper() in edf.upper():
                        nome_edificio = edf

                edificios = []
                for edificio in centro_actual["edificios"]:
                    edificios.append(edificio["nome_edificio"])
                if nome_edificio in edificios:
                    i = edificios.index(nome_edificio)
                    centro_actual["edificios"][i]["plantas"].append({
                        "aps_planta": aps_planta,
                        "planta": planta,
                        "plano": original_image
                    })
                else:
                    centro_actual["edificios"].append({
                        "nome_edificio": nome_edificio,
                        "plantas": [{
                            "planta": planta,
                            "aps_planta": aps_planta,
                            "plano": original_image
                        }],
                    })

        if len(centro_actual["edificios"]) > 0:
            centro_db = centros_collection.find_one_and_update(
                {"centro": centro["centro"]}, {"$set": {"planos": centro_actual["edificios"]}})
        else:
            centros_sen_foto.append(centro["centro"])

    print(centros_fallo_foto)
    return {"centros con foto pero con erro": centros_fallo_foto, "centros sen foto": centros_sen_foto}
