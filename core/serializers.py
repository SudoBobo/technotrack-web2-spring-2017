from rest_framework import serializers

from core.models import User


class UserSerializer(serializers.HyperlinkedModelSerializer):

    # todo add read-only fields
    class Meta:
        model = User
        fields = ('username', 'email', 'content_objects_counter', 'is_staff')


class UserBasicSerializer(serializers.HyperlinkedModelSerializer):
    pass

class UserDetaliedSerializer(serializers.HyperlinkedModelSerializer):
    pass

