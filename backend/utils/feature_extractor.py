import pandas as pd
from urllib.parse import urlparse

def extract_features(url):

    features = {}

    features['URLLength'] = len(url)
    features['DomainLength'] = len(urlparse(url).netloc)
    features['NoOfSubDomain'] = url.count('.')
    features['NoOfObfuscatedChar'] = url.count('%')
    features['NoOfLettersInURL'] = sum(c.isalpha() for c in url)
    features['NoOfDegitsInURL'] = sum(c.isdigit() for c in url)
    features['NoOfEqualsInURL'] = url.count('=')
    features['NoOfQMarkInURL'] = url.count('?')
    features['NoOfAmpersandInURL'] = url.count('&')
    features['NoOfOtherSpecialCharsInURL'] = sum(
        not c.isalnum() for c in url
    )

    return pd.DataFrame([features])