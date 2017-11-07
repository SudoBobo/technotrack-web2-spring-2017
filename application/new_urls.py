from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings


# Serializers define the API representation.
from rest_framework import serializers, viewsets, routers
from rest_framework.routers import DefaultRouter

from core.models import User
from core import views as core_views
from core.views import UserViewSet, ProfileDetail

from twitter import views as twitter_views

from rest_framework.authtoken import views


router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'posts', PostViewSet)
router.register(r'profile', ProfileDetail.as_view())


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api-token-auth/', views.obtain_auth_token),
    url(r'^api1/', include(router.urls)),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ]