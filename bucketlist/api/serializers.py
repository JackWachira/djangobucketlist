from rest_framework import serializers
from .models import BucketList, BucketListItem


class BucketlistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BucketListItem
        fields = ('id', 'name', 'date_created', 'date_updated',
                  'done', 'bucketlist')


class BucketlistSerializer(serializers.ModelSerializer):
    items = BucketlistItemSerializer(many=True, read_only=True)

    class Meta:
        model = BucketList

        fields = ('id', 'name', 'date_created', 'date_updated',
                  'user', 'items')
