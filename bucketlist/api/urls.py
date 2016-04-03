from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from api import views

urlpatterns = [
    url(r'^bucketlists/$', views.BucketListView.as_view()),
    url(r'^bucketlists/(?P<pk>[0-9]+)$', views.BucketListDetailView.as_view()),
    # url(r'^bucketlists/(?P<pk>[0-9]+)/items/$',
    #     views.BucketlistItemCreateView)
    # url(r'^bucketlists/(?P<pk>[0-9]+)/items/(?P<pk_item>[0-9]+)/$',
    #     views.BucketlistItemActionView.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
