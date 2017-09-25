from __future__ import unicode_literals

from django.apps import AppConfig

# config for separate app

class CoreConfig(AppConfig):
    name = 'core'

    # code to be run when all the models are ready
    # init all applications -> init all models -> run 'ready' in all applications' apps.py, one by one
    # TODO order? problems?
    def ready(self):
        # import signal to provide model consistency
        import signals