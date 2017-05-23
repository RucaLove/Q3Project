<!-- .slide: data-background-video="https://flixels.s3.amazonaws.com/flixel/zw1s0il2yp4fentpmffm.webm" data-background-video-loop="loop" data-background-video-muted="muted">  -->

# AngularJS Services

---

<!-- .slide: data-background-video="https://flixels.s3.amazonaws.com/flixel/toqcai3t7pw8533e0gnv.webm" data-background-video-loop="loop" data-background-video-muted="muted">  -->

# Objectives

* Define and Describe a Singleton
* Define and Describe AngularJS Services
* Compare and contrast a "factory" service and "service" service
* Articulate when to use a "factory" service or a "service" service

---

## What is an instance? How do you create one in JavaScript?

---

<!-- .slide: data-background-video="https://flixels.s3.amazonaws.com/flixel/9xohgso1axcgy6d8vwsj.webm data-background-video-loop="loop" data-background-video-muted="muted">  -->

```js
// Dog Constructor function
function Dog(name, speak) {
  this.name = name;
  this.speak = speak;
}

// Create some instances
let fido = new Dog('Fido', 'Woof');
let fifi = new Dog('Fifi', 'Le Bow');

console.log(fido.name, 'says', fido.speak);
console.log(fifi.name, 'says', fifi.speak);
```

---

# What's a singleton?

---

## Singleton

>In software engineering, the singleton pattern is a design pattern that restricts the instantiation of a class to one object. This is useful when exactly one object is needed to coordinate actions across the system. The concept is sometimes generalized to systems that operate more efficiently when only one object exists, or that restrict the instantiation to a certain number of objects.

