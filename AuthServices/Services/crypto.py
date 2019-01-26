from passlib.context import CryptContext

# Class to handle string encryption and to check the validity of encrypted string
class Crypto:

	# Method to encrypt a string
	def encrypted_string(self, text):
		pwd_context = CryptContext( schemes=["pbkdf2_sha256"], default="pbkdf2_sha256", pbkdf2_sha256__default_rounds=30000)
		return pwd_context.hash(text)

	# Method to verify the encrypted string with the plain text
	def verify_decrypted_string(self, text, hashed):
		pwd_context = CryptContext( schemes=["pbkdf2_sha256"], default="pbkdf2_sha256", pbkdf2_sha256__default_rounds=30000)
		return pwd_context.verify(text, hashed)
