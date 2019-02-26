import pymongo
import ssl
#Mongo DB handler class
class MongoConfig:

    # Method to provide connection with mongo db
    def db(self):
        try:
            client = pymongo.MongoClient("mongodb+srv://achanta:userservice@userservice-recot.mongodb.net/test?retryWrites=true&ssl=true&ssl_cert_reqs=CERT_NONE")
            db = client["userdb"]
            collection = db["users"]
            return collection
        except:
            return False
