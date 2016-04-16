from rest_framework import serializers
from .models import BucketList, BucketListItem
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

        fields = ('id', 'username', 'first_name', 'last_name',
                  'email')

        write_only_fields = ('id')


class BucketlistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BucketListItem

        fields = ('id', 'name', 'date_created', 'date_updated',
                  'done', 'bucketlist')

        read_only_fields = ('bucketlist',)


class BucketlistSerializer(serializers.ModelSerializer):
    items = BucketlistItemSerializer(many=True, read_only=True)

    class Meta:
        model = BucketList

        fields = ('id', 'name', 'date_created', 'date_updated',
                  'user', 'items')

        read_only_fields = ('user',)
