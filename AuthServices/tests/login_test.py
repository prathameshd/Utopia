#importing service to test the login method
from Services.service import Service

#importing required libraries for unittesting
import unittest

# Tests to run login method
class LoginTest(unittest.TestCase):

    # Test whether the login is working with positive scenario
    def test_login_with_proper_credentials(self):
        service= Service()
        response = service.login({"email":"saai@gmail.com", "password":"123456"})
        assert isinstance(response, object)
        assert response.token is not None

    # Test whether returns a specific string if a user is not registered
    def test_login_with_invalid_email_id(self):
        service= Service()
        response = service.login({"email":"ftrskii@gmail.com", "password":"123456"})
        assert isinstance(response, str)
        assert response == "User not available"

    # Test whether returns a specific string if a user enters wrong password
    def test_login_with_wrong_password(self):
        service= Service()
        response = service.login({"email":"saai@gmail.com", "password":"pass"})
        assert isinstance(response, str)
        assert response == "Invalid Credentials"

if __name__ == '__main__':
    unittest.main()
