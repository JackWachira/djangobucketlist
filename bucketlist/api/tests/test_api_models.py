from api.models import BucketList, BucketListItem
from django.contrib.auth.models import User
from django.test import TestCase

user = User.objects.create(username="xyzj", password="12345")
bucketlist = BucketList.objects.create(name="Life Goals", user=user)
item = BucketListItem.objects.create(name="Climb Mt. Everest",
                                     bucketlist=bucketlist)


class BucketListTestCase(TestCase):
    def test_bucketlist_model(self):
        self.assertEqual(bucketlist.name, 'Life Goals')
        self.asserEqual(bucketlist.id, 1)

    def test_bucketlist_item_model(self):
        self.assertEqual(item.name, "Climb Mt. Everest")
        self.assertEqual(item.id, 1)
        self.assertEqual(item.bucketlist, bucketlist)
        self.assertEqual(BucketListItem.objects.count(), 1)
