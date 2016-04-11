from api.models import BucketList, BucketListItem
from django.contrib.auth.models import User
from django.test import TestCase


class UserModelTestCase(TestCase):
    def setUp(self):
        user = User.objects.create(username="xyzjv", password="12345")
        self.assertEqual(str(user), 'xyzjv')


class BucketListModelTestCase(TestCase):
    def setUp(self):
        user = User.objects.create(username="xyzjv", password="12345")
        bucketlist = BucketList.objects.create(name="Life Goals", user=user)
        item = BucketListItem.objects.create(name="Climb Mt. Everest",
                                             bucketlist=bucketlist)

    def test_bucketlist_model(self):
        user = User.objects.get(username="xyzjv")
        bucketlist = BucketList.objects.get(id=1)
        self.assertEqual(str(bucketlist), 'Life Goals')
        self.assertEqual(bucketlist.id, 1)
        self.assertEqual(bucketlist.user, user)
        self.assertEqual(BucketList.objects.count(), 1)


class BucketListItemModelTestCase(TestCase):
    def setUp(self):
        user = User.objects.create(username="xyzjv", password="12345")
        bucketlist = BucketList.objects.create(name="Life Goals", user=user)
        item = BucketListItem.objects.create(name="Climb Mt. Everest",
                                             bucketlist=bucketlist)

    def test_bucketlist_item_model(self):
        bucketlist = BucketList.objects.get(id=1)
        item = BucketListItem.objects.get(id=1)
        self.assertEqual(str(item), "Climb Mt. Everest")
        self.assertEqual(item.id, 1)
        self.assertEqual(item.bucketlist, bucketlist)
        self.assertEqual(BucketListItem.objects.count(), 1)
