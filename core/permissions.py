from rest_framework import permissions


class IsOwnerOrNothing(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.author == request.user or request.user.is_staff


class IsOwnerOrOwnerFriend(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.author == request.user:
            return True
        if request.user in obj.author.user_subscriptions:
            return True

        return False
