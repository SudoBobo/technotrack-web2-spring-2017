from rest_framework import viewsets, permissions as rest_framework_permissions

from twitter import permissions as twitter_permissions
from twitter.models import Post
from twitter.serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):

    serializer_class = PostSerializer
    # todo ?
    queryset = Post.objects.all()
    permission_classes = (twitter_permissions.IsOwnerOrReadOnly, rest_framework_permissions.IsAuthenticated)

    def get_queryset(self):
        # why 'super' instead of 'ModelViewSet'
        qs = super(PostViewSet, self).get_queryset()
        if self.request.query_params.get('username'):
            qs = qs.filter(
                author__username=self.request.query_params.get('username'))
        return qs



    def perform_create(self, serializer):
        serializer.save(author=self.request.user)