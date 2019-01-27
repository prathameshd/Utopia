#Importing pre-defined classes
from flask import Flask,request,jsonify
import jsonpickle

#Importing models
from Models.User import User

#Importing Services
from Services.jwt import Jwt
from Services.service import Service

#in order to access any images
app = Flask(__name__, static_url_path='/static')
app.config.from_object(__name__)

# API to register a user
@app.route("/register", methods=['POST'])
def register():
	try:
		service = Service()
		data = request.json
		response = service.register(data)
		if isinstance(response, User):
			return jsonpickle.encode(response, unpicklable=False), 200
		else:
			return jsonify({'Error': response}), 500
	except Exception as e:
		return jsonify(e), 500

#The application starts running from here
if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 5000)
