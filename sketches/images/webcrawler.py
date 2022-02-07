# -*- coding: utf-8 -*-
import json
import requests
import shutil
from tqdm import tqdm

def download_images():
    key = "20977986-3000fea631f919184c7949341"
    image_type = "photo"
    per_page = 20
    page = 1
    orientation = "horizontal"
    base_url = f'https://pixabay.com/api/?key={key}&image_type={image_type}&per_page={per_page}&page={page}&orientation={orientation}& colors='

    colors = ["grayscale", "transparent", "red", "orange", "yellow", "green", "turquoise", "blue", "lilac", "pink", "white", "gray", "black", "brown" ]
    for color in colors:
        URL = base_url + color
        res = requests.get(URL)
        res_data = json.loads(res.text)
        for i, image in tqdm(enumerate(res_data['hits'])):
            # Save the image
            url = image['webformatURL']
            name = 'img'+ str(i) + '.jpg'
            r = requests.get(url, stream=True)
            if r.status_code == 200:
                with open(name, 'wb') as f:
                    r.raw.decode_content = True
                    shutil.copyfileobj(r.raw, f)


download_images()
