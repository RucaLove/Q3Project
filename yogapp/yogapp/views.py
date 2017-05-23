# from django.http import HttpResponse
# from django.core import serializers
# from yoga.models import Users
#
# def guy(request):
#     data = Users.objects.only('profile_picture_img')
#     # return HttpResponse(data)
#     return HttpResponse(serializers.serialize('json', data), content_type='application/json')

from django.db import connection, transaction
from django.http import HttpResponse, JsonResponse

@transaction.atomic
def guy(request):
    cursor = connection.cursor()
    cursor.execute("SELECT profile_picture_img FROM yoga_users WHERE id = 6")
    result = cursor.fetchone()
    return HttpResponse(result)

@transaction.atomic
def get_all_posts(request):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM yoga_posts")
    result = cursor.fetchall() # all results
    return JsonResponse(result, safe=False)
    # result = cursor.fetchmany(10) # limiting search to 10 results

def get_post_by_id(request, id):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM yoga_posts Where id = id")
    result = cursor.fetchall() # all results
    return JsonResponse(result, safe=False)
