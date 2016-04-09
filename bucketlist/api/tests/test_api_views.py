from django.contrib.auth.models import User
from django.test import TestCase
from django.core.urlresolvers import reverse

from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient


class APIAccess(APITestCase):
    # def setUp:
    #     test_user = User.objects.create(username="amos", first_name="Amos",
    #                                     last_name="Omondi",
    #                                     email="amos.omondi@andela.com",
    #                                     password="12345")

    def test_unauthorized_access_is_denied(self):
        response = self.client.get('api/bucketlists/')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # def test_create_account(self):
    #     pass
    #
    # def test_authorization_returns_a_token(self):
    #     pass
    # token = Token.objects.get(user__username='lauren')
    # client = APIClient()
    # client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
