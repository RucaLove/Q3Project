from django.http import HttpResponse
from django.core import serializers
from yoga.models import Users

def guy(request):
    # yogappdb.Users.objects.raw("select profile_picture_img from yoga_users")
    data = Users.objects.all()
    return HttpResponse(serializers.serialize('json', data), content_type='application/json')
