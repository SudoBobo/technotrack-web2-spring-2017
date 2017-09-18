from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Post, Comment


@admin.register(User)
class UserAdmin(BaseUserAdmin):

    pass

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):

    pass

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    pass
