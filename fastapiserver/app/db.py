from pymongo import MongoClient
from .config import MONGO_DB_USER, MONGO_DB_KEY, MONGO_DB_URL

#cluster = MongoClient("mongodb://uac")

cluster_atlas = MongoClient(
    f"mongodb+srv://{MONGO_DB_USER}:{MONGO_DB_KEY}@{MONGO_DB_URL}")

cluster = MongoClient("mongodb://localhost:27017")

db = cluster["uac"]
centros_collection = db["centros"]
users_collection = db["usuarios"]
monitorizacion_collection = db["monitorizacions"]
hardware_collection = db["hardware"]
switches_collection = db["switches"]
tipo_electronica_collection = db["tipo_electronica"]
avisos_collection = db["logs_electronica"]
