from rest_framework import permissions


class IsOwnerOrNothing(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.author == request.user or request.user.is_staff


class IsUserOrUserFriend(permissions.BasePermission):
    """
    To use with user/<pk>/smth
    'obj' is <pk> user
    """
    # def has_object_permission(self, request, view, obj):
    #     user = obj
    #
    #     if user == request.user:
    #         return True
    #
    #     # We assume that users A and B are friends if they both
    #     # subscribed on each other
    #     if request.user in user.user_subscriptions and user in request.user.user_subscriptions:
    #         return True
    #
    #     return False

    def has_object_permission(self, request, view, obj):
        return True