import inspect

from django.shortcuts import render, HttpResponse

# Create your views here.
# def getlikes(request):
#     return HttpResponce(json)

# ViewSets define the view behavior.
from rest_framework import viewsets, mixins, generics, permissions
from rest_framework.decorators import api_view, detail_route
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView

from core.models import User
from core.permissions import IsOwnerOrNothing, IsUserOrUserFriend
from core.serializers import UserSerializer, UserBasicSerializer, UserDetaliedSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    permissions = [IsAuthenticated,]

    def get_serializer_class(self):

        if self.action == 'list':
            return UserBasicSerializer

        if self.action == 'retrieve':
            return UserDetaliedSerializer

    @detail_route(methods=['get'], permissions=[IsUserOrUserFriend ])
    def subscribed_on(self, request, pk=None):
        """
        List of 'pk' user's subscriptions on other users
        """
        return Response({'status': '{}'.format(inspect.stack()[0][3])})

    @detail_route(methods=['get'], permissions=[IsUserOrUserFriend, IsAuthenticated, ])
    def subscribers(self, request, pk=None):
        """
        List of 'pk' user's subscribers
        """
        user = self.get_object()
        subscribers = user.subscribers
        serializer = UserBasicSerializer(subscribers, many=True)

        return Response(serializer.data)

    @detail_route(methods=['post', 'delete'], permissions=[IsAuthenticated])
    def subscribe(self, request, pk=None):
        """
        (Un)Subscribe user (in request.user or in token) to user with 'pk'
        """
        return Response({'status': '{}'.format(inspect.stack()[0][3])})


    @detail_route(methods=['get'], permissions=[IsUserOrUserFriend, IsAuthenticated, ])
    def posts(self, request, pk=None):
        """
        List of all user's posts
        """
        return Response({'status': '{}'.format(inspect.stack()[0][3])})



        # user = self.get_object()
        # serializer = UserSerializer(data=request.data)
        # if serializer.is_valid():
        #     user.set_password(serializer.data['password'])
        #     user.save()
        #     return Response({'status': 'password set'})
        # else:
        #     return Response(serializer.errors,
        #                     status=status.HTTP_400_BAD_REQUEST)


# class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Profile.objects.all()
#     serializer_class = ProfileSerializer
#     permission_classes = (permissions.IsAuthenticated, IsOwnerOrNothing)



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
