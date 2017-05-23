

## HTTP Service
Making an AJAX call in your controller involves 4 steps:

Inject the $http service by:
- Adding ```controller.$inject = ['$http']```
- Define an ```$http``` parameter in the controller
- Make the call to ```$http.get```, ````$http.post```` etc...
- Pass a function to ```.then``` which receives a response
- Get the ```response.data``` and set properties on the controller ```vm```
##### Example:

```js
(function() {
  'use strict';

  angular.module('app')
    .component('app', {
      controller: controller,
      template: `
        <div ng-repeat="thing in $ctrl.things">
          {{thing}}
        </div>
      `
    })

  controller.$inject = ['$http']
  function controller($http) {
    const vm = this

    vm.$onInit = function () {
      $http.get('/things.json').then(function (response) {
        vm.things = response.data
      })
    }
  }

}());
```
---
### Loading data
##### It's common to load data inside of ```$onInit```
Alter data on the server
```js
$http.post
$http.put
$http.patch
$http.delete
```

---

#### [$http](https://docs.angularjs.org/api/ng/service/$http):
- Similar to jQuery Ajax (used to make requests to a server)
- The $http service is a core AngularJS service that facilitates communication with the remote HTTP servers via the browser's XMLHttpRequest object or via JSONP.
---
