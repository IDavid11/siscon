import requests
from app.db import centros_collection
import json
from app.config import ARUBA_CENTRAL_URL, ARUBA_CENTRAL_HEADERS_ID, ARUBA_CENTRAL_HEADERS_APS


def search_id(codigo):
    url = f"{ARUBA_CENTRAL_URL}/monitor/ap/vc/limit/10/offset/0/search?op=global_search&name={codigo}&guid={codigo}&location={codigo}&ipaddr={codigo}&labels={codigo}&stamp=1641396513146"

    headers = ARUBA_CENTRAL_HEADERS_ID

    response_API_ID = requests.request(
        "GET", url, headers=headers, verify=False)
    response_API_ID = json.loads(response_API_ID.text)

    if len(response_API_ID["result"]) > 0:
        centroId = response_API_ID["result"][0]["id"]
        groupId = response_API_ID["result"][0]["group_id"]
        return {"centroId": centroId, "groupId": groupId}

    return None


def search_and_save_aps_aruba_central(centros):

    headers = ARUBA_CENTRAL_HEADERS_APS

    for index, centro in enumerate(centros):
        aps_centro = []
        print(f"{index} - {centro['centro']}")
        codigo = centro["centro"][0:8]
        data = search_id(codigo)

        if data:
            url = f"{ARUBA_CENTRAL_URL}/monitor/v2/ap?swarm_id={data['centroId']}&group_id={data['groupId']}&limit=50&offset=0&sort=%2Bstatus"
            response_API = requests.request(
                "GET", url, headers=headers, verify=False)
            response_API = json.loads(response_API.text)

            try:
                for ap in response_API["data"]["results"]["aps"]:
                    aps_centro.append({
                        "deviceName": ap["name"],
                        "status": ap["status"],
                        "ip": ap["ipaddr"]
                    })
                centros_collection.find_one_and_update({"centro": centro["centro"]}, {
                    "$set": {"electronica.edu_xunta_es": {"controladora": "Aruba Central", "aps": aps_centro}}})

            except KeyError:
                pass

    return "Done"
