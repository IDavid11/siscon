# CODIGO DO CENTRO
def format_codigo(centro):
    splitted_centro = centro.split(' - ')
    codigo = splitted_centro[0]
    return codigo

# LANS DO CENTRO


def format_lan(lan_excel):
    real_lans = []
    splitted_lan = lan_excel.split(" , ", 2)
    for lan in splitted_lan:
        real_lans.append(lan)
    return real_lans

# DIRECCION IP 10.X.X.?


def get_direccion_ip(lans):
    direccions_ip = []
    for ip in lans:
        ip = ip["rango"].split(".")
        ip = ip[0], ".", ip[1], ".", ip[2], "."
        ip = ''.join(ip)
        direccions_ip.append(ip)

    return direccions_ip


# IP ABALAR
red_abalar = "1-49,250-252"


def get_abalar_lan(lans):
    abalar_lans = []
    for lan in lans:
        lan = lan.split(", ")
        for l in lan:
            abalar_lan = l.split('.')
            abalar_lan = abalar_lan[0], ".", abalar_lan[1], ".", abalar_lan[2], ".", red_abalar
            abalar_lan = ''.join(abalar_lan)
            abalar_lans.append(abalar_lan)
    return abalar_lans
