from __future__ import unicode_literals

from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.db import models

from core.models import ModelWithDates, ModelWithAuthor, User, Feedable


class Like(ModelWithDates, ModelWithAuthor):
    content_type_id = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()

    object = GenericForeignKey('content_type_id', 'object_id')


class Likeable(models.Model):
    class Meta:
        abstract = True

    likes = GenericRelation(Like, object_id_field='object_id', content_type_field='content_type_id')
    likes_count = models.IntegerField(default=0)


class Comment(ModelWithAuthor, ModelWithDates, Likeable, Feedable):
    def get_text_for_event(self):
        return u'Comment on post \'{}\' was created by {}'.format(self.object, self.author)

    text = models.TextField()
    text_was = None
    edited = models.BooleanField(default=False)

    content_type_id = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()

    object = GenericForeignKey('content_type_id', 'object_id')


class Commentable(models.Model):
    class Meta:
        abstract = True

    comments = GenericRelation(Comment, object_id_field='object_id', content_type_field='content_type_id')
    comments_count = models.IntegerField(default=0)


class Post(ModelWithAuthor, ModelWithDates, Likeable, Feedable, Commentable):
    def get_text_for_event(self):
        return u'Post with title {} was created by {}'.format(self.title, self.author)

    title = models.TextField(max_length=1024)
    text = models.TextField(max_length=2028)




