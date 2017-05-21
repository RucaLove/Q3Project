from django.http import HttpResponse
from django.core import serializers
from yoga.models import Users
import psycopg2
conn = psycopg2.connect("dbname=yogapp user=haleykalb")
cur = conn.cursor()
# cur.execute("select profile_picture_img from yoga_users where id=1;")

def guy(request):
    # data = Users.objects.order_by('id').distinct('profile_picture_img')
    # select profile_picture_img from yoga_users
    # data = Users.objects.all()
    data = cur.execute("select profile_picture_img from yoga_users where id=1;")
    # return HttpResponse(serializers.serialize('json', data), content_type='application/json')
    return HttpResponse(data)
