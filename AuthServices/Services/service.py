#Importing pre-defined modules
import jwt
import re

#Importing Services
from Services.mongo_config import MongoConfig
from Services.crypto import Crypto
from Services.jwt import Jwt

#Importing models
from Models.User import User


class Service:

	#Service Method to register a user
	def register(self, user):
		try:
			service = Service()
			if(service.is_valid_email(user['email'])):
				if(user['password']==user['confirmPassword']):
					mongo_config = MongoConfig()
					collection = mongo_config.db()
					if(collection):
						crypto = Crypto()
						user['password'] = crypto.encrypted_string(user['password'])
						saved_user = collection.insert_one(user)
						user = User()
						user.user_id = str(saved_user.inserted_id)
						return user
					else:
						return "Unable to connect"
				else:
					return "Password did not match"
			else:
				return "Please enter proper email address"
		except Exception as e:
			return e

	# Checkthe validity of the email
	def is_valid_email(self, email):
		return bool(re.search(r"^[\w\.\+\-]+\@[\w]+\.[a-z]{2,3}$", email))
