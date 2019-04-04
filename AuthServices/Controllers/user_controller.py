#Importing pre-defined classes
from flask import Flask,request,jsonify
import jsonpickle
from flask_cors import CORS,cross_origin

#Importing models
from Models.User import User

#Importing Services
from Services.jwt import Jwt
from Services.service import Service
from Services.zookeeper_handler import ZookeeperHandler
from RabbitMQ.email_queue import EmailQueue

#in order to access any images
app = Flask(__name__, static_url_path='/static')
app.config.from_object(__name__)

# Below is to enable requests from other domains i.e, enable React to access these APIs
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/*": {"origins": "*"}})

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

# API to check the user's credentials and return JWT token
@app.route("/login", methods=['POST'])
def check():
	data = request.json
	try:
		service = Service()
		response = service.login(data)
		if isinstance(response, User):
			return jsonpickle.encode(response, unpicklable=False), 200
		else:
			return jsonify({'Error': response}), 500
	except Exception as e:
		return jsonify(e), 500

#The application starts running from here
if __name__ == '__main__':
	try:
		#ZookeeperHandler.registerAuthService(5000)
		email_queue = EmailQueue()
		email_queue.receiver()
	except Exception as e:
		print(e)
	app.run(host = '0.0.0.0', port = 5000)
