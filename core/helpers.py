# coding=utf-8
from django.conf import settings
from django.core.mail import EmailMultiAlternatives

from templated_email import InlineImage, get_templated_mail

import os.path
from application.settings import BASE_DIR


def send_mail(subject="fff", text="ttt",
              html="", to="k@k.com"):

    html = '<img src="%pic1%">'
    if settings.DEBUG:
        to = [admin[0] for admin in settings.ADMINS]

    email = EmailMultiAlternatives(subject, text, 'noreply@dodo.ru', to)

    pic_path = os.path.join(BASE_DIR, '1.jpg')
    pic = InlineImage('1.jpg', open(pic_path, 'rb').read())
    pic.attach_to_message(email)

    html = html.replace('%pic1%', str(pic))
    email.attach_alternative(html, 'text/html')

    email.send()