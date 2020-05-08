import pymongo


client = pymongo.MongoClient([MONGO_CONNECTION_STRING])

db = client["corona"]
rawdata = db["rawdatas"]

def addRawData(date, tested, cases, deaths):
        rawdata.insert({"date": date, "tested":tested, "cases":cases, "deaths":deaths})
    