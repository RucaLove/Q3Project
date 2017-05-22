# WORKING ON BRANCHES IN GITHUB

##### 1. CREATE GIT BRANCH
git checkout -b [branch name]

#### DURING THIS TIME TO COMMIT FILES TO YOUR BRANCH:
git add [file name]
git commit [file name] -m

##### 2. PART ONE OF GRABBING ANY CHANGES TO MASTER
git checkout master

##### PART TWO OF GRABBING ANY CHANGES TO MASTER
git pull origin master

##### SWITCHING BACK TO FEATURE BRANCH
git checkout [branch name]
git rebase master (takes other changes and adds to your feature branch - conflicts will appear at this step)
git checkout master (switch back to master)

##### MERGE BRANCH WITH MASTER
git merge [branch name]

##### ADDS FINAL CHANGES TO MASTER REPO
git push origin master

##### DELETES FROM BRANCH
git branch -d [branch name]
