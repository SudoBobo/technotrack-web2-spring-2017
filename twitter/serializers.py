from rest_framework import serializers

from twitter.models import Post


class PostSerializer(serializers.ModelSerializer):

    author = serializers.ReadOnlyField(source='author.id')
    created = serializers.ReadOnlyField(source='created')
    updated = serializers.ReadOnlyField(source='updated')

    # todo is it makes sense?
    likes_count = serializers.ReadOnlyField(source='likes_count')
    comments_count = serializers.ReadOnlyField(source='comments_count')

    class Meta:
        model = Post
        fields = ('id', 'updated', 'likes_count',
                  'title', 'text', 'comments_count')