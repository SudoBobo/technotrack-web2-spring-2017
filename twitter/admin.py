from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.contenttypes.admin import GenericStackedInline
from twitter.models import Like, Post, Comment


class LikesInLine(GenericStackedInline):
    model = Like
    ct_field = 'content_type_id'
    ct_fk_field = 'object_id'


class LikeAbleAdmin(admin.ModelAdmin):
    inlines = LikesInLine


@admin.register(Post)
class PostAdmin(LikeAbleAdmin):
    pass


@admin.register(Comment)
class CommentAdmin(LikeAbleAdmin):
    pass
