from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from api import views

urlpatterns = [
    url(r'^bucketlists/$', views.BucketListView.as_view()),
    url(r'^bucketlists/(?P<pk>[0-9]+)$', views.BucketListDetailView.as_view()),
    url(r'^bucketlists/(?P<pk>[0-9]+)/items/$',
        views.BucketlistItemCreateView.as_view()),
    url(r'^bucketlists/(?P<pk_bucketlist>[0-9]+)/items/(?P<pk>[0-9]+)$',
        views.BucketlistItemActionView.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
