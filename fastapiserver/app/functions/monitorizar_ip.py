import os
import subprocess

resultadosPing = []


def monitorizar_ip(ip, queue):
    resultadosPing = []
    print("Empezamos monitorización")
    f = open("proba.txt", "a")
    while True:
        with open(os.devnull, "wb") as limbo:
            res = subprocess.Popen(["ping", "-n", "2", "-w", "400", ip],
                                   stdout=limbo, stderr=limbo).wait()
            if res == 0:
                print("Ping to", ip, "OK")
                resultado = "OK, "
                f.write(resultado)
                resultadosPing.append("OK")
            else:
                print("Ping to", ip, "FAIL")
                resultado = "FAIL, "
                f.write(resultado)
                resultadosPing.append("FAIL")

        queue.put(resultadosPing)
        return resultadosPing
