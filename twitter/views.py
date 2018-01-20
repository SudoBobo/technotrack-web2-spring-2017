# coding=utf-8
from rest_framework import viewsets, permissions as rest_framework_permissions
from rest_framework.decorators import detail_route, api_view, permission_classes

from twitter import permissions as twitter_permissions
from twitter.models import Post, Comment
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


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = (twitter_permissions.IsOwnerOrReadOnly, rest_framework_permissions.IsAuthenticated)
    queryset = Comment.objects.all()

    @detail_route(methods=['get'])
    def likes(self, request, pk=None):
        """
        List of liked users
        """

        serializer = LikeSerializer(Comment.objects.get(pk=pk).likes, many=True)
        return Response(serializer.data)


@api_view(['GET', ])
@permission_classes([rest_framework_permissions.IsAuthenticated])
def feed(request):
    offset = request.query_params.get('offset')
    limit = request.query_params.get('limit')

    offset = offset if offset is not None else 0
    limit = limit if limit is not None else 10

    user = request.user

    feed_objects = user.feed_objects.all()[offset:offset + limit]
    data = []

    for obj in feed_objects:

        if hasattr(obj, 'post'):
            obj = obj.post
            data.append({"pk": obj.pk, "type": obj.__class__.__name__,
                         "text": obj.text, "likes_count": obj.likes_count,
                         "author": obj.author.username, "author_id": obj.author.id, "title": obj.title,
                         "comments":[comment.id for comment in obj.comments.all()]})


        elif hasattr(obj, 'comment'):
            obj = obj.comment
            data.append({"pk": obj.pk, "type": obj.__class__.__name__,
                         "text": obj.text, "likes_count": obj.likes_count,
                         "author": obj.author.username, "author_id": obj.author.id,
                         "object_id": obj.object.id})

    return Response(data)
