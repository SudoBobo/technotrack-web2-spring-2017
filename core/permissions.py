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

        if not isinstance(obj, User):
            return False

        user = obj

        if user == request.user:
            return True

        if request.user in user.subscriptions.all() and user in request.user.subscriptions.all():
            return True

        return False


class IsUser(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):

        if not isinstance(obj, User):
            return False

        user = obj
        return user == request.user