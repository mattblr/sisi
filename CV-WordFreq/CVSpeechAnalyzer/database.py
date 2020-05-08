import pymongo

client = pymongo.MongoClient([MONGO_CONNECTION_STRING])

db = client["corona"]
speeches = db["speeches"]
wordfreq = db["wordfreq"]

def addSpeechURL(url):
    if (speeches.find({"url": url})):
        print("Already logged")
    else:
        speeches.insert_one({"url": url})
        return (url)
    
def updateWordFreq(wordFreqList):
    for wordOccurance in wordFreqList:
        freq = wordOccurance[0]
        word = wordOccurance[1]

        exists = wordfreq.find({"word": word})

        if (exists):
            wordfreq.update({"word": word}, {"$set": {"frequency": exists['frequency'] + freq}})
        else:
            wordfreq.insert_one({"word": word, "frequency": freq})
            