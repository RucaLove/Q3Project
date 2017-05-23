STOLEN AND REFORMATTED FROM:
[Stack0verflow](http://stackoverflow.com/questions/11605917/this-vs-scope-in-angularjs-controllers)

"How does `this` and `$scope` work in AngularJS controllers?"
Short answer:

- #### `this`
  - When the controller constructor function is called, this is the controller.
  - When a function defined on a `$scope` object is called, `this` is the "scope in effect when the function was called". This may (or may not!) be the `$scope` that the function is defined on. So, inside the function, `this` and `$scope` may not be the same.

- #### `$scope`
  - Every controller has an associated `$scope` object.
  - A controller (constructor) function is responsible for setting model properties and functions/behaviour on its associated `$scope`.
  - Only methods defined on this `$scope` object (and parent scope objects, if prototypical inheritance is in play) are accessible from the HTML/view. E.g., from `ng-click`, filters, etc.

**Long answer:**

A controller function is a JavaScript constructor function. When the constructor function executes (e.g., when a view loads), `this` (i.e., the "function context") is set to the controller object. So in the "tabs" controller constructor function, when the addPane function is created
```js
this.addPane = function(pane) { ... }
```
it is created on the controller object, not on `$scope`. Views cannot see the addPane function -- they only have access to functions defined on `$scope`. In other words, in the HTML, this won't work:
```html
<a ng-click="addPane(newPane)">won't work</a>
```
After the "tabs" controller constructor function executes, we have the following:
![](https://i.stack.imgur.com/PUMuU.png)
after tabs controller constructor function

The dashed black line indicates prototypal inheritance -- an isolate scope prototypically inherits from Scope. (It does not prototypically inherit from the scope in effect where the directive was encountered in the HTML.)

Now, the pane directive's link function wants to communicate with the tabs directive (which really means it needs to affect the tabs isolate `$scope` in some way). Events could be used, but another mechanism is to have the pane directive `require` the tabs controller. (There appears to be no mechanism for the pane directive to `require` the tabs `$scope`.)

So, this begs the question: if we only have access to the tabs controller, how do we get access to the tabs isolate `$scope` (which is what we really want)?

Well, the red dotted line is the answer. The `addPane()` function's "scope" (I'm referring to JavaScript's function scope/closures here) gives the function access to the tabs isolate `$scope`. I.e., `addPane()` has access to the "tabs IsolateScope" in the diagram above because of a closure that was created when `addPane()` was defined. (If we instead defined `addPane()` on the tabs `$scope` object, the pane directive would not have access to this function, and hence it would have no way to communicate with the tabs `$scope`.)

To answer the other part of your question: how does `$scope` work in controllers?:

Within functions defined on `$scope`, `this` is set to "the `$scope` in effect where/when the function was called". Suppose we have the following HTML:

```html
<div ng-controller="ParentCtrl">
   <a ng-click="logThisAndScope()">log "this" and $scope</a> - parent scope
   <div ng-controller="ChildCtrl">
      <a ng-click="logThisAndScope()">log "this" and $scope</a> - child scope
   </div>
</div>
```

And the `ParentCtrl` (Solely) has

```js
$scope.logThisAndScope = function() {
    console.log(this, $scope)
}
```

Clicking the first link will show that `this` and `$scope` are the same, since _"the scope in effect when the function was called"_ is the scope associated with the `ParentCtrl`.

Clicking the second link will reveal `this` and `$scope` are **not** the same, since _"the scope in effect when the function was called"_ is the scope associated with the `ChildCtrl`. So here, `this` is set to `ChildCtrl`'s `$scope`. Inside the method, `$scope` is still the `ParentCtrl`'s `$scope`.

[Fiddle](http://jsfiddle.net/mrajcok/sbZw7/)

I try to not use `this` inside of a function defined on `$scope`, as it becomes confusing which ``$scope`` is being affected, especially considering that ng-repeat, ng-include, ng-switch, and directives can all create their own child scopes.
