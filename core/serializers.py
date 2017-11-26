from rest_framework import serializers

from core.models import User


# class UserSerializer(serializers.HyperlinkedModelSerializer):
#
#     # todo add read-only fields
#     class Meta:
#         model = User
#         fields = ('username', 'email', 'content_objects_counter', 'is_staff')
#         read_only_fields = ('account_name',)



class UserBasicSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username', )
        read_only_fields = ('username',)


class UserDetaliedSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'content_objects_counter', 'is_staff')
        read_only_fields = ('username', 'email', 'content_objects_counter', 'is_staff')

