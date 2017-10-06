from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

from core.models import User, Feed
from twitter.models import Like, Comment


@receiver(pre_save, sender=User)
def user_presave(instance, created=False, *args, **kwargs):
    if created:
        # instance.object.feed = Feed.objects.create()
        instance.object.feed = Feed()
        instance.object.feed.save()



