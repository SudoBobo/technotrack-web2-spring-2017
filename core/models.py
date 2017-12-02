from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.models import ContentType


class Feedable(models.Model):
    # class Meta:
    #     abstract = True


    def get_text_for_event(self):
        raise NotImplementedError

class User(AbstractUser):
    content_objects_counter = models.IntegerField(default=0)
    subscribers = models.ManyToManyField('User', related_name='subscriptions')
    feed_objects = models.ManyToManyField('Feedable')

    def add_subscriber(self, subscriber):
        self.subscribers.add(subscriber)

        for post in self.authored_post.all():
            subscriber.feed_objects.add(post)

        for comment in self.authored_comment.all():
            subscriber.feed_objects.add(comment)

        subscriber.save()

    def remove_subscriber(self, subscriber):
        self.subscribers.remove(subscriber)

        for feed_object in subscriber.feed_objects.all():
            if feed_object.author == self:
                subscriber.feed_objects.remove(feed_object)

        self.save()



class ModelWithDates(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class ModelWithAuthor(models.Model):
    author = models.ForeignKey(User, related_name='authored_%(class)s')
    class Meta:
        abstract = True
