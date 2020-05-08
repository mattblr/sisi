import requests
from bs4 import BeautifulSoup
from datetime import datetime
from .database import addRawData

def app():
    url = 'https://www.gov.uk/guidance/coronavirus-covid-19-information-for-the-public'

    r = requests.get(url)

    soup = BeautifulSoup(r.content, 'html.parser')

    table = soup.find('div', class_='govspeak').find('table').find_all('tr')

    filtered = [] 
    for item in table[2].find_all('td'):
        filtered.append(item.text.strip().replace(',', ''))
        
    tested = int(filtered[2])
    cases = int(filtered[3])
    deaths = int(filtered[5])

    query = """
    {
    kpiData {
        totalTested
        totalCases
        totalDeaths
    }
    }
    """

    request = requests.post('https://sisi-api.azurewebsites.net', json={'query': query})
    if request.status_code == 200:
        print("Getting data from API...")
        request = request.json()
    else:
        raise Exception("Query failed to run by returning code of {}. {}".format(request.status_code, query))

    currentTested = int(request['data']['kpiData']['totalTested'])
    currentCases =  int(request['data']['kpiData']['totalCases'])
    currentDeaths = int(request['data']['kpiData']['totalDeaths'])

    if (tested > currentTested )& (cases > currentCases) & (deaths > currentDeaths):
        print("Posting data to database")
        addRawData(datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0), tested, cases, deaths)


