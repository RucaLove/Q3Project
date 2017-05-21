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
