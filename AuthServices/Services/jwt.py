import jwt

# CLass to handle JWT
class Jwt:

	# Method to encode user_id and return a JWT token
	@staticmethod
	def encode_auth_token(user_id):
		try:
			payload = {'sub': str(user_id),}
			return jwt.encode(payload, 'utopia',algorithm='HS256')
		except Exception as e:
			return e

	# Method to check the validity of the JWT token
	@staticmethod
	def decode_auth_token(auth_token):
		try:
			payload = jwt.decode(auth_token, 'utopia')
			return payload
		except jwt.ExpiredSignatureError:
			return False
		except jwt.InvalidTokenError:
			return False
