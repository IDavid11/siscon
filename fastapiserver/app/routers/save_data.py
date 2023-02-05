from fastapi import APIRouter
from fastapi.params import Depends
from app.apis.aruba_airwave import search_and_save_aps_airwave
from app.apis.aruba_airwave4 import search_and_save_aps_airwave4
from app.apis.aruba_central import search_and_save_aps_aruba_central
from app.apis.floor_plans import scrape_floor_plans
from app.db import centros_collection
from app.apis.ruckus_aps import search_and_save_aps_ruckus
import cloudinary
import cloudinary.uploader
from app import config
import requests
import json

from app.save_data.hardware import save_hardware_file
from app.save_data.switches import save_switches

router = APIRouter(
    prefix="/gardar-datos",
    tags=["gardar-datos"],
)


async def buscar_centros():
    centros_mongo = centros_collection.find()
    centros = []
    for centro in centros_mongo:
        centros.append(centro)
    return centros


# CENTROS QUE NON ATOPA A API GEOCODE DE GOOGLE MAPS
first_zero_results = [
    "15027617 - CMUS PROFESIONAL XAN VIAÑO",
    "15023090 - IES MACÍAS O NAMORADO",
    "15013059 - EEI DE VILARIÑO",
    "15026236 - EEI DA ANGUSTIA",
    "15014568 - IES Nº 1",
    "32009116 - IES 12 DE OUTUBRO",
    "36020258 - IES Nº 1",
    "36009846 - CEIP PLURILINGÜE Nº 1",
    "36009895 - CEIP PLURILINGÜE Nº 2",
]


@router.get("/listados/hardware")
async def save_hardware_file_route():
    data = save_hardware_file()
    return data


@router.get("/switches")
async def save_switches_route(centros=Depends(buscar_centros)):
    data = save_switches(centros)
    return data


@router.get("/ubicacions")
async def save_location(centros=Depends(buscar_centros)):
    centros_zero_results = []
    for index, centro in enumerate(centros):
        centro_formatted = centro["centro"][11:]
        response_API = requests.get(
            f"https://maps.googleapis.com/maps/api/geocode/json?address={centro_formatted}&key={config.GEOCODING_API_KEY}"
        )
        response_API = json.loads(response_API.text)
        print(response_API)
        if len(response_API["results"]) > 0:
            location = response_API["results"][0]["geometry"]["location"]
            centro_db = centros_collection.find_one_and_update(
                {"centro": centro["centro"]}, {"$set": {"ubicacion": location}}
            )
        else:
            centros_zero_results.append(centro["centro"])
            print(centros_zero_results)
            print(index)

    return centros_zero_results


@router.get("/network-status")
async def save_network_status(centros=Depends(buscar_centros)):

    centros_collection.update_many(
        {"centro": {"$regex": "150"}}, {"$set": {"network_status": "OK"}}
    )

    return "Done"


####### MÁIS DE 500 CENTROS SEN RESULTADOS/FOTOS #######
@router.get("/fotos")
async def save_photo(centros=Depends(buscar_centros)):
    centros_zero_results = []
    centros_zero_photos = []

    for index, centro in enumerate(centros):
        print(index)
        centro_formatted = centro["centro"][11:]
        centro_formatted = centro_formatted.split(" ")
        centro_formatted = "%20".join(centro_formatted)

        url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={centro_formatted}&key={config.PLACES_API_KEY}"
        response_API = requests.request("GET", url)
        response_API = json.loads(response_API.text)

        if len(response_API["results"]) > 0:

            try:
                photo_reference = response_API["results"][0]["photos"][0][
                    "photo_reference"
                ]
                place_id = response_API["results"][0]["place_id"]

                photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference={photo_reference}&key={config.PLACES_API_KEY}"
                photo = requests.get(photo_url).content

                cloudinary.config(
                    cloud_name=config.CLOUD_NAME,
                    api_key=config.CLOUD_API_KEY,
                    api_secret=config.CLOUD_API_SECRET,
                )
                upload = cloudinary.uploader.upload(
                    photo, folder="imaxes_centros")

                upload_url = upload["secure_url"]
                print(upload_url)

                centro_db = centros_collection.find_one_and_update(
                    {"centro": centro["centro"]}, {
                        "$set": {"imaxe": upload_url}}
                )

            except KeyError:
                centros_zero_photos.append(centro["centro"])
                print(centros_zero_photos)
        else:
            centros_zero_results.append(centro["centro"])
            print(centros_zero_results)

    return {
        "centros sen resultados": centros_zero_results,
        "centros sen fotos": centros_zero_photos,
    }


# SWITCHES 10-19 /24 ## un split dos dous ultimos dixitos podería sacar ainda que o nmap sexa dunha máscara 22
# APs_Siega 20> APs_edu.xunta.es <39 ## Cando só hai unha lan no centro
# APs_Siega
# APs_edu.xunta.es lan 8x.xx.xx.xx ## 1 -> 16/47 || 2 -> 16/44 || 3 -> 39/41 || 4 -> 16/36 || 15005877
# APs_edu.xunta.es lan principal ## 1 -> 18/47 ||


@router.get("/electronica/aps-ruckus")
async def save_network_data_aps_ruckus(centros=Depends(buscar_centros)):
    data = search_and_save_aps_ruckus(centros)
    return data


@router.get("/electronica/aps-airwave")
def save_network_data_aps_airwave(centros=Depends(buscar_centros)):
    data = search_and_save_aps_airwave(centros)
    return data


@router.get("/electronica/aps-airwave4")
async def save_network_data_aps_airwave4(centros=Depends(buscar_centros)):
    data = search_and_save_aps_airwave4(centros)
    return data


@router.get("/electronica/aps-aruba-central")
async def save_network_data_aps_aruba_central(centros=Depends(buscar_centros)):
    data = search_and_save_aps_aruba_central(centros)
    return data


@router.get("/planos")
async def save_floor_plans(centros=Depends(buscar_centros)):
    data = scrape_floor_plans(centros)
    return data
