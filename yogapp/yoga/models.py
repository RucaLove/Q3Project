from django.db import models

import datetime
from django.utils import timezone

class Users(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    profile_picture_img = models.TextField(blank=True, null=True)
    bio = models.TextField()
    admin = models.NullBooleanField(default=False)
    moderator = models.NullBooleanField(default=False)
    professional = models.NullBooleanField(default=False)
    verified_user = models.NullBooleanField(default=False)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

class Poses(models.Model):
    pose_name_english = models.CharField(max_length=500, blank=True, null=True)
    pose_name_sanskrit = models.CharField(max_length=500, blank=True, null=True)
    pose_name_sanskrit_characters = models.CharField(max_length=500, blank=True, null=True)
    pose_img = models.TextField(blank=True, null=True)
    difficulty_level = models.CharField(max_length=500, blank=True, null=True)
    category = models.CharField(max_length=500, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    chakra_sanskrit = models.CharField(max_length=50, blank=True, null=True)
    chakra_english = models.CharField(max_length=50, blank=True, null=True)
    chakra_img = models.TextField(blank=True, null=True)

class Posts(models.Model):
    title = models.CharField(max_length=500)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    description = models.TextField()
    pose_id = models.ForeignKey(Poses, on_delete=models.CASCADE)
    post_img = models.TextField(blank=True, null=True)
    post_video = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

class Comments(models.Model):
    verified = models.BooleanField(default=False)
    comment_text = models.TextField()
    comment_img = models.TextField(blank=True, null=True)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    post_id = models.ForeignKey(Posts, on_delete=models.CASCADE)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

class Post_Likes(models.Model):
    post_id = models.ForeignKey(Posts, on_delete=models.CASCADE)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)

class Comment_Likes(models.Model):
    comment_id = models.ForeignKey(Comments, on_delete=models.CASCADE)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
