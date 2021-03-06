from kazoo.client import KazooClient
from kazoo.client import KazooState
from kazoo.client import KeeperState
from kazoo.exceptions import NodeExistsError, NoNodeError, ConnectionLossException
from flask import request, jsonify
from json import load
import requests
import json

# Zookeeper Service Registry
class ZookeeperHandler:
    def registerAuthService(port):
        zk = KazooClient(hosts='149.165.170.7:2181', read_only=True)
        zk.start()
        path = '/AuthServices'
        host= str(requests.get('https://ip.42.pl/raw').text) # AuthServices
        pass_data=json.dumps({"host":host, "port":port}).encode('utf-8')
        try:
            zk.create(path,value=pass_data, ephemeral=True, makepath=True)
            print("Auth Service is running '"+path+"' here.")
        except NodeExistsError:
            print("Node already exists in Zookeeper")
