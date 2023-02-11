import cloudinary
from app import config
import os
from PIL import Image


def upload_photo(image):
    cloudinary.config(cloud_name=config.CLOUD_NAME,
                      api_key=config.CLOUD_API_KEY, api_secret=config.CLOUD_API_SECRET)

    with open('file.png', 'wb') as handler:
        handler.write(image)
        image = Image.open("file.png")
        image.save("file.png")
        weight = os.stat('file.png').st_size

    if weight < 10485760 and os.path.exists('file.png'):
        upload = cloudinary.uploader.upload(
            "file.png", folder="planos_centros")
        upload_url = upload["secure_url"]
        return upload_url


def delete_photo(url):
    cloudinary.config(cloud_name=config.CLOUD_NAME,
                      api_key=config.CLOUD_API_KEY, api_secret=config.CLOUD_API_SECRET)

    try:
        cloudinary.uploader.destroy(
            url, folder="planos_centros")
        return True
    except KeyError:
        return False