[https://en.wikipedia.org/wiki/Singleton_pattern](https://en.wikipedia.org/wiki/Singleton_pattern)

---

## Singleton

A single instance shared throughout your application.

---

### What does that look like in plain old JavaScript?

---

<!-- .slide: data-background-video="https://flixels.s3.amazonaws.com/flixel/msg7yc4znac2328s373k.webm" data-background-video-loop="loop" data-background-video-muted="muted">  -->

```js
// Application constructor function
function Application() {
  let thingServiceInstance = null;

  // Service constructor function
  function ThingService() {
    // ThingService implementation here...
    this.things = [7, 13, 23, 42];
  }

  this.getThingService = function() {
    if (thingServiceInstance == null) {
      // Only create the instance once!
      // Lazy instantiation! Only created when we c
      thingServiceInstance = new ThingService();
    }

    return thingServiceInstance;
  }
}
```

---

<!-- .slide: data-background-video="https://flixels.s3.amazonaws.com/flixel/2v5171t1991xut45nbny.webm" data-background-video-loop="loop" data-background-video-muted="muted">  -->

```js
// Create an instance of an Application
let app = new Application();
// Get the thingService
let thingService = app.getThingService();
// Get the thingService again
let thingServiceAgain = app.getThingService();

console.log('the thingService is the thingService:',
  thingService === thingServiceAgain);
console.log('the things are the things:',
  thingService.things === thingServiceAgain.things);
```

---

# Name one singleton you've used outside of Angular.

---

# AngularJS Services

---

## AngularJS Services

AngularJS Services allow us to organize and share code between the various components in our application. (controllers, services and directives)

Using a service to share data prevents us from polluting `$rootScope` with extraneous properties, methods and data.

---

## AngularJS Services

* Lazily instantiated – Angular only instantiates a service when an application component depends on it.
* Singletons – Each component dependent on a service gets a reference to a single instance.

> Angular offers several useful services (like `$http`), but for most applications you'll also want to create your own.

> Note - Like other core Angular identifiers, built-in services always start with `$` (e.g. `$http`).

---

## When to use Services

* `$http` requests
 * Keep `$http` logic out of your controller
* Commonly used functions
 * Send an email
 * Create an object of a certain type
 *

---

<!-- .slide: data-background-video="https://flixels.s3.amazonaws.com/flixel/57gccayoiwojrfwa0kf4.webm" data-background-video-loop="loop" data-background-video-muted="muted">  -->

# The "factory" service and the "service" service

---

<!-- .slide: data-background-video="https://flixels.s3.amazonaws.com/flixel/yspx80siki750atpmftg.webm" data-background-video-loop="loop" data-background-video-muted="muted">  -->

## What's the difference between a "factory" service and a "service" service?

---

### The end result of a factory and service is the same:
A singleton instance that can be used throughout your application.

#### The main difference between a "factory" service and a "service" service comes down to how they are defined.

---

## The "factory" service

---

Using the factory API, you pass in a function that returns an object.

Behind the scenes, Angular calls the function and sets the returned object as the singleton instance that will be injected into your controllers.

```js
angular
  .module("learnServices", [])
  .factory('personFactory', personFactory);

  function personFactory(){
    return {
      name: "CJ",
      job: "Instructor",
      sayHi: function(){
        return "Sup"
      }
    }
  }
```

---

# I DO

* Refactor Camera Shop to use a "factory" service

---

### Exercise: Create a "factory" service

10 minutes

Refactor your Reddit Clone or Camera Shop to use a "factory" service
* Give the service a method `getPosts` or `getCameras`
* Return the JSON array
* Inject the service into your controller
* Call the `getPosts` or `getCameras` method and set the resulting array as a property on `$scope`

---

## The "service" service

---

Using the service API, you create a constructor function using the this syntax to attach properties/methods to the constructor.

Behind the scenes, Angular calls new on your function to create an instance. This instance is set as the singleton instance that will be injected into your controllers. For this reason, if you're using ES2015, use Class syntax to define a "service" service.

```js
angular
  .module("learnServices")
  .service('personService', personService);

  function personService(){
    this.name = "Chris";
    this.job = "Lead Instructor";
    this.sayHi = function(){
      return "Yo"
    }
  }
```

---

# Provider

A provider is the most complex method and is used less frequently. It is a factory that can be configured before the application starts, which allows for more flexibility, but for the applications we are going to build, you will not need this level of complexity.

---

# I DO

Compare a todoService with factory and service.

---

# Injecting a service

Add your service name as a parameter to your controller function.

```js
angular
  .module("learnServices")
  .controller('personController', personController);

  function personController(personFactory){
    // I now have access to all the methods/properties returned from the personFactory!
  }
```

---

# When to use wat

* Use a "factory" service if you want to specify the type of thing to be set as the singleton instance
 * All of our factory examples set an object as the singleton instance
* Use a "service" service if you define your service as a type/class.

---

# I DO

* Create a UI to add items to an order
* Write a service that calculates the total of the order including tax, tip and a service charge of 10%.

---

# Review

---

## What is a singleton?

---

## What is an Angular service?

---

## Name 1 reason to use a service.

---

## What is 1 difference between a "factory" service and a "service" service?

---

## When would you use a "factory" service rather than a "service" service?

---

## When would you use a "service" service rather than a "factory" service?

---

# Review

---


<!-- .slide: data-background-video="https://flixels.s3.amazonaws.com/flixel/toqcai3t7pw8533e0gnv.webm" data-background-video-loop="loop" data-background-video-muted="muted">  -->

# Objectives

* Define and Describe a Singleton
* Define and Describe AngularJS Services
* Compare and contrast a "factory" service and "service" service
* Articulate when to use a "factory" service or a "service" service

---

# Resources

* [AngularJS Developer Guide](https://docs.angularjs.org/guide/services)
* [Factory API](https://docs.angularjs.org/api/auto/service/$provide#factory)
* [Service API](https://docs.angularjs.org/api/auto/service/$provide#service)
* [ng-newsletter: The short guide to service definitions](http://www.ng-newsletter.com/25-days-of-angular/day-1)
