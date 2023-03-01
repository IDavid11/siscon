from fastapi import APIRouter
import requests
from starlette.responses import JSONResponse
from fastapi import status
from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
import re
from app.models.Centro import GLPI
from app.models.Usuario import Login
from app.config import GLPI_HEADERS_LOGIN, GLPI_HEADERS_REQUESTS

router = APIRouter(
    prefix="/glpi",
    tags=["glpi"],
    responses={404: {"description": "Not found"}}
)


def get_index_info():
    url = "https://glpi.edu.xunta.gal/uac/helpdesk/index.php?noAUTO=1"

    response = requests.request("GET", url)

    soup = BeautifulSoup(response.text, 'html.parser')
    csrf_token = soup.find("meta", property="glpi:csrf_token")
    login_input_id = soup.find("input", id="login_name")
    password_input_id = soup.find("input", type="password")
    cookie = response.cookies.get_dict()

    return {
        "csrf_token": csrf_token["content"],
        "login_input_id": login_input_id["name"],
        "password_input_id": password_input_id["name"],
        "cookie": cookie
    }


def glpi_login(index_info, request):
    url = "https://glpi.edu.xunta.gal/uac/helpdesk/front/login.php"
    payload = f"noAUTO=1&redirect=&_glpi_csrf_token={index_info['csrf_token']}&{index_info['login_input_id']}={request.username}&{index_info['password_input_id']}={request.password}&auth=ldap-1&submit="

    response = requests.request(
        "POST", url, headers=GLPI_HEADERS_LOGIN, data=payload, cookies=index_info["cookie"])
    soup = BeautifulSoup(response.text, 'html.parser')
    return "ok"


def get_search_id(cookie):
    url = "https://glpi.edu.xunta.gal/uac/helpdesk/front/ticket.php"

    response = requests.request(
        "GET", url, headers=GLPI_HEADERS_REQUESTS, cookies=cookie)
    soup = BeautifulSoup(response.text, 'html.parser')

    csrf_token = soup.find("meta", property="glpi:csrf_token")["content"]
    searchform_id = soup.find(
        "table", class_="search-results table card-table table-hover table-striped")["id"]
    return {
        "csrf_token": csrf_token,
        "searchform_id": searchform_id,
        "cookie": cookie
    }


def get_pool_sistemas(search_info):
    url = f"https://glpi.edu.xunta.gal/uac/helpdesk/ajax/search.php?action=display_results&searchform_id={search_info['searchform_id']}&itemtype=Ticket&glpilist_limit=1000&sort%5B%5D=19&order%5B%5D=DESC&is_deleted=0&as_map=0&browse=0&criteria%5B0%5D%5Blink%5D=AND&criteria%5B0%5D%5Bfield%5D=12&criteria%5B0%5D%5Bsearchtype%5D=equals&criteria%5B0%5D%5Bvalue%5D=notold&criteria%5B1%5D%5Blink%5D=AND&criteria%5B1%5D%5Bfield%5D=8&criteria%5B1%5D%5Bsearchtype%5D=equals&criteria%5B1%5D%5Bvalue%5D=1&criteria%5B2%5D%5Blink%5D=AND&criteria%5B2%5D%5Bfield%5D=5&criteria%5B2%5D%5Bsearchtype%5D=equals&criteria%5B2%5D%5Bvalue%5D=22506&start=0&_glpi_csrf_token={search_info['csrf_token']}"

    response = requests.request(
        "GET", url, headers=GLPI_HEADERS_REQUESTS, cookies=search_info["cookie"])
    return {"pool": response.text, "searchform_id": search_info['searchform_id']}


def get_incidencias_conexion_centro(request):
    centro = request.centro.split(" - ")[0]
    #centro = " ".join(centro)
    url = f"https://glpi.edu.xunta.gal/uac/helpdesk/ajax/search.php?action=display_results&searchform_id={request.searchform_id}&itemtype=Ticket&glpilist_limit=1000&sort%5B%5D=19&order%5B%5D=DESC%3Ferror%3D3&is_deleted=0&as_map=0&browse=0&criteria%5B0%5D%5Blink%5D=AND&criteria%5B0%5D%5Bfield%5D=80&criteria%5B0%5D%5Bsearchtype%5D=contains&criteria%5B0%5D%5Bvalue%5D={centro}&criteria%5B1%5D%5Blink%5D=AND&criteria%5B1%5D%5Bfield%5D=7&criteria%5B1%5D%5Bsearchtype%5D=contains&criteria%5B1%5D%5Bvalue%5D=conexi%C3%B3n&start=0&_glpi_csrf_token={request.csrf_token}"

    response = requests.request(
        "GET", url, headers=GLPI_HEADERS_REQUESTS, cookies=request.cookie)

    return {"pool": response.text, "searchform_id": request.searchform_id}


def get_incidencias_asignadas(request):
    url = f"https://glpi.edu.xunta.gal/uac/helpdesk/ajax/search.php?action=display_results&searchform_id={request.searchform_id}&itemtype=Ticket&glpilist_limit=1000&sort%5B%5D=19&order%5B%5D=DESC&is_deleted=0&as_map=0&browse=0&criteria%5B0%5D%5Blink%5D=AND&criteria%5B0%5D%5Bfield%5D=8&criteria%5B0%5D%5Bsearchtype%5D=equals&criteria%5B0%5D%5Bvalue%5D=mygroups&criteria%5B1%5D%5Blink%5D=AND&criteria%5B1%5D%5Bfield%5D=12&criteria%5B1%5D%5Bsearchtype%5D=equals&criteria%5B1%5D%5Bvalue%5D=notold&criteria%5B2%5D%5Blink%5D=AND&criteria%5B2%5D%5Bfield%5D=5&criteria%5B2%5D%5Bsearchtype%5D=equals&criteria%5B2%5D%5Bvalue%5D=myself&start=0&_glpi_csrf_token={request.csrf_token}"
    response = requests.request(
        "GET", url, headers=GLPI_HEADERS_REQUESTS, cookies=request.cookie)

    return {"pool": response.text, "searchform_id": request.searchform_id}


