from flickrapi import FlickrAPI
from urllib.request import urlretrieve
from pprint import pprint
import os, time, sys

api_key = os.environ['FLICKR_KEY']
api_secret = os.environ['FLICKR_SECRET']
wait_time = 1

flickr = FlickrAPI(api_key, api_secret, format='parsed-json')

def getImageList(textSearch, numResults):

    imageList = flickr.photos.search( 
        text = textSearch, 
        per_page = numResults,
        media = 'photo',
        safe_search = 1,
        extras = 'url_q, original_format'
    ) 
    
    return imageList

def getVideoList(textSearch, numResults):
    
    videoList = flickr.photos.search( 
        text = textSearch, 
        per_page = numResults,
        media = 'video',
        safe_search = 1,
        extras = 'url_q, original_format'
    ) 
    
    return videoList

def downloadImages(imageList, path):

    images = imageList['photos']

    for i, photo in enumerate(images['photo']):
        print(i)
        url_q = photo['url_q']
        filepath = path + '/img' + str(i+1) + '.jpg'
        if os.path.exists(filepath): continue
        urlretrieve(url_q, filepath)
        time.sleep(wait_time)

def downloadVideos(videoList, path):

    videos = videoList['photos']

    for i, video in enumerate(videos['photo']):

            print(i)
            filepath = path + '/video' + str(i+1) + '.mp4'
            if os.path.exists(filepath): continue
            urldownload = 'https://live.staticflickr.com/video/' + video['id'] + '/' + video['secret'] + '720p.mp4?s=eyJpIjo1MTg2MzgzNjYwNywiZSI6MTY0NDIwOTA0MywicyI6ImE0NzViZTA2YjY0NDJhMmZmMDhmMDFlN2I0YmY4MmIzNmZjOTA3YzUiLCJ2IjoxfQ'
            urlretrieve(urldownload, filepath)
            time.sleep(wait_time)
    


if __name__ == "__main__":
    print('Executed as main program')
    images = getImageList("search", 2)
    print(images)
    path = "C:/Users/DK/Documents/2021-2/Visual/repo/vc/resources/_gen/images"
    downloadImages(images, path)
    