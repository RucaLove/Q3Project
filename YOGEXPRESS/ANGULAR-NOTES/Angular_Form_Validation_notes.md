# Form Validation

- Add no novalidate option onto form ```<form novalidate>```
- ng-valid bool that tells if item is valid
- ng-invalid bool that tells if item is currently invaled based on rules you placed
- ng-pristine true if the form/input has not yet been used
- ng-dirty bool thats true if form has been used
- ng-touched bool thats true if input has been _???IDK-WTF-THIS-MEANS:   blurred????_       blurred = before you've touched it
##### [ng-class DOCS](https://docs.angularjs.org/api/ng/directive/ngClass)

The following is for creating validation on a form that is toggled away after submission:

```html
<div ng-if="$ctrl.form" class="animate-if row">
    <div class="col-md-8">

        <!-- THE 'ng-sumbit' IS INVOKING / CALLING THE FUNCTION CREATED IN "posts.js"  FILE TO CREATE A NEW POST.
         FORM VALIDATION: THE NAME "$ctrl.new" IS USED FOR THE ENTIRETY OF THIS FORM
          novalidate IS USED TO DISABLE THE BROWSERS DEFAULT FORM VALIDATION-->
        <form name="$ctrl.new" ng-submit="$ctrl.new.$valid && $ctrl.createPost()" novalidate>
            <!-- ADDING THE TITLE -->
            <!-- THIS IS THE DIV TO CONTAIN THE ERROR MESSAGE INSIDE THE <SPAN>
          THIS HAS THE ANGULAR CLASS ( ng-class="{'has-error': $ctrl.new.title.$invalid}" ) THAT WILL BE APPLIED WHEN VALUE IS TRUE  -->
            <div class="form-group" ng-class="{'has-error': $ctrl.new.title.$touched && $ctrl.new.title.$invalid}">

                <!-- THIS IS THE LABLE TITLE  INPUT FIELD  -->
                <label for="title">Title</label>

                <!-- ERROR MESSAGE TO BE DISPLAYED IF INVALID -->
                <span ng-show="$ctrl.new.title.$invalid && $ctrl.new.title.$touched">Please enter a title</span>
                <!-- THE 'ng-model' IS SETTING THE KEYS FOR THE INPUT FIELD TO BE PASSED INTO A 'post' OBJECT 'title' IN THIS CASE-->
                <input id="title" class="form-control" name="title" ng-model="$ctrl.post.title" type="text" required>

            </div>
            <!-- ADDING THE BODY -->
            <div ng-class="{'has-error': $ctrl.new.body.$invalid && $ctrl.new.body.$touched}">
                <label for="body">Body</label>
                <span ng-show="$ctrl.new.body.$invalid && $ctrl.new.body.$touched">Your post must have content</span>
                <textarea ng-model="$ctrl.post.body" id="body" class="form-control" name="body" type="text" required></textarea>

            </div>
            <!-- ADDING AN AUTHOR -->
            <div ng-class="{'has-error': $ctrl.new.author.$invalid && $ctrl.new.author.$touched}">
                <label for="author">Author</label>
                <span ng-show="$ctrl.new.author.$invalid && $ctrl.new.author.$touched">I need to know whos post this is. Please add your name</span>
                <input id="author" ng-model="$ctrl.post.author" class="form-control" name="author" type="text" required>
            </div>

            <!-- ADDING AN IMG -->
            <div ng-class="{'has-error': $ctrl.new.url.$invalid && $ctrl.new.url.$touched}">
                <label for="image-url">Image URL</label>
                <span ng-show="$ctrl.new.url.$invalid && $ctrl.new.url.$touched">THIS BLOG IS FOR PICTURES!!!!</span>
                <input ng-model="$ctrl.post.url" id="image-url" class="form-control" name="url" type="text" required>
            </div>

            <div class="form-group">
                <!-- THE SUBMIT BUTTON IS PASSING ALL OF THE INPUTS THE CLIENT HAS SPECIFIED AS VALUES TO EACH KEY SPECIFIED ABOVE IN THE VARIOUS 'ng-model' -->
                <button type="submit" class="btn btn-primary">
        Create Post
      </button>
            </div>
        </form>

    </div>
</div>
```

The following is form validation on a  form input that doesn't go away after submission. Which created a problem when trying to check if the client has touched the form. I remedied this problem with the javascript code snippet below.

```html
<form name="$ctrl.lostComment" ng-submit="$ctrl.lostComment.$valid && $ctrl.addComment(post)" class="form-inline" novalidate>
    <div class="form-group" ng-class="{'has-error': $ctrl.lostComment.text.$touched && $ctrl.lostComment.text.$invalid}">

        <span ng-show="$ctrl.lostComment.text.$invalid && $ctrl.lostComment.text.$touched">Enter a comment</span>
        <!-- THIS IS SETTING THE KEY TO 'text' -->
        <input type="text" ng-model="post.comment.text" name="text" class="form-control" required>

    </div>
    <div class="form-group">

        <!-- THE SUBMIT IT WILL ADD THE VALUES OF EVERY INPUT FIELD TO EACH SPECIFIED KEY('ng-model') -->
        <input type="submit" class="btn btn-primary">
    </div>
</form>

```

This following is on a form that stays open after submit and created a problem of not resetting the form fields to pristine condition so I added the ```$setUntouched()``` function to my form name

```javascript
function addComment(post) {

  // ADDING(pushing) THE COMMENT MADE ON THE INDIVIDUAL POST TO THAT POSTS COMMENTS ARRAY
  post.comments.push(post.comment)

  // CLEARS THE INPUT FIELD (SO LAST COMMENT MADE IS NO LONGER IN THE TEXT FIELD)
  delete post.comment

  vm.lostComment.$setUntouched();
}
```

Setting an error class in css:
```css
.has-error {
  color: red;
}
```
