from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import AbstractUser


class ModelWithDates(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class ModelWithAuthor(models.Model):
    author = models.ForeignKey(User)

    class Meta:
        abstract = True


class Post(ModelWithAuthor, ModelWithDates):
    title = models.TextField(max_length=1024)
    comments_count = models.IntegerField(default=0)


class Comment(ModelWithAuthor, ModelWithDates):
    text = models.TextField()
    post = models.ForeignKey(Post)
    edited = models.IntegerField(default=0)


class User(AbstractUser):
    pass
