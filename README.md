# Documentation 
This document provides the instructions to run the application on your machine.

### Clone the project
```
git clone -b Project-1 https://github.com/airavata-courses/Team-Rocket.git
```
### Change to project directory
```
cd Team-Rocket/
```
# Running each module:
## 1. Auth Services
This micro-service provides services for registration and login related services.
### Navigate to AuthServices Folder
```
cd AuthServices
```
### Pre-requisites
```
1) python3 or higher
2) pip3 or higher
```

### Install required libraries
```
1) Linux or mac:
	pip3.7 install -r requirements.txt
2) Windows:
	pip3 install -r requirements.txt
```

### Run the code
```
Linux or mac:
	python3.7 -m Controllers.user_controller
Windows:
	python3 -m Controllers.user_controller
```
~~~
The Auth service will run in port 5000
~~~


## 2.  API Broker
This micro-service provides services to interact with Spotify API.
### Open a new terminal and navigate to APIBroker
```
cd APIBroker/
```
### Pre-requisites
```
1) node
2) npm
Refer: https://nodejs.org/en/download/
```
### Install required libraries
```
npm install
```
### Run the code
```
node server.js
```
~~~
The API broker will run in port 3002
~~~


## 3.  Profile Services
This micro-service provides services for user's personal details, history and recent moods.
### Open a new terminal and navigate to ProfileServices
```
cd ProfileServices/
```
### Pre-requisites
```
1) node
2) npm
Refer: https://nodejs.org/en/download/
```
### Install required libraries
```
npm install
```
### Run the code
```
node server.js
```
~~~
The Profile Service will run in port 3001
~~~


## 4.  Recommendation Engine
This micro-service provides services to recommend songs to user.
### Open a new terminal and navigate to RecommendationEngine
```
cd RecoEngineWorkspace/src/RecommendationEngine/
```
### Pre-requisites
```
1) Install Go and set GOPATH
	Refer: https://golang.org/doc/install
2) Set RecoEngineWorkspace to GOPATH
	Linux or Mac:
		export GOPATH=$GOPATH:~/<path to which you have cloned>/Team-Rocket/RecoEngineWorkspace
	Windows:
		Create and set the GOPATH in environment variables. The path should be like
		/<path to cloned repository>/Team-Rocket/RecoEngineWorkspace
		Refer: https://github.com/golang/go/wiki/SettingGOPATH
	
```

### Install required libraries and build
```
NOTE: Please run the below commands ONLY from the directory containing main.go (.../src/RecommendationEngine)
      If you receive a "can't find packages named RecommendationEngine/controllers" error, it is most likely due to 
      the following reasons:
      
      1) GOPATH has not been set properly. 
      	 Please run echo $GOPATH to verify that it looks like the following:
	 
      	 /<path to which you have cloned>/Team-Rocket/RecoEngineWorkspace
	 
	 NOTE: GOPATH shouldn't contain src directory
	 
      2) GOROOT has not been set properly. Please refer to https://golang.org/doc/install

Run the following commands to install required libraries and build executable:

go get github.com/gorilla/mux
go build
```
### Run the code
```
Linux/Mac:
	./RecommendationEngine
Windows:
	./RecommendationEngine.exe
```
~~~
The Recommendation Engine will run in port 8001
~~~


## 5.  User Interface
Provides User Interface for the application.
### Open a new terminal and navigate to UI
```
cd UI/
```
### Pre-requisites
```
1) node
2) npm
Refer: https://nodejs.org/en/download/
```
### Install required libraries
```
npm install
```
### Run the code
```
npm run client
```
~~~
The User Interface will run in port 3000
~~~
