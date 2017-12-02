from rest_framework import serializers

from twitter.models import Post, Like, Comment


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'author', 'created', 'updated', 'likes_count',
                  'title', 'text', 'comments_count')
        read_only_fields = ('id', 'author', 'updated', 'likes_count','comments_count')


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('author',)
        read_only_fields = ('auhtor', )


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('author', 'edited', 'created', 'updated', 'likes_count', 'text')
        read_only_fields = ('author', 'edited', 'created', 'updated', 'likes_count',)
