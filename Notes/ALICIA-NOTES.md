
### [DJANGO SERVER GitHub REPO](https://github.com/geegeorge/yogabuddy-server)

### [DJANGO SERVER LINK](https://yogabuddy-server.herokuapp.com/)


#### HOW TO: Deploy Django server to [Heroku](https://devcenter.heroku.com/articles/django-app-configuration)

```sh
git push heroku master

git push origin master
```

---

### How to push for client side:
**BRANCH-CREATOR**:
After changes have been made to [CREATED-BRANCH]
```sh
git push branch
```

**BRANCH CREATOR**:
_CLICK_ (ON GitHub) make pull request

**BRANCH CREATOR**:
_CLICK_ (ON GitHub) PULL REQEST
  - VIEW:
`base master` compare `[CREATED-BRANCH]`

**G** check changes on his machine by:
```sh
git pull origin [CREATED-BRANCH]
```

**G**: Then change into correct (MODIFIED) directory and run `lite-server`

If changes are acceptable, slack **BRANCH-CREATOR** That everything works.

**BRANCH-CREATOR**:
```sh
git merge [CREATED-BRANCH]

# DELETE CREATED BRANCH
git branch -d [CREATED-BRANCH]
```
**BRANCH-CREATOR**: Slack **G** 'message like: okay to deploy'

**G**:
```sh
git checkout master

git pull origin master
```

THEN DEPLOY ON AWS S3 BUCKET





---

###  G's AWS deployments:
- PROJECT DIRECTORY
- Copies desired content into AWS:
- Click Upload

---

#### DJANGO ADD DB MIGRATIONS SEEDS ETC STUFF

- to start, create models.py with (*Migrations*)
  - SET UP WITH DATA TYPE ETC
- create folder **fixtures**
  - add JSON files into **/fixtures** (*seeds*)


---

### CLIENT SIDE:

NEEDS TO CHANGE LOCAL TESTING URL
localhost:3000

_IF_ CHANGES THAT ARE NOT APPLIED TO SERVER SIDE

ANGUAR SERVICES NEED TO POINT TO HEROKU URL (https://yogabuddy-server.herokuapp.com/)


DJANGO ROUTES LISTEN TO AWS LINK ENDPOINTS
