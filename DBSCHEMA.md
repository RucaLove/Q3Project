DB SCHEMA

### USERS:
id  (int)
username (string)
password(encrypted) (text)
email (string)
profile_picture_user (text)
biography/summary (string)

### POSTS:
id  (int)
user_id  (int) (JOIN USERS TABLE)
user_pose_picture_url (text) (?JOIN USERS TABLE?)
description/ Content (string)
pose_id  (int) (join to pose table)

### POST.LIKES
id (int)
post_id  (int) (join POSTS)
user_id  (int) (join USERS)

### POSE (DB OF STATIC CORRECT FORM PHOTOS)
id  (int)
pose_picture_url (text)

### COMMENT (join POSTS)
id (int)
content (?IMG UPLOAD?)
  content.text (string)
  content.image_url (text)
user_id  (int) (join USERS)
post_id  (int) (join POSTS)

### COMMENT.LIKES (join COMMENT)
id (int)
comment_id (int) (join POSTS)
user_id (int) (join USERS)

### user_auth (Authorization)
id (int)
user_id (JOIN USERS)
professional (bool)
moderator (bool)
administrator (bool)
