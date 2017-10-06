from django.shortcuts import render, HttpResponse

# Create your views here.
# def getlikes(request):
#     return HttpResponce(json)

# ViewSets define the view behavior.
from rest_framework import viewsets


from core.models import User
from core.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    # defines what user-objects will we send
    queryset = User.objects.all()
    serializer_class = UserSerializer