# DB SCHEMA:
#### VALUES TRANSLATED TO [PYTHON](http://initd.org/psycopg/docs/usage.html#passing-parameters-to-sql-queries)  SQL QUERIES

### USERS:
- id (int)
- username (str)
- password(encrypted) (text)
- email (text)
- profile_picture_img (text)
- bio (str)
<!-- - administrator (bool)
- moderator (bool)
- professional (bool)
- verified_user (bool) -->
- created_at (datetime)
- updated_at (datetime)

##### user_auth (Authorization)  _JOIN USERS TABLE?_
- id  (int)
- user_id  (int)  **JOIN USERS TABLE**
- administrator (bool)
- moderator (bool)
- professional (bool)
- verified_user (bool)

### POSTS:
- id (int)
- title (str)
- user_id (int) **JOIN USERS TABLE**
- description (str)
- pose_id (int)  **JOIN POSES TABLE**
- post_img (str)
- post_video  (text)
- created_at (datetime)
- updated_at (datetime)

### POST_LIKES:
- id (int)
- post_id  (int)  **JOIN POSTS TABLE**
- user_id  (int)  **JOIN USERS TABLE**

### POSES:  _(CORRECT FORM PHOTOS)_
- id  (int)
- pose_name (str)
- pose_img (str)
- difficulty_level (str)
- style (str)
- description (str)
- chakra (str)

## COMMENTS: **JOIN POSTS TABLE**
- id  (int)
- verified (bool)
- comment_text (str)
- comment_img (text)
- user_id  (int) **JOIN USERS TABLE**
- post_id  (int)  **JOIN POSTS TABLE**
- created_at (datetime)
- updated_at (datetime)

### COMMENT_LIKES:     **JOIN COMMENTS TABLE**
- id  (int)
- comment_id  (int) **JOIN POSTS TABLE**
- user_id  (int) **JOIN USERS TABLE**
