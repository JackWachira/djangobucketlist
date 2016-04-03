from __future__ import unicode_literals
from datetime import datetime

from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class BucketList(models.Model):
    name = models.CharField(blank=False, unique=True, max_length=255,
                            default="bucket")
    date_created = models.DateField(default=datetime.now, editable=False)
    date_updated = models.DateField(default=datetime.now)
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             default=1)  # like created_by

    def __unicode__(self):
        return u'%s' % self.name


class BucketListItem(models.Model):
    name = models.CharField(blank=False, unique=True, max_length=255,
                            default="item")
    date_created = models.DateField(default=datetime.now, editable=False)
    date_updated = models.DateField(default=datetime.now)
    done = models.BooleanField(default=False)
    bucketlist = models.ForeignKey(BucketList, on_delete=models.CASCADE,
                                   related_name="items", default=1)

    def __unicode__(self):
        return u'%s' % self.name
