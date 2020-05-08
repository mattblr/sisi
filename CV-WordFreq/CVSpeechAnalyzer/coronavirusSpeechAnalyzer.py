from .wordFreq import wordFreq
from .getLinks import getLinks
from .database import addSpeechURL
from .database import updateWordFreq

def app():
    links = getLinks()

    new_speeches = []

    for link in links:
        addUrl = addSpeechURL(link)
        if (addUrl is not None):
            new_speeches.append(addUrl)

    if not new_speeches:
        print("Nothing to log")
    else:
        for speech in new_speeches:
            updateWordFreq(wordFreq(speech))

    print("Done")