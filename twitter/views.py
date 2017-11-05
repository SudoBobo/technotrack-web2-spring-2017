# coding=utf-8
from rest_framework import viewsets, permissions as rest_framework_permissions

from twitter import permissions as twitter_permissions
from twitter.models import Post
from twitter.serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):

    serializer_class = PostSerializer
    permission_classes = (twitter_permissions.IsOwnerOrReadOnly, rest_framework_permissions.IsAuthenticated)
    queryset = Post.objects.all()

    def get_queryset(self):
        qs = super(PostViewSet, self).get_queryset()
        if self.request.query_params.get('username'):

            # Если в запросе указан username, то отдаём посты только этого автора
            qs = qs.filter(
                author__username=self.request.query_params.get('username'))
        return qs



    def perform_create(self, serializer):
        serializer.save(author=self.request.user)