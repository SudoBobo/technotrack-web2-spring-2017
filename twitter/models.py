from __future__ import unicode_literals

from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.db import models

from core.models import ModelWithDates, ModelWithAuthor, Feed



class Feedable(models.Model):
    class Meta:
        abstract = True

    def get_text_for_event(self, eventtype):
        raise NotImplementedError

    # store feeds in which we are
    # like in django docs example with articles(feedables) and publications(feeds)
    feeds = models.ManyToManyField(Feed)



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


class Comment(ModelWithAuthor, ModelWithDates, Likeable, Feedable):
    def get_text_for_event(self, eventtype):
        return u'Coment on post \'{}\' was created by {}'.format(self.object, self.author)

    text = models.TextField()
    text_was = None
    edited = models.IntegerField(default=0)

    content_type_id = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()

    object = GenericForeignKey('content_type_id', 'object_id')


class Commentable(models.Model):
    class Meta:
        abstract = True

    comments = GenericRelation(Comment, object_id_field='object_id', content_type_field='content_type')
    comments_count = models.IntegerField(default=0)


class Post(ModelWithAuthor, ModelWithDates, Likeable, Feedable, Commentable):
    def get_text_for_event(self, eventtype):
        return u'Post with title {} was created by {}'.format(self.title, self.author)

    title = models.TextField(max_length=1024)
    text = models.TextField(max_length=2028)

    comments_count = models.IntegerField(default=0)




