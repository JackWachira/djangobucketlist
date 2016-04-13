from django.shortcuts import render
from django.views.generic import View


# Create your views here.
class HomePageView(View):
    def get(self, request, **kwargs):
        return render(request, 'index.html', context=None)


class AccountView(View):
    def get(self, request, **kwargs):
        context = {
            "user": request.user,
        }
        return render(request, 'account.html', context=context)


class ItemView(View):
    def get(self, request, **kwargs):
        context = {
            "user": request.user,
        }
        return render(request, 'item_view.html', context=context)
