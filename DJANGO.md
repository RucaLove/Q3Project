## Django Notes

##### create a Django project/app:
```sh
django-admin startproject yogaforya
```
##### Run Django server:
```sh
python manage.py runserver
```
##### Create polls app
```sh
python manage.py startapp polls
```

#### To add functionality to url endpoints:
Create file: **views.py**
Then import `HttpResponse`
```py
from django.http import HttpResponse
# math.random essentially (generates a random number)
import random

# example function
def hello_world(request):
    return HttpResponse("HEY YOGA")
# the root ('/') url path defined here
def root_page(request):
    return HttpResponse("Your in the root page d00d")
# Function to generate random number
def random_number(request, max_rand=100):
    random_num = random.randrange(0, int(max_rand))

    # s = string
    # d = digi t= number
    #msg = text to be displayed on screen when url is entered (e.g. http://localhost:8000/random/10/)

    msg = "random number between 0 and %s : %d" % (max_rand, random_num)
    return HttpResponse(msg)
```

#### To link previously defined function to url endpoint:
File: **urls.py**
```py
# Match url in browser to module in django project
from django.conf.urls import url
# load urls for administration site
from django.contrib import admin
# load in functions created in my custom views file
from yogaforya.views import hello_world, root_page, random_number

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
    url(r'^helloworld/$', hello_world),
    url(r'^$', root_page),
    url(r'^random/(\d+)/$', random_number),
]
```



##### Serving static files in Django: (JavaScript, CSS, Images)
File: **settings.py**
```py
#SETTING UP PATH FOR STATIC FILES
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
```
