# Services

Standard: **Refactor Angular applications to use services and components ([W0046](#))**

## Objectives

1.  Create a service
2.  Use the service you created
3.  Use the service to make `$http` calls

## A brief introduction

As you start building larger applications with multiple components, not only is your code per component becoming larger, but you are starting to face a new problem. How do you share data, properties and methods between components?

You use services!

Angular services are like instances of classes that are added to your code via dependency injection. Read more on the [angular docs](https://docs.angularjs.org/guide/services).

## #1 - Create a service

In order to create a service you must:

1.  Call the `service` method on an Angular module
2.  Attach properties (both state and behavior) to `this`

Here's an example:
```js
(function() {
  'use strict';

  angular
    .module('app')
    .service('personService', service)

  function service() {
    this.name = 'Matt'
    this.job = 'Instructor'
    this.sayHi = function(){
      return 'Hello!'
    }
  }

}())
```
Notice how it looks very similar to the way you defined controllers in components.

## #2 - Use the service you created

Imagine you had a component like this:
```js
(function() {
  'use strict';

  angular.module('app')
    .component('show', {
      controller: controller
    })

  function controller() {
    const vm = this
  }

}());
```
In order to inject your service, you simply inject it the same way you would `$http`, or `$state`:
```js
(function() {
  'use strict';

  angular.module('app')
    .component('show', {
      controller: controller
    })

  controller.$inject = ['personService']

  function controller(personService) {
    const vm = this

    vm.$onInit = function () {
      vm.message = personService.sayHi()
    }
  }

}());
```
Recall from earlier that injecting a service requires you to:

1.  Make sure the function is named, and not an anonymous function
2.  Use the `functionName.$inject = []` syntax to declare what you will inject
3.  Add a parameter to the method that matches the name _and the order_ of the `$inject` array

## #3 - Use the service to make HTTP calls

As a general rule you want to use services whenever you:

*   Make `$http` calls
*   Need to reuse code across components (especially data processing code)
*   Need to store state/data that multiple components can access

In this section you will learn a decent pattern for making asynchronous calls from a service, namely `$http` calls.

As a general rule:

*   Make all `$http` calls in your service
*   Return promises from the service methods
*   Use the service to do any data munging and yield an easy-to-work-with value
*   Bind to the resolved value of the promises

For example let's say you have to get a person's record and their addresses. Your controller code might look like this:
```js
(function() {
  'use strict';

  angular.module('app')
    .component('show', {
      controller: controller
    })

  controller.$inject = ['$http']

  function controller($http) {
    const vm = this
    const id = 1 // this would come from the URL in real life

    vm.$onInit = function () {
      $http.get(`/people/${id}`).then(personResponse => {
        const person = personResponse.data
        $http.get(person.commentUrl).then(commentsResponse => {
          person.comments = commentsResponse.data
          vm.person = person
        })
      })
    }
  }

}())
```
In the example above notice how the component's controller has to:

1.  Fetch a person
2.  Then call `.data` on the response to get a person
3.  Then get comments for the person
4.  Then call `.data` on the response to get the comments
5.  Assign comments to the person
6.  Set the result to `vm.person`

What would happen if another component needed the same data in the same format? What if your controller needed lots of other bits of data as well? In both cases that fat chunk of code will make it hard to work with and change.

So following the rules above, if you make all `$http` calls in the service, your controller looks like this:
```js
(function() {
  'use strict';

  angular.module('app')
    .component('show', {
      controller: controller
    })

  controller.$inject = ['personService']

  function controller(personService) {
    const vm = this
    const id = 1

    vm.$onInit = function () {
      personService.getPerson(id)
        .then(person => vm.person = person)
    }
  }

}())
```
Aaaahhh... Much nicer! So what does the service look like?
```js
(function() {
  'use strict';

  angular
    .module('app')
    .service('personService', service)

  function service() {
    this.getPerson = function(id) {
      return $http.get(`/people/${id}`).then(personResponse => {
        const person = personResponse.data
        return $http.get(person.commentUrl).then(commentsResponse => {
          person.comments = commentsResponse.data
          return person
        })
      })
    }
  }

}())
```
Notice that, like in all methods that return promises, you need to return at each level.

Benefits to this approach:

*   The controller doesn't have complex API logic anymore - just a simple injected service and a simple call
*   The service can now be reused in other parts of the app
*   In tests you can inject a fake `personService` so you can test the component without making `$http` calls

## A note on legacy Angular 1 applications

In Angular 1 there are lots of things that are similar to services, such as:

*   Factories
*   Values
*   Constants

In Angular 2 and in other web frameworks concepts like Angular 1 Factories, Values and Constants don't really apply. So if you are looking to get good at legacy Angular 1 dig into those, but otherwise just get comfortable with Services.

# Resources

*   [Putting Angular Code in the Right Place](http://datamelon.io/blog/2016/putting-angular-code-in-the-right-place.html)
