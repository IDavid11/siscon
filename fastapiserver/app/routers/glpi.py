import json
from bson import json_util
from fastapi import APIRouter
import requests
from app.routers import centros, monitorizacions, estadisticas
from starlette.responses import JSONResponse
from fastapi import status
from app.utils.format_to_json import format_aviso_to_json, format_centro_to_json, format_monitorizacion_to_json
from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
import re
from app.models.Usuario import Login

router = APIRouter(
    prefix="/glpi",
    tags=["glpi"],
    responses={404: {"description": "Not found"}}
)

headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'es-ES,es;q=0.9',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': 'PHPSESSID=g9vm8npah0cmgb3ga4oskeane2; glpi_02ab1cb608751877bd91524063046730=pmqtpjf1ndmbn3mil6dm5vbkia',
    'Origin': 'https://glpi.edu.xunta.gal',
    'Referer': 'https://glpi.edu.xunta.gal/uac/helpdesk/index.php?noAUTO=1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"'
}


def get_index_info():
    url = "https://glpi.edu.xunta.gal/uac/helpdesk/index.php?noAUTO=1"

    req = Request(url)
    html_page = urlopen(req).read()

    soup = BeautifulSoup(html_page, 'html.parser')
    csrf_token = soup.find("meta", property="glpi:csrf_token")
    login_input_id = soup.find("input", id="login_name")
    password_input_id = soup.find("input", type="password")

    return {
        "csrf_token": csrf_token["content"],
        "login_input_id": login_input_id["name"],
        "password_input_id": password_input_id["name"]
    }


def glpi_login(index_info):
    url = "https://glpi.edu.xunta.gal/uac/helpdesk/front/login.php"
    payload = f"noAUTO=1&redirect=&_glpi_csrf_token={index_info['csrf_token']}&{index_info['login_input_id']}=ue108435&{index_info['password_input_id']}=Callobre1111&auth=ldap-1&submit="

    response = requests.request("POST", url, headers=headers, data=payload)

    soup = BeautifulSoup(response.text, 'html.parser')

    return "ok"


def get_search_id():
    url = "https://glpi.edu.xunta.gal/uac/helpdesk/front/ticket.php"
    req = Request(url, headers=headers)
    html_page = urlopen(req).read()

    soup = BeautifulSoup(html_page, 'html.parser')

    csrf_token = soup.find("meta", property="glpi:csrf_token")["content"]
    searchform_id = soup.find(
        "table", class_="search-results table card-table table-hover table-striped")["id"]
    return {
        "csrf_token": csrf_token,
        "searchform_id": searchform_id,
    }

#request: Login


def get_pool_sistemas(search_info):
    url = f"https://glpi.edu.xunta.gal/uac/helpdesk/ajax/search.php?action=display_results&searchform_id={search_info['searchform_id']}&itemtype=Ticket&glpilist_limit=1000&sort%5B%5D=19&order%5B%5D=DESC&is_deleted=0&as_map=0&browse=0&criteria%5B0%5D%5Blink%5D=AND&criteria%5B0%5D%5Bfield%5D=12&criteria%5B0%5D%5Bsearchtype%5D=equals&criteria%5B0%5D%5Bvalue%5D=notold&criteria%5B1%5D%5Blink%5D=AND&criteria%5B1%5D%5Bfield%5D=8&criteria%5B1%5D%5Bsearchtype%5D=equals&criteria%5B1%5D%5Bvalue%5D=1&criteria%5B2%5D%5Blink%5D=AND&criteria%5B2%5D%5Bfield%5D=5&criteria%5B2%5D%5Bsearchtype%5D=equals&criteria%5B2%5D%5Bvalue%5D=22506&start=0&_glpi_csrf_token={search_info['csrf_token']}"
    headers = {
        'Accept': '*/*',
        'Accept-Language': 'es-ES,es;q=0.9',
        'Connection': 'keep-alive',
        'Cookie': 'PHPSESSID=g9vm8npah0cmgb3ga4oskeane2; glpi_02ab1cb608751877bd91524063046730=pmqtpjf1ndmbn3mil6dm5vbkia; glpi_02ab1cb608751877bd91524063046730=pmqtpjf1ndmbn3mil6dm5vbkia',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
        'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"'
    }

    response = requests.request("GET", url, headers=headers)
    return {"pool": response.text, "searchform_id": search_info['searchform_id']}


def format_pool_to_json(pool_info):
    soup = BeautifulSoup(pool_info["pool"], 'html.parser')
    table = soup.find("table", id=pool_info["searchform_id"])
    pool = []

    for index, tr in enumerate(table.tbody.contents):
        if index % 2 != 0:
            # pool.append({
            #    "titulo": tr.contents[5].a.string,
            #    "entidade": tr.contents[7].find_all("span")[4],
            #    "estado": tr.contents[9].span.text,
            #    "prioridade": tr.contents[11].div.text,
            #    "categoria": tr.contents[15].string,
            #    "tecnico_asignado": tr.contents[19].string
            # })
            pool.append({
                "titulo": tr.contents[5].a.string,
                "entidade": tr.contents[7].find_all("span")[4].text,
                "estado": format_pool_strings(tr.contents[9].span.text),
                "prioridade": format_pool_strings(tr.contents[11].div.text),
                "categoria": tr.contents[15].string,
                "tecnico_asignado": tr.contents[19].string
            })
    return pool


def format_pool_strings(string):
    string = re.sub(re.escape("\n"), "", string)
    string = re.sub(re.escape("\xa0"), "", string)
    string = re.sub("$" + re.escape("\n"), "", string)
    string = string.strip()
    return string


@router.get("/login")
def login():
    index_info = get_index_info()
    login_response = glpi_login(index_info)
    search_info = get_search_id()
    pool = format_pool_to_json(get_pool_sistemas(search_info))
    print(pool)
    return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": pool})
