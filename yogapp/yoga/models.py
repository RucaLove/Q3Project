from django.db import models

import datetime
from django.utils import timezone

class Users(models.Model):
    username = models.CharField(max_length=15)
    password = models.CharField(max_length=500)
    email = models.CharField(max_length=500)
    profile_picture_img = models.CharField(max_length=500)
    bio = models.CharField(max_length=500)
    admin = models.BooleanField(default=False)
    moderator = models.BooleanField(default=False)
    professional = models.BooleanField(default=False)
    verified_user = models.BooleanField(default=False)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

class Poses(models.Model):
    pose_name = models.CharField(max_length=500)
    pose_img = models.CharField(max_length=500)
    difficulty_level = models.CharField(max_length=500)
    category = models.CharField(max_length=500)
    description = models.CharField(max_length=500)
    chakra = models.CharField(max_length=500)

class Posts(models.Model):
    title = models.CharField(max_length=50)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    description = models.CharField(max_length=500)
    pose_id = models.ForeignKey(Poses, on_delete=models.CASCADE)
    post_img = models.CharField(max_length=500)
    post_video = models.CharField(max_length=500)
    created_at = models.DateTimeField(max_length=500)
    updated_at = models.DateTimeField(max_length=500)

class Comments(models.Model):
    verified = models.BooleanField(default=False)
    comment_text = models.CharField(max_length=500)
    comment_img = models.CharField(max_length=500)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    post_id = models.ForeignKey(Posts, on_delete=models.CASCADE)
    created_at = models.DateTimeField(max_length=500)
    updated_at = models.DateTimeField(max_length=500)

class Post_Likes(models.Model):
    post_id = models.ForeignKey(Posts, on_delete=models.CASCADE)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)

class Comment_Likes(models.Model):
    comment_id = models.ForeignKey(Comments, on_delete=models.CASCADE)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
