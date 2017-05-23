## Router [UI-Router](https://ui-router.github.io/)
- ngRouter sucks, so use ui.router

- PROS (in relation to Single Page Application):
  - Adds routes to '/' at end of url
    - allows you to save links, bookmark specific "states" of the page
  - allows creation of parent-child templates(Multiple views on one page)
---

#### TO USE (INSTALL):

- ```npm install --save angular-ui-router```
- Include the script tag from node modules(after angular script tag has been included)

##### SET-UP:
- INSIDE CONFIGURATION FILE CALLED: **app.config.js**

``` js
(function() {
  'use strict';

  // DEFINING DEPENDENCY 'ui.router'
  angular.module("app", ["ui.router"])

    // SPECIFYING CONFIG FUNCTION BELOW
    .config(config)
    .run(function($rootScope) {
      $rootScope.$on("$stateChangeError", console.log.bind(console));
    });

  // DEPENDENCY INJECTION INTO CONFIG
  config.$inject = ['$stateProvider', '$locationProvider']

  // HERE IS THE CONFIG FUNCTION
  function config($stateProvider, $locationProvider){
    $locationProvider.html5Mode(true)

  // DEFINING ADDITIONAL STATES FOR YOUR Single-Page-Application
    $stateProvider
    .state({
      name: 'index',
      url: '/',
      component: 'home'
    })

    // SECOND STATE TO BE RENDERED WHEN CLIENT SPECIFIES(clicks link in this case)
    .state({
      name: 'otherLinkName',
      url: 'otherLinkName',
      component: 'otherLinkName'
    })
  }

}());
```

IN YOUR ACTUAL COMPONENT FILE : **home.component.js**
```js
(function() {
  'use strict';

  angular.module("app")
    // LINKS TO YOUR STATE COMPONENT NAME ('otherLinkName') in this case
    .component('home', {
      template:  `
        <div class="inner">
          <h3>This is from the component</h3>
          {{$ctrl.greeting}}
        <a ui-sref="otherLinkName"> go to otherLinkName</a>
        </div>
      `,
      controller: controller
    })

    function controller() {
      this.greeting = 'hello';
    }

}());
```

IN YOUR ACTUAL COMPONENT FILE : **otherLinkName.component.js**
```js
(function() {
  'use strict';

  angular.module("app")
    // LINKS TO YOUR STATE COMPONENT NAME ('otherLinkName') in this case
    .component('otherLinkName', {
      // LINKING THIS BAD BOY UP TO A NEW VIEW IF THEY CLICK THE BUTTON
      templateUrl:'/templates/otherLinkName.template.html' ,
      controller: controller
    })

    function controller() {
      this.greeting = 'thanks for coming to my new page dude.';
    }

}());
```

- INSIDE THE MAIN: **index.html**:
- Once you turn on html5Mode(in app.config.js), you need to tell Angular where the ui-router routes should begin.
  - You do this by adding a ```<base>``` tag to the ```<head>``` of your index.html file:

```html
<!DOCTYPE html>
<html ng-app="app">
<head>
  <meta charset="UTF-8">
  <title>Component App</title>
<!-- HERE IT TELLS THE ROUTER WHAT PAGE(VIEW, TEMPLATE/ WHATEVER) TO RENDER FOR HOME -->
  <base href="/" />
  <style media="screen">
    div.outer {
      margin: 1em;
      padding: 1em;
      border: 1px solid #efefef;
    }

    div.inner {
      padding: 1em;
      background: #efefef;
    }
  </style>
</head>
<body>

  <div class="outer">
    <h1>This div is in index.html</h1>
    <ui-view></ui-view>
  </div>

  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.0/angular.min.js"></script>
  <script src="/node_modules/angular-ui-router/release/angular-ui-router.min.js"></script>
  <script src="/app.config.js"></script>
  <script src="/app.component.js"></script>
</body>
</html>
```


---

LEARN ARTICLE HOW TO:

- ##### To use hash-style URLs (#!/people1):
- Include the script tag
- Register the module
- Define a route
- Add ```<ui-view>``` to your HTML file

- ##### To use clean URLs (/people/1) :
- Include the script tag
- Register the module
- Define a route
- Add ```<ui-view>``` to your HTML file
- Add the ```<base>``` tag to your HTML file
- Turn on html5Mode


#### [URL-Routing STUFF](https://github.com/angular-ui/ui-router/wiki/URL-Routing)


### Changing State
- As a developer on an app with routes, you'll do one of three things regularly:

- Define routes (or "states", as ui-router calls them)
- Link to routes via <a ui-sref="..."></a>
- Redirect to routes in a controller
- Define routes
Example:
```js
function config($stateProvider, $urlRouterProvider, $locationProvider){
  $stateProvider
    .state({
      name: 'home',
      url: '/',
      component: 'app',
    })
}
```

- When you define a route, you are telling ui-router that
- when someone goes to the given URL
- then replace <ui-view> with the specified component

##### Link to a route
- In order to create a link to a route, you use the ```ui-sref``` attribute.
```js
$stateProvider
  .state({ name: 'orders', url: '/my-orders', component: 'orders' })
  .state({ name: 'cart', url: '/my-cart', component: 'cart' })
```
- Assuming you had the routes above, if you wanted to create a link to the cart component you would write:
```html
<a ui-sref="cart">My Cart</a>
```
##### REMEMBER: the value of the ```ui-sref``` attribute must match the value of the state's ```name``` attribute

- Navigate to a route
In many cases you'll need to do something like process a form, make some HTTP calls then redirect a user to another state.
You can easily do this with ```$state.go()``` in a ```controller```, like so:

```js
controller.$inject = ['$state']

function controller($state) {
  const vm = this

  vm.navigate = function (e) {
    e.preventDefault()
    $state.go('home')
  }
}
```
