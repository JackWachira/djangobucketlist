from api.models import BucketList, BucketListItem
from api.serializers import (BucketlistSerializer, BucketlistItemSerializer,
                             UserSerializer)
from rest_framework import generics
from rest_framework import permissions
from django.shortcuts import get_object_or_404
from api.permissions import IsOwner
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class SignUpAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

    def perform_create(self, serializer):
        username = self.request.data['username']
        email = self.request.data['email']
        password = self.request.data['password']

        user = User.objects.create_user(username=username, email=email, password=password)
        token = Token.objects.create(user=user)


class BucketListView(generics.ListCreateAPIView):
    # get, post '/bucketlists/'
    serializer_class = BucketlistSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwner)

    def get_queryset(self):
        # queryset should only have bucketlists of logged in user
        q = self.request.query_params.get('q', None)

        if q is None:
            logged_in_user = self.request.user
            return BucketList.objects.all().filter(user=logged_in_user)
        else:
            logged_in_user = self.request.user
            bucketlists = BucketList.objects.all().filter(user=logged_in_user)

            search_results = []

            for bucket in bucketlists:
                if q.lower() in bucket.name.lower():
                    search_results.append(bucket)

            return search_results

    def perform_create(self, serializer):
        # set owner of bucketlist to be current logged in user
        # when creating
        logged_in_user = self.request.user
        serializer.save(user=logged_in_user)


class BucketListDetailView(generics.RetrieveUpdateDestroyAPIView):
    # get, put, delete '/bucketlists/<pk>'
    queryset = BucketList.objects.all()
    serializer_class = BucketlistSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwner)

    def get_queryset(self):
        try:
            logged_in_user = self.request.user
            pk_of_bucket = self.kwargs.get('pk')

            bucketlist = BucketList.objects.filter(user=logged_in_user,
                                                   pk=pk_of_bucket)
            return bucketlist
        except BucketList.DoesNotExist:
            raise Http404("Not found")


class BucketlistItemCreateView(generics.CreateAPIView):
    # post '/bucketlists/<pk>/items/'
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwner)
    queryset = BucketListItem.objects.all()
    serializer_class = BucketlistItemSerializer

    def perform_create(self, serializer):
        primary_key = self.kwargs.get('pk')
        associated_bucket = BucketList(pk=primary_key)
        serializer.save(bucketlist=associated_bucket)


class BucketlistItemActionView(generics.UpdateAPIView,
                               generics.DestroyAPIView):
    # put, delete '/bucketlists/<pk>/items/<pk_item>'
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = BucketlistItemSerializer
    queryset = BucketListItem.objects.all()
