# coding=utf-8
from rest_framework import viewsets, permissions as rest_framework_permissions
from rest_framework.decorators import detail_route

from twitter import permissions as twitter_permissions
from twitter.models import Post
from twitter.serializers import PostSerializer, LikeSerializer, CommentSerializer
from rest_framework.response import Response


class PostViewSet(viewsets.ModelViewSet):

    serializer_class = PostSerializer
    permission_classes = (twitter_permissions.IsOwnerOrReadOnly, rest_framework_permissions.IsAuthenticated)
    queryset = Post.objects.all()

    # # todo discuss
    # # /users/<user_pk>/posts/ instead of this
    # # is it effective?
    # def get_queryset(self):
    #     qs = super(PostViewSet, self).get_queryset()
    #     if self.request.query_params.get('id'):
    #
    #         # Если в запросе указан username, то отдаём посты только этого автора
    #         qs = qs.filter(
    #             author__id=self.request.query_params.get('id'))
    #     return qs

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @detail_route(methods=['get'])
    def likes(self, request, pk=None):
        '''
        List of liked users
        '''

        serializer = LikeSerializer(Post.objects.get(pk=pk).likes, many=True)
        return Response(serializer.data)

    @detail_route(methods=['get'])
    def comments(self, request, pk=None):
        serializer = CommentSerializer(Post.objects.get(pk=pk).comments, many=True)
        return Response(serializer.data)