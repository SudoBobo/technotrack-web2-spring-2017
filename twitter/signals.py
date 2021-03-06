from django.db.models.signals import post_save, post_init, pre_save
from django.dispatch import receiver

from core.models import ModelWithAuthor
from twitter.models import Like, Comment


@receiver(post_save, sender=Like)
# tested
def like_postsave(instance, created=False, *args, **kwargs):
    if created:
        instance.object.likes_count += 1
        print 'Like postsave'
        instance.object.save()


@receiver(post_save, sender=Comment)
# tested
def comment_postsave(instance, created=False, *args, **kwargs):
    if created:
        instance.object.comments_count += 1
        instance.object.save()


# for example we can do something when text changed in some particular comment
@receiver(post_init, sender=Comment)
def comment_init(instance, *args, **kwargs):
    instance.text_was = instance.text

# todo discuss with the teacher
@receiver(pre_save, sender=Comment)
def comment_presave(instance, created=False, *args, **kwargs):
    if not created and instance.text_was != instance.text:
        # update text_was value for further use
        instance.text_was = instance.text
        instance.edited = True

#
@receiver(post_save, sender=Comment)
def comment_postsave(instance, created=False, *args, **kwargs):
    if created:
        instance.object.comments_count += 1
        instance.object.save()



# meta-receivers

def model_with_author_post_save(instance, created=False, *args, **kwargs):
    if created:
        instance.author.content_objects_counter += 1
        instance.author.save()

for model in ModelWithAuthor.__subclasses__():
    post_save.connect(receiver=model_with_author_post_save, sender=model)


def feedable_model_post_save(instance, created=False, *args, **kwargs):
    if created:
        for subscriber in instance.author.subscribers:
            subscriber.feed_objects.add(instance)
            subscriber.save()
