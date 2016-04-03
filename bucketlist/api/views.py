from api.models import BucketList, BucketListItem
from api.serializers import BucketlistSerializer, BucketlistItemSerializer
from rest_framework import generics
from rest_framework import permissions


# Create your views here.
class BucketListView(generics.ListCreateAPIView):
    # get, post '/bucketlists/'
    queryset = BucketList.objects.all()
    serializer_class = BucketlistSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        # set owner of bucketlist to be current logged in user
        # when creating
        serializer.save(user=self.request.user)


class BucketListDetailView(generics.RetrieveUpdateDestroyAPIView):
    # get, put, delete '/bucketlists/<pk>'
    queryset = BucketList.objects.all()
    serializer_class = BucketlistSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class BucketlistItemCreateView(generics.CreateAPIView):
    # post '/bucketlists/<pk>/items/'
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = BucketListItem.objects.all()
    serializer_class = BucketlistItemSerializer

    def perform_create(self, serializer):
        primary_key = self.kwargs.get('pk')
        associated_bucket = BucketList(pk=primary_key)
        serializer.save(bucketlist=associated_bucket)


class BucketlistItemActionView(generics.UpdateAPIView, generics.DestroyAPIView):
    # put, delete '/bucketlists/<pk>/items/<pk_item>'
    pass
