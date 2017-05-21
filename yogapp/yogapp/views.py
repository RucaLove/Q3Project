from django.http import HttpResponse
from django.core import serializers
from yoga.models import Users

def guy(request):
    data = Users.objects.all()
    return HttpResponse(serializers.serialize('json', data), content_type='application/json')
