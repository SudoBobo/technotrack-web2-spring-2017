from __future__ import unicode_literals

from django.apps import AppConfig

# config for separate app

class TwitterConfig(AppConfig):
    name = 'twitter'

    # def ready(self):
    #     # import signal to provide model consistency
    #     import signals