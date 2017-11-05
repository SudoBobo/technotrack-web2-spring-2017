from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.contenttypes.admin import GenericStackedInline

from twitter.admin import CommentsInLine, LikesInLine, PostsInLine
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    pass