from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.models import ContentType


class User(AbstractUser):
    content_objects_counter = models.IntegerField(default=0)
    subscribers = models.ManyToManyField('User', )


class ModelWithDates(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class ModelWithAuthor(models.Model):
    author = models.ForeignKey(User, related_name='%(class)s_user_author')

    class Meta:
        abstract = True
