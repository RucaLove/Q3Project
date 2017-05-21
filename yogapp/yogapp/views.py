from django.http import JsonResponse
from yoga.models import Users

def guy(request):
    # yogappdb.Users.objects.raw("select profile_picture_img from yoga_users")
    return JsonResponse(Users.objects.all(), safe=False)
