import requests
from app.db import centros_collection
import json
from app.config import ARUBA_AIRWAVE4_URL, ARUBA_AIRWAVE4_HEADERS_ID, ARUBA_AIRWAVE4_HEADERS_APS


def search_id(codigo):
    url = f"{ARUBA_AIRWAVE4_URL}/search.json?query={codigo}&type=controllers"

    headers = ARUBA_AIRWAVE4_HEADERS_ID

    response_API_ID = requests.request(
        "GET", url, headers=headers, verify=False)
    response_API_ID = json.loads(response_API_ID.text)

    if len(response_API_ID["controllers"]):

        centroId = response_API_ID["controllers"][0]["id"]
        return centroId

    return None


def search_and_save_aps_airwave4(centros):
    url = F"{ARUBA_AIRWAVE4_URL}/list_view.json?list=ap_controller&fv_id=0&ap_id=1200"

    headers = ARUBA_AIRWAVE4_HEADERS_APS

    for index, centro in enumerate(centros):
        aps_centro = []
        print(f"{index} - {centro['centro']}")
        codigo = centro["centro"][0:8]
        centroId = search_id(codigo)
        if centroId:
            response_API = requests.request(
                "GET", url, headers=headers, verify=False)
            response_API = json.loads(response_API.text)

            try:
                for ap in response_API["records"]:
                    aps_centro.append({
                        "deviceName": ap["name"]["value"],
                        "status": ap["monitoring_status"]["value"],
                        "ip": ap["icmp_address"]["value"]
                    })
                centros_collection.find_one_and_update({"centro": centro["centro"]}, {
                    "$set": {"electronica.edu_xunta_es": {"controladora": "AirWave4", "aps": aps_centro}}})

            except KeyError:
                pass

    return "Probando"
