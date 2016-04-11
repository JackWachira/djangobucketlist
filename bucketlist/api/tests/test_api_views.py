from django.contrib.auth.models import User
from django.test import TestCase
from django.core.urlresolvers import reverse

from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient

client = APIClient()


class APIAccessTestCase(APITestCase):
    def setUp(self):
        client.post('/api/auth/register/',
                    {
                        'username': 'amos',
                        'email': 'amos.omondi@andela.com',
                        'password': '12345',
                    },
                    format='json')

    def test_unauthorized_access_is_denied(self):
        response = self.client.get('/api/bucketlists/')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_authorization_returns_a_token(self):
        response = client.post('/api/auth/login/',
                               {
                                    'username': 'amos',
                                    'password': '12345',
                               },
                               format='json')

        self.assertIn("token", response.data)


class APIBucketListTestCase(APITestCase):
    def setUp(self):
        client.post('/api/auth/register/',
                    {
                        'username': 'amos',
                        'email': 'amos.omondi@andela.com',
                        'password': '12345',
                    },
                    format='json')

    def test_bucketlist_creation(self):
        login_response = client.post('/api/auth/login/',
                                     {
                                        'username': 'amos',
                                        'password': '12345',
                                     },
                                     format='json')

        token = login_response.data["token"]

        client.credentials(HTTP_AUTHORIZATION='Token ' + token)

        creation_response = client.post('/api/bucketlists/',
                                        {
                                            'name': 'Books I want to read',
                                        },
                                        format='json')

        self.assertEqual(creation_response.status_code, 201)

    # def test_bucketlist_querying(self):
    #     login_response = client.post('/api/auth/login/',
    #                                  {
    #                                     'username': 'amos',
    #                                     'password': '12345',
    #                                  },
    #                                  format='json')
    #
    #     token = login_response.data["token"]
    #
    #     client.credentials(HTTP_AUTHORIZATION='Token ' + token)
    #
    #     bucketlist = client.get('/api/bucketlists/', format='json')
    #
    #     self.assertTrue(bucketlist.id, 1)
