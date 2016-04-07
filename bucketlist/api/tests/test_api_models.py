from api.models import BucketList, BucketListItem
from django.contrib.auth.models import User
from django.test import TestCase


class BucketListTestCase(TestCase):
    def setUp(self):
        BucketList.objects.create(name="Life Goals")

    def test_bucketlist_was_created(self):
        bucketlist = BucketList.objects.get(name="Life Goals")
        self.assertEqual(bucketlist.name, 'Life Goals')
        self.assertEqual(bucketlist.id, 1)
