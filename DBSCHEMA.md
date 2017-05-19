DB SCHEMA

### USERS:
* id (int)
* username (string)
* password (encrypted) (text)
* email (string)
* profile_picture_img (text)
* bio (string)
* administrator (boolean)
* moderator (boolean)
* professional (boolean)
* verified_user (boolean)
* created_at
* updated_at

### POSTS:
* id (int)
* post_img (string)
* post_video (string)
* description (string)
* user.id (int) (JOIN USERS TABLE)
* pose.id (int) (JOIN POSE TABLE)
* created_at
* updated_at

### POST.LIKES
* id (int)
* post.id (int) (JOIN POSTS)
* user.id (int) (JOIN USERS)

### POSES (DB OF STATIC CORRECT FORM PHOTOS)
* id (int)
* pose_name
* pose_img (string)
* difficulty_level
* style (standing, seated, etc.)
* chakra
* description

### COMMENT (join POSTS)
* id (int)
* verified
* comment_text
* comment_img
* user.id (int) (JOIN USERS)
* post.id (int) (JOIN POSTS)
* created_at
* updated_at

### COMMENT.LIKES (join COMMENT)
* id (int)
* comment.id (int) (JOIN POSTS)
* user.id (int) (JOIN USERS)
