
# AngularJS Modules, Controllers and `$scope`

---

## Objectives

* Define and describe module, controller and $scope
* Set values on $scope to see them updated in the view
* Define and describe $rootScope
* Explain the relation between DOM hierarchy and scope hierarchy

---

# Modules

---

## What is a Module?

A module is a container for the different parts of your app – controllers, services, filters, directives, etc.

---

## Why?

Most applications have a main method that instantiates and wires together the different parts of the application.

Angular apps don't have a main method. Instead modules declaratively specify how an application should be bootstrapped.

---

```html
<div ng-app="myApp">
  <div ng-controller="GreetingController">
    <input type="text" name="name" ng-bind="name">
    Hello, {{ name }}
  </div>
</div>
```

```js
var myAppModule = angular.module('myApp', []);

myAppModule.controller('GreetingController', function($scope) {
  $scope.name = 'CJ';
});
```

---

## Important things to notice:

* The reference to myApp module. This is what bootstraps the app using your module:
```html
<div ng-app="myApp">
  ...
</div>
```
* The Module API:
 * The empty array in angular.module('myApp', []). This array is the list of modules myApp depends on.

```js
// Create a module with the name 'appName' and no dependencies.
angular.module('myApp', [])

// Get a module with the name 'appName'
angular.module('myApp')
```

---

# Controllers

---

* An Angular Controller is a JavaScript function.
* Controllers are defined/added on a module.
* Controllers add properties and methods to $scope which can then be used in the view.
* A Controller shouldn't try to do too much. It should contain only the business logic needed for a single view.

```js
var myAppModule = angular.module('myApp', []);

myAppModule.controller('GreetingController', GreetingController);

function GreetingController($scope) {
  $scope.name = 'CJ';
}
```

---

### `ng-controller`

```html
<div ng-app="myApp">
  <div ng-controller="GreetingController">
    <input type="text" name="name" ng-bind="name">
    Hello, {{ name }}
  </div>
</div>
```

----

## Notes on `ng-controller`

* When a Controller is attached to the DOM via the `ng-controller` directive, Angular will instantiate a new Controller object, using the specified Controller's constructor function.
* A new child scope will be created and made available as an injectable parameter to the Controller's constructor function as $scope.

----

# Notes on Controllers

----

# Using Controllers Correctly

In general, a Controller shouldn't try to do too much. It should contain only the business logic needed for a single view.

The most common way to keep Controllers slim is by encapsulating work that doesn't belong to controllers into services and then using these services in Controllers via dependency injection.

----

# DO use Controllers to:

* Set up the initial state of the $scope object.
* Add behavior to the $scope object.

----

# DO NOT use Controllers to:

* Manipulate DOM — Controllers should contain only business logic. Putting any presentation logic into Controllers significantly affects its testability. Angular has databinding for most cases and directives to encapsulate manual DOM manipulation.
* Format input — Use angular form controls instead.
* Filter output — Use angular filters instead.
* Share code or state across controllers — Use angular services instead.
* Manage the life-cycle of other components (for example, to create service instances).

---

# `$scope`

---

### `$scope`

* `$scope` is an object used for data binding that we can define methods and properties on. It is automatically injected into our controllers so that we can use it.
* `$scope` is _just_ a JavaScript object.
* Both the controller and the view have access to $scope
  * "the glue between the controller and the view".
	* The execution context for expressions
* Arranged in hierarchical structure which mimic the DOM structure of the application

```js
angular.module('myApp', [])
  .controller('AwesomeController', function($scope){
    $scope.title = "I'm Awesome!";
  });
```

---

### What's happening in a component controller:

```js
angular.module('myApp', [])
  .controller('AwesomeController', function($scope){
		const vm = this;
		$scope.$ctrl = vm;

		vm.title = "I'm Awesome!";
  });
```

---

## `$rootScope`

* Every Angular application has a single *root* scope.
* All other scopes descend from `$rootScope`
* `$rootScope` can be _injected_ into a controller just like $scope

```js
angular.module('myApp', [])
  .controller('AwesomeController', function($scope, $rootScope){
    //now have access to $rootScope
  });
```

---

### All other scopes descend from `$rootScope`

* All scopes are created with prototypal inheritance
  * All scopes have access to their parent scopes
* Whenever Angular cannot find a method or property on the local scope, it will check the parent scope, if it can't find it there, it will continue up the tree until it reaches $rootScope

---

## [Scope Hierarchies](https://docs.angularjs.org/guide/scope#scope-hierarchies)

---

## Resources

* [AngularJS Scopes Guide](https://docs.angularjs.org/guide/scope)
* [Understanding Scopes](https://github.com/angular/angular.js/wiki/Understanding-Scopes)
* [Quora: What is $scope in AngularJS in layman's language?](https://www.quora.com/What-is-scope-in-AngularJS-in-laymans-language)
* [ng-newsletter Scopes](http://www.ng-newsletter.com/posts/beginner2expert-scopes.html)
