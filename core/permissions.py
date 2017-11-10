from rest_framework import permissions
from core.models import User


class IsOwnerOrNothing(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.author == request.user or request.user.is_staff


class IsUserOrUserFriend(permissions.BasePermission):
    """
    To use with user/<pk>/smth
    'obj' is <pk> user
    """
    def has_object_permission(self, request, view, obj):

        assert isinstance(obj, User)
        user = obj

        if user == request.user:
            return True

        if request.user in user.user_subscriptions and user in request.user.user_subscriptions:
            return True

        return False

    # def has_object_permission(self, request, view, obj):
    #     return True
