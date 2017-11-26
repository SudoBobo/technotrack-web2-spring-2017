from rest_framework import serializers

from twitter.models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'author', 'created', 'updated', 'likes_count',
                  'title', 'text', 'comments_count')
        read_only_fields = ('id', 'author', 'updated', 'likes_count','comments_count')
