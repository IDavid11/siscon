from app.db import centros_collection
import nmap
import collections

nm = nmap.PortScanner()


netmask = {"24": 1, "23": 2, "22": 4, "21": 8, "20": 16}


def lan8x(ip):
    ip = ip.split(".")
    if int(ip[1]) > 79:
        return False
    else:
        return True


def get_direccion_ip_switches(lan):
    networks_to_scan = []
    lan = lan.split(".")
    ip = ".".join(lan[0:3])
    mask = lan[-1].split("/")
    mask = mask[-1]

    number_networks_to_scan = 24 - int(mask)
    number_networks_to_scan = pow(2, number_networks_to_scan)
    print(mask, number_networks_to_scan)

    for index in range(0, number_networks_to_scan):
        var = int(lan[2]) + index
        command = f"{lan[0]}.{lan[1]}.{var}.10-19"
        networks_to_scan.append(command)

    return networks_to_scan


def nmap(lan):
    hosts = []
    switches = []
    networks_to_scan = get_direccion_ip_switches(lan)
    for network_to_scan in networks_to_scan:
        nm.scan(hosts=network_to_scan, arguments="-sP")
        hosts_list = [(x, nm[x]["status"]["state"]) for x in nm.all_hosts()]
        for host, status in hosts_list:
            splitted_ip = host.split(".")
            ip = int(splitted_ip[-1])
            network = network_to_scan.split(".")
            network = ".".join(network[0:3])
            hosts.append({"ip": f"{network}.{ip}", "status": status})

    # print(hosts)
    # od = collections.OrderedDict(sorted(hosts.values()))
    # switches = sorted(hosts, key=lambda switch: switch["ip"])
    switches = hosts
    print(switches)
    return switches


def get_main_lan(lans):
    valid_lans = []

    for lan in lans:
        is_valid = lan8x(lan)
        if is_valid:
            valid_lans.append(lan)

    if len(valid_lans) > 1:
        for lan in valid_lans:
            splitted_lan = lan.split(".")
            splitted_lan_mask = lan.split("/")
            if splitted_lan_mask[-1] != "24":
                return lan
            if splitted_lan[1] < "50":
                return lan

    return valid_lans[0]


def save_switches(centros):
    for index, centro in enumerate(centros):
        print(index, centro["centro"])
        lans = centro["lan"]

        if len(lans) == 1:
            lan = lans[0]

        if len(lans) > 1:
            lan = get_main_lan(lans)

        switches = nmap(lan)

        centros_collection.find_one_and_update(
            {"centro": centro["centro"]}, {"$set": {"electronica.switches": switches}}
        )

    return switches
