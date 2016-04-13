from django.conf.urls import url
from frontend import views

urlpatterns = [
    url(r'^$', views.HomePageView.as_view()),
    url(r'^account/$', views.AccountView.as_view()),
    url(r'^item/$', views.ItemView.as_view()),
]
