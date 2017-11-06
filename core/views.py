from django.shortcuts import render, HttpResponse

# Create your views here.
# def getlikes(request):
#     return HttpResponce(json)

# ViewSets define the view behavior.
from rest_framework import viewsets, mixins, generics
from rest_framework.decorators import api_view, detail_route
from rest_framework.response import Response
from rest_framework.views import APIView

from core.models import User
from core.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


    @detail_route(methods=['post'])
    def subscribe(self, request, pk=None):
            return Response({'status': 'password set'})

        # user = self.get_object()
        # serializer = UserSerializer(data=request.data)
        # if serializer.is_valid():
        #     user.set_password(serializer.data['password'])
        #     user.save()
        #     return Response({'status': 'password set'})
        # else:
        #     return Response(serializer.errors,
        #                     status=status.HTTP_400_BAD_REQUEST)



# class UserDetail(mixins.RetrieveModelMixin,
#                     mixins.UpdateModelMixin,
#                     mixins.DestroyModelMixin,
#                     generics.GenericAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#
#     def get(self, request, *args, **kwargs):
#         return self.retrieve(request, *args, **kwargs)
#
#     def put(self, request, *args, **kwargs):
#         return self.update(request, *args, **kwargs)
#
#     def delete(self, request, *args, **kwargs):
#         return self.destroy(request, *args, **kwargs)
#
#     @detail_route(methods=['get'])
#     def subscribe(self, request, pk=None):
#         return self.retrieve(request)


# class UserViewSet(APIView):
#     # defines what user-objects will we send
#     # queryset = User.objects.all()
#     # serializer_class = UserSerializer
#
#     def get(self, request, format=None):
#         snippets = User.objects.all()
#         serializer = UserSerializer(snippets, many=True)
#         return Response(serializer.data)



# class SubscribeView(APIView):
#
#     def get(self, request, format=None):
#         users = User.objects.all()
#         serializer = UserSerializer(users, many=True)
#         return Response(serializer.data)


# @api_view(['POST, GET'])
# def subscribe(request, format=None):
#     """
#     List all code snippets, or create a new snippet.
#     """
#     if request.method == 'POST' or request.method == 'GET':
#         user = User.objects.all()[0]
#         serializer = UserSerializer(user)
#         return Response(serializer.data)


# class UserList(mixins.ListModelMixin,
#                   generics.GenericAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#
#     def get(self, request, *args, **kwargs):
#         return self.list(request, *args, **kwargs)