def get_incidencias_grupo(request):
    url = f"https://glpi.edu.xunta.gal/uac/helpdesk/ajax/search.php?action=display_results&searchform_id={request.searchform_id}&itemtype=Ticket&glpilist_limit=1000&sort%5B%5D=19&order%5B%5D=DESC&is_deleted=0&as_map=0&browse=0&criteria%5B0%5D%5Blink%5D=AND&criteria%5B0%5D%5Bfield%5D=8&criteria%5B0%5D%5Bsearchtype%5D=equals&criteria%5B0%5D%5Bvalue%5D=mygroups&criteria%5B1%5D%5Blink%5D=AND&criteria%5B1%5D%5Bfield%5D=12&criteria%5B1%5D%5Bsearchtype%5D=equals&criteria%5B1%5D%5Bvalue%5D=notold&criteria%5B2%5D%5Blink%5D=AND&criteria%5B2%5D%5Bfield%5D=5&criteria%5B2%5D%5Bsearchtype%5D=equals&criteria%5B2%5D%5Bvalue%5D=22506&start=0&_glpi_csrf_token={request.csrf_token}"
    response = requests.request(
        "GET", url, headers=GLPI_HEADERS_REQUESTS, cookies=request.cookie)

    return {"pool": response.text, "searchform_id": request.searchform_id}


def get_validacions(request):
    url = f"https://glpi.edu.xunta.gal/uac/helpdesk/ajax/search.php?action=display_results&searchform_id={request.searchform_id}&itemtype=Ticket&glpilist_limit=1000&sort%5B%5D=19&order%5B%5D=DESC&is_deleted=0&as_map=0&browse=0&criteria%5B0%5D%5Blink%5D=AND&criteria%5B0%5D%5Bfield%5D=55&criteria%5B0%5D%5Bsearchtype%5D=equals&criteria%5B0%5D%5Bvalue%5D=2&criteria%5B1%5D%5Blink%5D=AND&criteria%5B1%5D%5Bfield%5D=59&criteria%5B1%5D%5Bsearchtype%5D=equals&criteria%5B1%5D%5Bvalue%5D=myself&criteria%5B2%5D%5Blink%5D=AND%20NOT&criteria%5B2%5D%5Bfield%5D=12&criteria%5B2%5D%5Bsearchtype%5D=equals&criteria%5B2%5D%5Bvalue%5D=5&start=0&_glpi_csrf_token={request.csrf_token}"
    response = requests.request(
        "GET", url, headers=GLPI_HEADERS_REQUESTS, cookies=request.cookie)

    return {"pool": response.text, "searchform_id": request.searchform_id}


def format_pool_to_json(pool_info):
    soup = BeautifulSoup(pool_info["pool"], 'html.parser')
    table = soup.find("table", id=pool_info["searchform_id"])
    pool = []

    for index, tr in enumerate(table.tbody.contents):
        if index % 2 != 0:
            pool.append({
                "titulo": tr.contents[5].a.string,
                "entidade": "00000000" if tr.contents[7].find_all("span")[2].text == "00000000" else tr.contents[7].find_all("span")[4].text,
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


@router.post("/login")
def login(request: Login):
    index_info = get_index_info()
    glpi_login(index_info, request)
    search_info = get_search_id(index_info["cookie"])
    #pool = format_pool_to_json(get_pool_sistemas(search_info))
    data = {
        "glpi_csrf_token": index_info["csrf_token"],
        "glpi_cookie": index_info["cookie"],
        "glpi_search_id": search_info["searchform_id"]
    }
    return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": data})
    # return "ok"


@router.post("/incidencias-centro")
def get_incidencias_centro(request: GLPI):
    try:
        incidencias = format_pool_to_json(
            get_incidencias_conexion_centro(request))
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": incidencias})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro obtendo as incidencias do centro"})


@router.post("/incidencias-asignadas")
def get_incidencias_asignadas(request: GLPI):
    try:
        incidencias = format_pool_to_json(
            get_incidencias_asignadas(request))
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": incidencias})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro obtendo as incidencias asignadas"})


@router.post("/incidencias-grupo")
def get_incidencias_grupo(request: GLPI):
    try:
        incidencias = format_pool_to_json(
            get_incidencias_grupo(request))
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": incidencias})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro obtendo as incidencias do grupo"})


@router.post("/validacions")
def get_validacions(request: GLPI):
    try:
        incidencias = format_pool_to_json(
            get_validacions(request))
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": incidencias})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro obtendo as validacións"})


@router.post("/")
def get_validacions(request: GLPI):
    try:
        asignadas = format_pool_to_json(
            get_incidencias_asignadas(request))
        grupo = format_pool_to_json(
            get_incidencias_grupo(request))
        validacions = format_pool_to_json(
            get_validacions(request))
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": False, "message": "ok", "data": {asignadas: asignadas, grupo: grupo, validacions: validacions}})
    except:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"error": True, "message": "Erro obtendo as validacións"})
