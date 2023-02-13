import cloudinary
from app import config
import os
from PIL import Image


async def upload_photo(image):
    cloudinary.config(cloud_name=config.CLOUD_NAME,
                      api_key=config.CLOUD_API_KEY, api_secret=config.CLOUD_API_SECRET)

    try:
        upload = cloudinary.uploader.upload(
            image.file, folder="planos_centros")
        upload_url = upload["secure_url"]
        return upload_url
    except Exception:
        return None


async def delete_photo(url):
    cloudinary.config(cloud_name=config.CLOUD_NAME,
                      api_key=config.CLOUD_API_KEY, api_secret=config.CLOUD_API_SECRET)
    nome_imaxe = url.split("/")[-1].split(".")[0]
    carpeta = url.split("/")[-2]
    public_id = f"{carpeta}/{nome_imaxe}"
    try:
        result = cloudinary.uploader.destroy(
            public_id)
        return result
    except KeyError:
        return False
