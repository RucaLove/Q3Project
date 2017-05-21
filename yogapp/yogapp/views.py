# from django.http import HttpResponse
# from django.core import serializers
# from yoga.models import Users
#
# def guy(request):
#     data = Users.objects.only('profile_picture_img')
#     # return HttpResponse(data)
#     return HttpResponse(serializers.serialize('json', data), content_type='application/json')

from django.db import connection, transaction
from django.http import HttpResponse

@transaction.atomic
def guy(request):
    cursor = connection.cursor()
    cursor.execute("SELECT profile_picture_img FROM yoga_users WHERE id = 1")
    result = cursor.fetchone()
    return HttpResponse(result)
