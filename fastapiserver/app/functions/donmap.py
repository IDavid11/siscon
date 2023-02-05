import nmap
import collections

nm = nmap.PortScanner()
hosts = {}


def nmap(lan, direccion_ip, queue):
    resultadosNmap = []

    nm.scan(hosts=lan, arguments='-sP ')
    hosts_list = [(x, nm[x]['status']['state']) for x in nm.all_hosts()]
    for host, status in hosts_list:
        splitted_ip = host.split('.')
        ip = int(splitted_ip[-1])
        hosts.update({ip: status})

    od = collections.OrderedDict(sorted(hosts.items()))
    for k, v in od.items():
        if v == "up":
            v = "Host is up"
        resultado = f'{direccion_ip}{k}: {v}'
        resultadosNmap.append(resultado)

    queue.put(resultadosNmap)
    return resultadosNmap
