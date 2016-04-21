from django.shortcuts import render
from django.views.generic import TemplateView


# Create your views here.
class HomePageView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'index.html', context=None)


class AccountView(TemplateView):
    def get(self, request, **kwargs):
        context = {
            "user": request.user,
        }
        return render(request, 'account.html', context=context)


class ItemView(TemplateView):
    def get(self, request, **kwargs):
        context = {
            "user": request.user,
        }
        return render(request, 'item_view.html', context=context)
