import requests
from bs4 import BeautifulSoup

def getLinks():
    r = requests.get('https://www.gov.uk/government/collections/slides-and-datasets-to-accompany-coronavirus-press-conferences')

    soup = BeautifulSoup (r.content, 'html.parser')

    links = []

    for a in soup.find_all('a', class_='gem-c-document-list__item-title gem-c-document-list__item-link', href=True):
        links.append(a['href'])

    filtered_links=[]

    for item in filter(lambda item: '/government/speeches/' in item, links):
        filtered_links.append(item)

    return filtered_links