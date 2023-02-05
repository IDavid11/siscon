import requests
import json
from app.db import centros_collection
from app.config import RUCKUS_URL, RUCKUS_HEADERS1, RUCKUS_HEADERS2


def search_and_save_aps_ruckus(centros):
    sen_resultados = []

    for index, centro in enumerate(centros[0:876]):
        aps_centro = []
        print(f"{index} - {centro['centro']}")
        codigo = centro["centro"][0:8]
        url = f"{RUCKUS_URL.RUCKUS}/query/ap?_dc=1641374094654"

        payload = "{\"filters\":[{\"type\":\"DOMAIN\",\"value\":\"8b2081d5-9662-40d9-a3db-2a3cf4dde3f7\"}],\"fullTextSearch\":{\"type\":\"AND\",\"value\":\""
        back_payload = "\"},\"attributes\":[\"*\"],\"sortInfo\":{\"sortColumn\":\"apMac\",\"dir\":\"ASC\"},\"page\":1,\"limit\":55}"
        payload = f"{payload}{codigo}{back_payload}"

        headers = RUCKUS_HEADERS1

        response_API = requests.request(
            "POST", url, headers=headers, data=payload, verify=False)
        response_API = json.loads(response_API.text)

        try:
            if len(response_API["list"]) > 0:
                for ap in response_API["list"]:
                    aps_centro.append({
                        "deviceName": ap["deviceName"],
                        "status": ap["status"],
                        "ip": ap["ip"]
                    })
                centros_collection.find_one_and_update({"centro": centro["centro"]}, {
                    "$set": {"electronica.edu_xunta_es": {"controladora": "Ruckus", "aps": aps_centro}}})

        except KeyError:
            sen_resultados.append(centro["centro"])

    return sen_resultados


def search_and_save_aps_ruckus2(centros):

    codigo = "27000629"
    url = f"{RUCKUS_URL}/query/ap?_dc=1641374094654"

    payload = "{\"filters\":[{\"type\":\"DOMAIN\",\"value\":\"8b2081d5-9662-40d9-a3db-2a3cf4dde3f7\"}],\"fullTextSearch\":{\"type\":\"AND\",\"value\":\""
    back_payload = "\"},\"attributes\":[\"*\"],\"sortInfo\":{\"sortColumn\":\"apMac\",\"dir\":\"ASC\"},\"page\":1,\"limit\":55}"
    payload = f"{payload}{codigo}{back_payload}"

    headers = RUCKUS_HEADERS2

    response_API = requests.request(
        "POST", url, headers=headers, data=payload, verify=False)
    response_API = json.loads(response_API.text)

    return response_API
