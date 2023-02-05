import requests
from .AapFolderUUID import AapFolderUUID
from app.db import centros_collection
import json
from app.config import ARUBA_AIRWAVE_URL, ARUBA_AIRWAVE_HEADERS


def search_and_save_aps_airwave(centros):
    sen_resultados = []
    url = ARUBA_AIRWAVE_URL
    headers = ARUBA_AIRWAVE_HEADERS
    first_part_payload = "{\"size\":10000,\"sort\":[{\"_score.raw\":{\"order\":\"desc\",\"unmapped_type\":\"boolean\"}}],\"highlight\":{\"pre_tags\":[\"@kibana-highlighted-field@\"],\"post_tags\":[\"@/kibana-highlighted-field@\"],\"fields\":{\"*\":{}},\"require_field_match\":false,\"fragment_size\":2147483647},\"query\":{\"filtered\":{\"query\":{\"multi_match\":{\"query\":\""
    second_part_payload = "\",\"fields\":[\"Name\",\"RadioMAC2\",\"Hostname\",\"FirmwareVersion\",\"Serial\",\"MACAddress\",\"ControllerIPAddress\",\"ControllerName\",\"IPv4Address\",\"ApFolderName\",\"Type\",\"UpstreamDeviceName\",\"UpstreamInterfaceName\",\"DeviceStatus\"],\"type\":\"phrase_prefix\"}},\"filter\":{\"bool\":{\"must\":[{\"terms\":{\"ApFolderUUID\":"
    third_part_payload = "}},{\"range\":{\"Timestamp\":{\"gte\":1641382046947}}}]}}}},\"fields\":[\"*\",\"_source\"],\"script_fields\":{},\"fielddata_fields\":[\"Timestamp\",\"Uptime\",\"LastContacted\"]}"

    for index, centro in enumerate(centros):
        aps_centro = []
        print(f"{index} - {centro['centro']}")
        codigo = centro["centro"][0:8]

        payload = f"{first_part_payload}{codigo}{second_part_payload}{AapFolderUUID}{third_part_payload}"

        response_API = requests.request(
            "POST", url, headers=headers, data=payload, verify=False)
        response_API = json.loads(response_API.text)

        try:
            if len(response_API["hits"]["hits"]) > 0:
                for ap in response_API["hits"]["hits"]:
                    aps_centro.append({
                        "deviceName": ap["_source"]["Name"],
                        "status": ap["_source"]["DeviceStatus"],
                        "ip": ap["_source"]["IPv4Address"]
                    })
                centros_collection.find_one_and_update({"centro": centro["centro"]}, {
                    "$set": {"electronica.edu_xunta_es": {"controladora": "AirWave Glass", "aps": aps_centro}}})
            print(aps_centro)

        except KeyError:
            sen_resultados.append(centro["centro"])

    return sen_resultados
