#importing service to test the registration method
from Services.service import Service

#importing required libraries for unittesting
import unittest

# Tests to run registration method
class RegistrationTest(unittest.TestCase):

    # Test whether the register is working with positive scenario
    def test_registration_with_positive_scenarios(self):
        service = Service()
        response = service.register({"email":"sairohith.achanta@gmail.com",
        "password":"password", "firstName":"Jhon", "lastName":"Smith", "confirmPassword":"password",
        "dob":"11/02/1994"})
        assert isinstance(response, object)
        assert response.user_id is not None

    # Test whether returns a specific string if a user provides different paswords
    def test_registration_with_mismatch_password(self):
        service = Service()
        response = service.register({"email":"sairohith.achanta@gmail.com",
        "password":"password", "firstName":"Jhon", "lastName":"Smith", "confirmPassword":"confirmpassword",
        "dob":"11/02/1994"})
        assert isinstance(response, str)
        assert response == "Password did not match"

    # Test whether returns a specific string if a user enters invai=lid format of email
    def test_registration_with_improper_email_id(self):
        service = Service()
        response = service.register({"email":"jhon_gmail.com",
        "password":"password", "firstName":"Jhon", "lastName":"Smith", "confirmPassword":"confirmpassword",
        "dob":"11/02/1994"})
        assert isinstance(response, str)
        assert response == "Please enter proper email address"

if __name__ == '__main__':
    unittest.main()
