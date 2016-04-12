"""Import test tools from rest_framework."""
from rest_framework import status
from rest_framework.test import APITestCase


class APIAccessTestCase(APITestCase):
    """Tests for API authorizaion."""

    def setUp(self):
        """Setup."""
        self.client.post('/api/auth/register/',
                         {
                             'username': 'amos',
                             'email': 'amos.omondi@andela.com',
                             'password': '12345',
                         },
                         format='json')

    def test_unauthorized_access_is_denied(self):
        """Test that unauthorized access is not allowed."""
        response = self.client.get('/api/bucketlists/')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_authorization_returns_a_token(self):
        """Test that correct login details return a token."""
        response = self.client.post('/api/auth/login/',
                                    {
                                        'username': 'amos',
                                        'password': '12345',
                                    },
                                    format='json')

        self.assertIn("token", response.data)


class APIBucketListTestCase(APITestCase):
    """Test for actions on bucketlists."""

    def setUp(self):
        """Setup."""
        self.client.post('/api/auth/register/',
                         {
                             'username': 'amos',
                             'email': 'amos.omondi@andela.com',
                             'password': '12345',
                         },
                         format='json')

        login_response = self.client.post('/api/auth/login/',
                                          {
                                              'username': 'amos',
                                              'password': '12345',
                                          },
                                          format='json')

        token = login_response.data["token"]

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

    def test_bucketlist_creation(self):
        """Test that user can create a bucketlist."""
        creation_response = self.client.post('/api/bucketlists/',
                                             {
                                                 'name': 'Books I want to read',
                                             },
                                             format='json')

        self.assertEqual(creation_response.status_code, 201)

    def test_all_bucketlists_querying(self):
        """Test that a user can query all bucketlists."""
        creation_response = self.client.post('/api/bucketlists/',
                                             {
                                                 'name': 'Books I want to read',
                                             },
                                             format='json')

        bucketlists = self.client.get('/api/bucketlists/', format='json')

        self.assertEqual(bucketlists.status_code, 200)
        self.assertEqual("Books I want to read", bucketlists.data['results'][0]['name'])

    def test_bucketlists_querying_by_id(self):
        """Test that a user can query one bucketlist by id."""
        creation_response = self.client.post('/api/bucketlists/',
                                             {
                                                 'name': 'Books I want to read',
                                             },
                                             format='json')

        bucketlist = self.client.get('/api/bucketlists/1', format='json')

        self.assertEqual(bucketlist.status_code, 200)
        self.assertEqual("Books I want to read", bucketlist.data['name'])

        non_existent_bucketlist = self.client.get('/api/bucketlists/10', format='json')
        self.assertEqual(non_existent_bucketlist.status_code, 404)

    def test_bucketlist_searching(self):
        """Test that a user can search for bucketlist."""
        creation_response = self.client.post('/api/bucketlists/',
                                             {
                                                 'name': 'Places to travel to',
                                             },
                                             format='json')

        result = self.client.get('/api/bucketlists/', {'q': 'aces'}, format='json')

        self.assertEqual(result.status_code, 200)
        self.assertEqual("Places to travel to", result.data['results'][0]['name'])

    def test_bucketlist_updating(self):
        """Test that a user can update a bucketlist."""
        creation_response = self.client.post('/api/bucketlists/',
                                             {
                                                 'name': 'Books I want to read',
                                             },
                                             format='json')

        update_response = self.client.put('/api/bucketlists/1',
                                          {
                                              'name': 'Books I want to read today',
                                          },
                                          format='json')

        self.assertEqual(update_response.status_code, 200)
        self.assertEqual("Books I want to read today", update_response.data['name'])

    def test_bucketlist_deleting(self):
        """Test that a user can delete a bucketlist."""
        creation_response = self.client.post('/api/bucketlists/',
                                             {
                                                 'name': 'Books I want to read',
                                             },
                                             format='json')

        delete_response = self.client.delete('/api/bucketlists/1')

        self.assertEqual(delete_response.status_code, 204)
        self.assertIsNone(delete_response.data)


class APIBucketlistItemTestCase(APITestCase):
    """Tests for actions on bucketlist items."""

    def setUp(self):
        """Setup."""
        self.client.post('/api/auth/register/',
                         {
                             'username': 'amos',
                             'email': 'amos.omondi@andela.com',
                             'password': '12345',
                         },
                         format='json')

        login_response = self.client.post('/api/auth/login/',
                                          {
                                              'username': 'amos',
                                              'password': '12345',
                                          },
                                          format='json')

        token = login_response.data["token"]

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

        creation_response = self.client.post('/api/bucketlists/',
                                             {
                                                 'name': 'Books I want to read',
                                             },
                                             format='json')

    def test_creating_bucketlist_item(self):
        """Test creation of a bucketlist item."""
        item_creation_response = self.client.post('/api/bucketlists/1/items/',
                                                  {
                                                      'name': 'Harry Potter',
                                                  },
                                                  format='json')

        self.assertEqual(item_creation_response.status_code, 201)
        self.assertEqual("Harry Potter", item_creation_response.data['name'])
        self.assertEqual(False, item_creation_response.data['done'])

    def test_updating_bucketlist_item(self):
        """Test updating of a bucketlist item."""
        item_creation_response = self.client.post('/api/bucketlists/1/items/',
                                                  {
                                                      'name': 'Harry Potter',
                                                  },
                                                  format='json')

        item_updating_response = self.client.put('/api/bucketlists/1/items/1',
                                                 {
                                                     'name': 'Harry Potter 3',
                                                 },
                                                 format='json')

        self.assertEqual(item_updating_response.status_code, 200)
        self.assertIn("Harry Potter 3", item_updating_response.data['name'])

    def test_deleting_bucketlist_item(self):
        """Test updating of a bucketlist item."""
        item_creation_response = self.client.post('/api/bucketlists/1/items/',
                                                  {
                                                      'name': 'Harry Potter',
                                                  },
                                                  format='json')

        item_deletion_response = self.client.delete('/api/bucketlists/1/items/1')

        self.assertEqual(item_deletion_response.status_code, 204)
        self.assertIsNone(item_deletion_response.data)
