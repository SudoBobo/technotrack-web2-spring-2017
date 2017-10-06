from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.models import ContentType



class Feed(models.Model):
    pass

class User(AbstractUser):

    feed = models.OneToOneField(
        Feed,
        on_delete=models.CASCADE,
        primary_key=True,
    )

    content_objects_counter = models.IntegerField(default=0)
    subscribers = models.ManyToManyField('User')

class ModelWithDates(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class ModelWithAuthor(models.Model):
    author = models.ForeignKey(User)

    class Meta:
        abstract = True