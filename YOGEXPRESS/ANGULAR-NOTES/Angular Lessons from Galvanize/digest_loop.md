<!-- .slide: data-background-video="https://i.imgur.com/k8Xzzce.webm" data-background-video-loop="loop" data-background-video-muted>  -->

Inside AngularJS:

# The $digest Loop

---

<!-- .slide: data-background-video="https://flixels.s3.amazonaws.com/flixel/ypy8bw9fgw1zv2b4htp2.webm" data-background-video-loop="loop" data-background-video-muted="muted">  -->

# Success Criteria

* Define and Describe the `$digest` Loop
 * The `$evalAsync` queue
 * The `$watch` list
  * Dirty Checking
* Identify "Observing" Directives
* Identify "Listener" Directives
* Describe `$scope` methods used in the `$digest` Loop and know when to use them:

```js
$scope.$watch();
$scope.$digest();
$scope.$apply();
```

---

## Data Binding

* When you change something in the view, the scope model _automagically_ updates.
* Similarly, whenever the scope model changes, the view updates itself with the new value.

---

# Well, how does that work?

---

<!-- .slide: data-transition="zoom"> -->

![](https://docs.angularjs.org/img/guide/concepts-runtime.png)

---

<!-- .slide: data-transition="zoom"> -->

# _fin_

---

<!-- .slide: data-transition="zoom" data-background="http://3.bp.blogspot.com/-IiaN5_e4dgY/UB7EuNNpGuI/AAAAAAAACIM/S2KMCYFWLp8/s1600/Shia-labeouf-magic.gif">  -->


<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
![](https://docs.angularjs.org/img/guide/concepts-runtime.png)

---

<!-- .slide: data-transition="zoom" data-background-video="https://fat.gfycat.com/FlatFakeDinosaur.webm" data-background-video-loop="loop" data-background-video-muted="muted"> -->
<br />
<br />
<br />
<br />
<br />
# The $digest Loop

* The magic behind AngularJS data-binding
* Updates to `$scope` variables must happen within the context of the `$digest` loop to be reflected in the view
* The `$digest` loop is fired when the browser receives an event (e.g. `ng-click`, `$http`, `$q`) that can be managed by the angular context.

---

## The $digest Loop

### This loop is made up of two smaller loops.
* The first loop processes the `$evalAsync` queue
 * The `$evalAsync` queue contains those tasks which are scheduled by `$evalAsync()` function from a directive or controller.
* The other loop processes the `$watch` list.
 * Each DOM element that is bound to a `$scope` property has a watcher in the `$watch` list
 * Each watch expression in the list is evaluated to see if the value has changed, if it has, the $digest is marked as dirty
* The `$digest` loop keeps iterating until:
 * The `$evalAsync` queue is empty
 * The `$watch` list does not detect any changes in the model.

---

### Watches are resolved in the `$digest` loop through a process called Dirty Checking

**dirty checking**:

* A process that checks whether a value has changed
 * If the value has changed, it set the `$scope` as dirty.
 * If the `$scope` is dirty, another `$digest` loop is triggered.

---

## How Many Times Does The $digest Loop Run?

When a $digest cycle runs, the watchers are executed to see if the scope models have changed. If they have, then the corresponding listener functions are called. This leads to an important question.

---

<!-- .slide: data-transition="zoom" data-background="http://www.gallereplay.com/img/socialmedia/gifs/gerardo%20Juarez%20-%20skateboard%20flip2%20-%20new%20mexico.gif">  -->


# What if a listener function itself changed a scope model?

---

The answer:
>the $digest loop doesn’t run just once.

At the end of the current loop, it starts all over again to check if any of the models have changed. This is to account for any model changes that might have been done by listener functions.

---

## How Many Times Does The $digest Loop Run?

* No more than 10.
* AngularJS will throw an exception if the $digest loop runs more than 10 times in a row.
 * Try to minimize model changes inside listener functions.
* At a minimum, $digest will run twice even if your listener functions don’t change any models. It runs once more to make sure the models are stable and there are no changes.

---

## $digest Loop pseudocode

```
Do:
- - - If asyncQueue.length, flush asyncQueue.
- - - Trigger all $watch handlers. (Dirty Checking)
- - - Check for "too many" $digest iterations.
While: ( Dirty data || asyncQueue.length )
```

[$digest source code](https://github.com/angular/angular.js/blob/master/src/ng/rootScope.js#L746)

---

## The `$evalAsync` queue

* Contains tasks which are scheduled by `$evalAsync()` function from a directive or controller.
* The queue is flushed (all tasks in the queue are executed) at the beginning of each `$digest` loop.
 * _Before_ evaluating `$watch` expressions.

```js
$scope.$evalAsync(function(){
  console.log("I'm in the $digest loop $evalAsync queue!")
});
```

<!-- _While `$evalAsync` is important to know about and use, it is most commonly used in custom services and directives which are beyond the scope of this lecture_ -->

---

## `$evalAsync` vs `$timeout`

* If code is queued using $evalAsync from a:
 * directive, it should run after the DOM has been manipulated by Angular, but before the browser renders
 * controller, it should run before the DOM has been manipulated by Angular (and before the browser renders) -- rarely do you want this
* If code is queued using $timeout, it should run after the DOM has been manipulated by Angular, and after the browser renders (which may cause flicker in some cases)

---

## When to use `$evalAsync`

`$evalAsync(callback)` will add the callback to the current, or next, digest cycle.

This means if you are within a digest cycle (for instance in a function called from some `ng-click` directive), this will not wait for anything, the code will be executed right away.

If you are within an asynchronous call, for instance a `setTimeout`, a new digest cycle (`$apply`) will be triggered.

In terms of performance, it is always better to call `$evalAsync`, unless it is important for you that the view is up to date before executing your code, for instance if you need access to some DOM attribute such as elements width etc.

---

## The `$watch` List

* Each DOM element that is bound to a `$scope` property has a watcher in the `$watch` list
 * AngularJS creates watchers during the compilation phase

```html
 <p>Hello {{ name }}</p>
 ```

Creates a watcher:

 ```js
 $scope.$watch('name', function(oldValue, newValue){
   // updates DOM element
   // for example:
   // element.innerHTML = element.innerHTML.replace(/\{\{(.*)\}\}/g, 'newValue')
 });
 ```

---

<!-- .slide: data-background-video="http://i.imgur.com/eIeMYXd.webm" data-background-video-loop="loop" data-background-video-muted="muted">  -->

### Spot the watchers

```html
<input type="text" ng-model="name">
<p>Hello {{ name }}</p>
```

---

### Spot the watchers

* ng-model creates a watcher to update the value of the input when it changes
* {{}} creates a watcher to update the DOM

---

# WE DO

[Camera Shop: Spot the Watchers](https://gist.github.com/w3cj/c9092d7a3f714480c5dceabb8210eee9)

---

## Exercise: Spot the watchers
10 minutes

1. Count the number of DOM watchers in your reddit clone
1. Pair Up
1. Send your reddit clone to your partner
1. Verify you both got the same number of watchers
1. Discuss

---

### When you write an expression `{{aModel}}`, behind the scenes Angular sets up a watcher on the scope model, which in turn updates the view whenever the model changes.

---

## Register a `$watch` in the `$digest` loop

```html
<input type="text" ng-model="name">
<p>Hello {{ name }}</p>
```

```js
// Behind the scenes AngularJS creates one of these
// for both ng-model and the {{}} expression
$scope.$watch('name', function(newValue, oldValue){
  console.log('name changed from', oldValue, 'to', newValue);
});
```

---

## Exercise: `$watch` a value
5 minutes

1. Add a $watch function in your reddit clone controller to a `$scope` value that is bound to an input
1. Open up the dev tools
1. Start typing in the input box
1. Watch the console logs pour in

```js
// Example watching a nested object property
$scope.$watch('posts[0].newComment.text', function(newValue, oldValue){
  console.log('text changed from', oldValue, 'to', newValue);
});
```

---

# Types of Directives

---

## `$compile`
During the compilation phase, the compiler matches directives against the DOM template. The directives usually fall into one of two categories:

* Observing directives
* Listener directives

---

## Observing directives

* Such as double-curly expressions {{expression}}, register listeners using the `$watch()` method.
* This type of directive needs to be notified whenever the expression changes so that it can update the view.

```html
<p>Hello {{ name }}</p>
```

---

## Listener directives

* Such as ng-click, register a listener with the DOM.
* When the DOM listener fires, the directive executes the associated expression and updates the view using the `$apply()` method.

```html
<button ng-click="doTheThing()">Click Me</button>
```

---

# I DO

Inside a controller:
* Select a DOM element
* Add an event listener for `mouseup`
* Set a `$scope` variable in the event listener

### What happens?

---

<!-- .slide: data-background-video="https://flixels.s3.amazonaws.com/flixel/7a0iejyutuuc9p8rdss3.webm" data-background-video-loop="loop" data-background-video-muted="muted">  -->

# Nothing...

---

# When is a $digest loop triggered?

---

### When is a $digest loop triggered?

When either

```js
$scope.$digest()
// OR
$scope.$apply()
```

are called...

---

## Who calls `$scope`.`digest()` or `$scope`.`$apply()`?

---

### Who calls `$scope`.`digest()` or `$scope`.`$apply()`?

Built in and custom AngularJS directives, services

---

### directives and services?

* directives
 * Trigger a digest after they have updated $scope properties in a DOM event listener
* services
 * Trigger a digest when an async function completes or a promise resolves


---

## When to use `$scope`.`$apply()`

* When you make changes to the scope outside of the Angular context
* Whenever possible, use AngularJS services instead of native. If you're creating an AngularJS service (such as for sockets) it should have a `$scope`.`$apply()` anywhere it fires a callback.
* Most places (controllers, services) `$apply` has already been called for you by the directive which is handling the event.
* An explicit call to `$apply` is needed only when implementing custom event callbacks, or when working with third-party library callbacks.

---

### AngularJS provides wrappers for common native JS async behaviors:

* Events => `ng-click`
* Timeouts => `$timeout`
* `jQuery.ajax()` => `$http`

These are just traditional async functions with a `$scope`.`$apply()` called at the end, to tell AngularJS that an asynchronous event just occurred.

---

## Do NOT randomly sprinkle `$scope`.`$apply()` throughout your code.

```js
if (!$scope.$$phase) $scope.$apply() // Don't do this
```

---

## Exercise: `$apply` a value

In your reddit clone view:

1. Create an `ng-repeat` over a collection on `$scope` called `redditPosts`
1. Inside the `ng-repeat`, render the title of each post

Inside your reddit clone controller:

1. Use jQuery AJAX to GET data from the reddit API
`https://www.reddit.com/.json`
1. When the request completes, set a `$scope`.`redditPosts` to the array returned from the request

### How can we get the data to show up in the view?

[Example Solution](https://gist.github.com/w3cj/3ba748a0241dcf044b0449aabb9228f3)

---

# Difference between `$apply` and `$digest`

---

```html
<!DOCTYPE html>
<html lang="en" ng-app="applydigest">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body >
  <div>
    From $rootScope: {{rootView.name}}
  </div>
  <div ng-controller="MainController">
    From $scope: {{view.age}}
  </div>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.0/angular.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

```js
angular.module("applydigest", [])
  .controller("MainController", function($rootScope, $scope) {
    $rootScope.rootView = {};
    $rootScope.rootView.name = "Fido";
    $scope.view = {};
    $scope.view.age = 3;

    // this is for example purposes
    // NOTE - there is a $timeout which handles $apply for you
    setTimeout(function() {
      $rootScope.rootView.name = "Lassie";
      $scope.view.age = 10;
      // $scope.$digest(); Trigger a digest in the current scope
      // $scope.$apply(); Trigger a digest in the entire Application
    }, 1000);
});
```

---

### `$digest`

When you call `$scope`.`$digest()` it only runs the digest loop from that particular scope, but when you call `$apply`, that uses the `$rootScope` and goes through all scopes in the application.

If you have many watches and scopes, and you know that you only need to modify a single scope it is best to use `$digest`, otherwise use `$apply`.

---

<!-- .slide: data-transition="zoom"> -->

# Review

---

<!-- .slide: data-transition="zoom" data-background="http://3.bp.blogspot.com/-IiaN5_e4dgY/UB7EuNNpGuI/AAAAAAAACIM/S2KMCYFWLp8/s1600/Shia-labeouf-magic.gif">  -->


<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
![](https://docs.angularjs.org/img/guide/concepts-runtime.png)

---

<!-- .slide: data-transition="zoom" data-background-video="https://zippy.gfycat.com/ShimmeringPerkyHerald.webm" data-background-video-loop="loop" data-background-video-muted="muted"> -->

![](https://docs.angularjs.org/img/guide/concepts-runtime.png)

---

<!-- .slide: data-background-video="https://flixels.s3.amazonaws.com/flixel/ypy8bw9fgw1zv2b4htp2.webm" data-background-video-loop="loop" data-background-video-muted="muted">  -->

# Review

* Define and Describe the `$digest` Loop
 * The `$evalAsync` queue
 * The `$watch` list
  * Dirty Checking
* Identify "Observing" Directives
* Identify "Listener" Directives
* Describe `$scope` methods used in the `$digest` Loop and know when to use them:

```js
$scope.$watch();
$scope.$digest();
$scope.$apply();
```

---

# Resources

* [AngularJS Developer Guide](https://docs.angularjs.org/guide/scope#scopes-and-directives)
* [Notes On AngularJS Scope Life-Cycle](http://onehungrymind.com/notes-on-angularjs-scope-life-cycle/)
* [`$watch` How the `$apply` Runs a `$digest`](http://angular-tips.com/blog/2013/08/watch-how-the-apply-runs-a-digest/)
* [Understanding Angular’s `$apply()` and `$digest()`](http://www.sitepoint.com/understanding-angulars-apply-digest/)
* [StackOverflow: How does data binding work in AngularJS?](http://stackoverflow.com/questions/9682092/how-does-data-binding-work-in-angularjs/9693933#9693933)
* [When to use `$scope`.`$apply()`](https://git.io/vrfdW)

#### Videos

* [Understanding the AngularJS Digest Cycle](https://www.youtube.com/watch?v=3DuyyNgXqsE)
* [Angular from scratch by Matthieu Lux at ng-europe 2014](https://www.youtube.com/watch?v=Mk2WwSxK218)

---

<!-- .slide: data-background-video="https://i.imgur.com/k8Xzzce.webm" data-background-video-loop="loop" data-background-video-muted>  -->

Inside AngularJS:

# The $digest Loop
