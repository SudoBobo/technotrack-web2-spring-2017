# coding=utf-8
# from django.db.models.signals import post_save, post_init, pre_save
# from t.models import Comment, ModelWithAuthor, Likeable, Like


# work like db triggers

# for example can do something when text changed in some particular comment
# def comment_init(instance, *args, **kwargs):
#     instance.text_was = instance.text
#
#
# def comment_presave(instance, created=False, *args, **kwargs):
#     if not created and instance.text_was != instance.text_was:
#         # update text_was value for further use
#         instance.text_was = instance.text
#         instance.edited += 1

#
# def comment_postsave(instance, created=False, *args, **kwargs):
#     if created:
#         print '{} saved'.format(instance.author, instance)
#         instance.post.comment_count += 1
#         instance.post.save()
#     else:
#         print'{} updated {}'.format(instance.author, instance)
#
#
# def like_postsave(instance, created=False, *args, **kwargs):
#     if created:
#         # TODO probably wrong?
#         instance.object.likes_count += 1
#
#
# def model_with_author_post_save(instance, created=False, *args, **kwargs):
#     if created:
#         instance.author.objects_count += 1
#         instance.author.save()


# every model when created raise many signals: pre/post init/save
# downhere we do the following:
# if sender of 'post_save' signal is Comment model then you should call receiver function

# pre_save.connect(receiver=comment_presave, sender=Comment)
# post_save.connect(receiver=comment_postsave, sender=Comment)
# post_init.connect(receiver=comment_init, sender=Comment)

# for model in ModelWithAuthor.__subclasses__():
#     post_save.connect(receiver=model_with_author_post_save, sender=model)


# should remember what i wanted to do
# for model in Likeable.__subclasses__():
#     post_save.connect()



# мы хотим, чтобы на каждое сохранение лайка
# была проверка, создаётся он или обновляется
# и если создаётся, то мы находим его "жертву" и увеличиваем счётчик люисов
