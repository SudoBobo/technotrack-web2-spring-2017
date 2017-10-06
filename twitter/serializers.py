from rest_framework import serializers

from twitter.models import Post


class PostSerializer(serializers.ModelSerializer):

    author = serializers.ReadOnlyField(source='author.id')

    class Meta:
        model = Post
        fields = ('id', 'created', 'updated', 'likes_count',
                  'title', 'text', 'comments_count')