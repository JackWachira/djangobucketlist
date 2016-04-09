from django.shortcuts import render
from django.views.generic import View


# Create your views here.
class HomePageView(View):
    def get(self, request, **kwargs):
        return render(request, 'index.html', context=None)
