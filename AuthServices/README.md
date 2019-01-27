# Auth Services
This micro-service provides services for registration and login related services.

## How to run the code?
### Pre-requisites
```
	python3 or higher
```

### Clone the repository
```
	git clone -b Project-1 https://github.com/airavata-courses/Team-Rocket.git
```

### Navigate to Auth Services folder
```
	cd Team-Rocket/AuthServices/
```

### Install required libraries
```
	Linux or mac:
	pip3.7 install -r requirements.txt
	Windows:
	pip3 install -r requirements.txt
```

### Run the code
```
	Linux or mac:
	python3.7 -m Controllers.user_controller
	Windows:
	python3 -m Controllers.user_controller
```

### Run Tests
```
	Linux or mac:
	python3.7 -m unittest tests.registration_test
	python3.7 -m unittest tests.login_test
	Windows:
	python3 -m unittest tests.registration_test
	python3 -m unittest tests.login_test
```

## API References

<dl>
  <dt>1. Registration API</dt>
  <dd>URL: /register</dd>
  <dd>Method: POST</dd>
  <dd>Request Object: { <br>
			&nbsp &nbsp &nbsp "firstName": "Jhon", <br>
			&nbsp &nbsp &nbsp "lastName": "Doe", <br>
		   &nbsp &nbsp &nbsp "email": "jhon.doe@gmail.com", <br>
		   &nbsp &nbsp &nbsp "password": "@1Skwy%nwp", <br>
		   &nbsp &nbsp &nbsp "confirmPassword": "@1Skwy%nwp", <br>
		   &nbsp &nbsp &nbsp "dob": "11/02/1993"	<br>   
  &nbsp }</dd>
  <dd>dob format : "MM/DD/YYYY"</dd><br>
  <dd>Response Object: { <br>
		   &nbsp &nbsp &nbsp "user_id": "5c4d0f32f207610f583h5e30"<br>   
  &nbsp }</dd><br>
  <dt>2. Login API</dt>
  <dd>URL: /login</dd>
  <dd>Method: POST</dd>
  <dd>Request Object: { <br>
			&nbsp &nbsp &nbsp "email": "jhon.doe@gmail.com", <br>
		   &nbsp &nbsp &nbsp "password": "@1Skwy%nwp", <br>
  &nbsp }</dd><br>
  <dd>Response Object: { <br>
		   &nbsp &nbsp &nbsp "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUz<br>&nbsp &nbsp&nbsp &nbsp&nbsp &nbspI1NiJ9.eyJzdWIiOiI1YzRkMGYzMmYyMDAwMTBmNTkzYjVlMzAifQUo<br>&nbsp &nbsp&nbsp &nbsp&nbsp &nbspbRoFVc6nCUVndxL7wzgrZu3Nl1xG1JOdW-dM6Z0a4"<br>   
  &nbsp }</dd>
   </dl>
