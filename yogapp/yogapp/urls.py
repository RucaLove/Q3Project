"""yogapp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
# Match url in browser to module in django project
from django.conf.urls import url
# load urls for administration site
from django.contrib import admin
# load in functions created in my custom views file
from yogapp.views import guy, get_all_posts, get_post_by_id
from django.views.generic import TemplateView
# # REST framework API
# from django.contrib.auth.models import User
# from rest_framework import routers, serializers, viewsets

# # Serializers define the API representation.
# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = User
#         fields = ('url', 'username', 'email', 'is_staff')
#
# # ViewSets define the view behavior.
# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#
# # Routers provide an easy way of automatically determining the URL conf.
# router = routers.DefaultRouter()
# router.register(r'users', UserViewSet)

# The following lists all urls that we want to tie to specific functions
# The r'^admin/' is a regex
# The r means we want to treat it as a raw string that will allow us to use backslashes
# The ^ tells us thats the beginning of the string
# The admin part references the administration part of Django
# The $ means end of string
# d means digit or number
# (\d+)/ is allowing us to pass a number in to the url params
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', guy ), # Splash page
    url(r'^posts$', get_all_posts), # get all posts (feed)
    url(r'^posts/<id>/$', get_post_by_id), # get individual post (from feed or profile)
    # url(r'^users/(\d+)/$', get_user_by_id), # get individual user profile (needs AUTH)
    # url(r'^poses$', get_all_poses), # get all poses
    # url(r'^poses')
    # url(r'^contributors$', get_contributors) # render contributors page
    # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
