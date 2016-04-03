from rest_framework import serializers
from .models import BucketList, BucketListItem


class BucketlistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BucketListItem
        fields = ('id', 'name', 'date_created', 'date_updated',
                  'done', 'bucketlist')


class BucketlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = BucketList
        items = BucketlistItemSerializer(many=True)

        fields = ('id', 'name', 'date_created', 'date_updated',
                  'user', 'items')
