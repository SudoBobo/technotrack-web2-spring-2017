from __future__ import unicode_literals

from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.db import models

from core.models import ModelWithDates, ModelWithAuthor


class Feedable(models.Model):
    def get_title_for_event(self, eventtype):
        raise NotImplementedError

    class Meta:
        abstract = True


class Like(ModelWithDates, ModelWithAuthor):
    # an int - id of content type in 'content-types' table
    content_type_id = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()

    # go to db and say: "give me obj with 'object_id' that have content type with 'content_type_id'
    object = GenericForeignKey('content_type_id', 'object_id')


class Likeable(models.Model):
    class Meta:
        abstract = True

    likes = GenericRelation(Like, object_id_field='object_id', content_type_field='content_type')
    likes_count = models.IntegerField(default=0)


class Post(ModelWithAuthor, ModelWithDates, Likeable, Feedable):
    def get_title_for_event(self, eventtype):
        return u'Post with title {} was created'.format(self.title)

    title = models.TextField(max_length=1024)
    comments_count = models.IntegerField(default=0)


class Comment(ModelWithAuthor, ModelWithDates, Likeable):
    # lol what how does it work?
    # do django crete objects with fields below?

    # should not work
    # nessesary to add method 'get_title_for_event'
    text = models.TextField()
    text_was = None
    post = models.ForeignKey(Post)
    edited = models.IntegerField(default=0)


class Feed(models.Model):
