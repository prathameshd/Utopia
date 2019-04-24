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
						if "confirmPassword" in user:
							del user['confirmPassword']
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

	# Service method to generate a JWT and provide to user
	def login(self, data):
		print("Saadha login")
		try:
			mongo_config = MongoConfig()
			collection = mongo_config.db()
			if(collection):
				user_obj = User()
				search_user = {'email': data['email']}
				user = collection.find(search_user)
				crypto = Crypto()
				if(user):
					if(crypto.verify_decrypted_string(data['password'], user[0]['password'])):
						user_obj.first_name = user[0]['firstName']
						#user_obj.last_name = user[0]['lastName']
						user_obj.user_id = str(user[0]['_id'])
						print("NORMAL WAY===", user[0]['_id'])
						user_obj.token = Jwt.encode_auth_token(user_id=user[0]['_id']).decode()
						return user_obj
					else:
						return "Invalid Credentials"
				else:
					return "User not available"
			else:
				return "Unable to connect to database"
		except IndexError as IE:
			return "User not available"
		except Exception as e:
			raise e

	# Service method to check if user exists and intert into collection
	def check_user(self, data):
		try:
			print("INSIDE SERVICE",data)
			mongo_config = MongoConfig()
			collection = mongo_config.db()
			if(collection):
				
				user_obj = User()
				search_user = {'email': data['email']}				
				user = collection.find(search_user)
				print(len(list(user)), "find user")
				#print("OTHER WAY===", user)
				crypto = Crypto()
				print(user!=None)
				if(user.count()>0):
					#if(crypto.verify_decrypted_string(data['password'], user[0]['password'])):
						#user_obj.first_name = user[0]['firstName']
						#user_obj.last_name = user[0]['lastName']
						#user_obj.user_id = str(user[0]['_id'])
						print("inside")
						user_obj.token = (Jwt.encode_auth_token('abcdef')).decode()
						print("token-->",user_obj.token)
						return user_obj

				else:
					print("User does not exist", data)
					
					saved_user = collection.insert_one(data)
					user_obj = User()
					user_obj.first_name = data['firstName']

					user_obj.token = (Jwt.encode_auth_token('abcdef')).decode()
					user_obj.user_id = str(saved_user.inserted_id)
					return user_obj
					
					# if(crypto.verify_decrypted_string(data['password'], user[0]['password'])):
					# 	user_obj.first_name = user[0]['firstName']
					# 	#user_obj.last_name = user[0]['lastName']
					# 	user_obj.user_id = str(user[0]['_id'])
					# 	user_obj.token = Jwt.encode_auth_token(user_id=user[0]['_id']).decode()
					# 	return user_obj
					# else:
					# 	return "Invalid Credentials"						
			else:
				return "Unable to connect to database"
		except IndexError as IE:
			return "User not available"
		except Exception as e:
			raise e