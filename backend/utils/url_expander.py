import requests

def expand_url(url):
    try:
        response = requests.get(url, allow_redirects=True, timeout=5)
        return response.url
    except:
        return url