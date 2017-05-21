from django.http import HttpResponse
from django.core import serializers
from yoga.models import Users

def guy(request):
    data = Users.objects.only('profile_picture_img')
    # return HttpResponse(data)
    return HttpResponse(serializers.serialize('json', data), content_type='application/json')
