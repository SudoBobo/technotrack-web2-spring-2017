from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

from core.models import User, Feed
from twitter.models import Like, Comment

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


@receiver(pre_save, sender=User)
def user_presave(instance, created=False, *args, **kwargs):
    if created:
        feed = Feed.objects.create()
        instance.feed = feed
        # instance.object.feed = Feed()
        # instance.object.feed.save()


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
