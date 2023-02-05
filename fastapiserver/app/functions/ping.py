import os
import subprocess

# COMPROBAR IP RECIBIDA


def lan8x(ip):
    ip = ip.split('.')
    if (int(ip[1]) > 79):
        return 0
    else:
        return 1


# PING
pings = ["1", "7", "10"]
FNULL = open(os.devnull, 'wb')


def ping(ip):
    valor = lan8x(ip)
    resultadosPing = []
    if (valor == 1):
        with open(os.devnull, "wb") as limbo:
            for ping in pings:
                address = f"{ip}{str(ping)}"
                res = subprocess.Popen(["ping", "-n", "1", "-w", "200", address],
                                       stdout=limbo, stderr=limbo).wait()
                if res == 0:
                    print("Ping to", address, "OK")
                    resultado = {"ip": address, "status": "up"}
                    resultadosPing.append(resultado)
                else:
                    print("Ping to", address, "FAILED")
                    resultado = {"ip": address, "status": "down"}
                    resultadosPing.append(resultado)

            return resultadosPing
    else:
        resultadosPing.append([
            "LAN 10.8X.XX.XX. Non é necesaria a comprobación"])
        return resultadosPing


def network_ping(ip):
    with open(os.devnull, "wb") as limbo:
        res = subprocess.Popen(["ping", "-n", "1", "-w", "1000", ip],
                               stdout=limbo, stderr=limbo).wait()
        if res == 0:
            print("Ping to", ip, "OK")
            resultado = "up"
        else:
            print("Ping to", ip, "FAILED")
            resultado = "down"

        return resultado
