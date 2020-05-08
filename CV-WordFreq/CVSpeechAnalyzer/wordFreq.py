import requests
from bs4 import BeautifulSoup
import string, re
from string import digits
from .wordListToFreqDict import wordListToFreqDict
from .sortFreqDict import sortFreqDict
from .removeStopwords import removeStopwords


def wordFreq(url):

    url = 'https://www.gov.uk'+url
    r = requests.get(url)

    r = requests.get(url)

    soup = BeautifulSoup(r.content, 'html.parser')

    wordlist = re.compile(r'\W+', re.UNICODE) \
    .split(soup.find('div', class_='govspeak') \
    .text.replace('\n', ' ') \
    .strip() \
    .lower() \
    .translate(str.maketrans('', '', digits)))

    wordlist = removeStopwords(wordlist)

    wordfreq = []
    for w in wordlist:
        wordfreq.append(wordlist.count(w))
        
    str(list(zip(wordlist, wordfreq)))




    wordFreq = sortFreqDict(wordListToFreqDict(wordlist))

    return(wordFreq)