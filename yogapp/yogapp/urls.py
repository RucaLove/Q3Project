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
from yogapp.views import guy

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
    url(r'^$', guy),
]
