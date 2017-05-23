
### Angular 1.6
---
### notes

- Controller:
  - Set up the initial state of the $scope object.
  - Add behavior to the $scope object.

-  Template:
  - These are the types of AngularJS elements and attributes you can use:
  -  Directive — An attribute or element that augments an existing DOM element or represents a reusable DOM component.
  -  Markup — The double curly brace notation {{ }} to bind expressions to elements is built-in AngularJS markup.
  -  Filter — Formats data for display.
  -  Form controls — Validates user input.

- Component

---

### NOTES 02-unit overview

- [Angular examples](https://github.com/gSchool/angular-examples)
  - This repo contains a number of reference applications. While you could look at them online, you may want to run them locally and play around with them, so take a moment and get these examples setup now.

- [Angular Drills](https://github.com/gSchool/angular-drills)
  - Fork and clone ^
  - Add the upstream:
   ```sh
  git remote add upstream git@github.com:gSchool/angular-drills.git
  ```
  - Some lessons will ask you to complete challenges from this repo.
  - For every challenge, do the following:
```sh
    git checkout master
    git fetch upstream
    git rebase upstream/master
    git checkout -b challenge-name
    git push -u origin challenge-name
```
- After you complete a challenge, run the tests to make sure they pass, then ```git push``` your code.

---
### Your First APP

#### What is Angular?
##### Angular is:
- It works with the long-established technologies of the web (HTML, CSS, and JavaScript) to make the development of web apps easier and faster than ever before.

- Client side libraries(angular) help us deal with larger, more complex code bases on the client-side.
- They also redefined the roles of the client and server, resulting in a new application structure called a **Single-Page Application (or SPA)**.
  - In this new structure, the client interacts with the server by making RESTful AJAX requests that are triggered by user interactions.


### Adding angular:
 - Need to CDN that bad boy _(LOOK INTO HOW TO LOAD FROM NPM)_ :
```html
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.0/angular.js"></script>
```

#### ng-app:
 - goes in ```<html> ``` element  (EXAMPLE: ```<html ng-app="app">``` ) to tell it everything inside the html will get rendered through the Angular interpreter
  - _wtf a angular interpreter is ???_

---

#### Expressions:
- In Angular, whenever you write double curlies ```{{}}``` Angular will interpolate the result. The thing that goes inside the curlies is an Angular expression.
- Notice the following snippet:

  ```html
  <title>{{ greeting }} World</title>
  ```
- That basically declares:
"Whenever the variable ```greeting``` changes, update the innerHTML of the ```<title>``` to match"

- Now notice the following snippet:

```html
<p>Say something to the world <input type="text" ng-model="greeting" ng-init="greeting='Hello, '"></p>
```
That basically declares two things:
When the page loads(```ng-init```), set the ```greeting``` variable to ```"Hello, "```

Whenever a user changes the value of the input, set the variable ```greeting``` to be whatever they typed (```ng-model```)

---

#### [Data-binding](https://docs.angularjs.org/guide/databinding)
- This concept is called data-binding. Data-binding describes the concept that:

  - DOM (like the ```<title>```) changes in response to changes to the underlying data (the ```greeting``` variable)
- Certain actions (like a user typing into the ```<input>```) can change the underlying data


##### STOLEN INFO FROM THE ACTUAL ANGULAR DOCS
- Data-binding in AngularJS apps is the automatic synchronization of data between the model and view components.
- The way that AngularJS implements data-binding lets you treat the model as the single-source-of-truth in your application.
- The view is a projection of the model at all times.
- When the model changes, the view reflects the change, and vice versa.

---


### $onInit should never hold a promise
- Life cycle events should have the $onInit load no mater what instead of sitting in a pending state.
- create an empty object and pass it
