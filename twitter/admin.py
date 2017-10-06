from django.contrib import admin
from django.contrib.admin import ModelAdmin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.contenttypes.admin import GenericStackedInline
from twitter.models import Like, Post, Comment


class LikesInLine(GenericStackedInline):
    model = Like
    ct_field = 'content_type_id'
    ct_fk_field = 'object_id'


class CommentsInLine(GenericStackedInline):
    model = Comment
    ct_field = 'content_type_id'
    ct_fk_field = 'object_id'


class PostsInLine(GenericStackedInline):
    model = Post
    ct_field = 'content_type_id'
    ct_fk_field = 'object_id'


@admin.register(Post)
class PostAdmin(ModelAdmin):
    inlines = [
        LikesInLine, CommentsInLine,
    ]


@admin.register(Comment)
class CommentAdmin(ModelAdmin):
    inlines = [
        LikesInLine
    ]


