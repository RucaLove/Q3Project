## Nested States
- Two things are necessary for nested states:

#### 1.) Indicate the nesting in the config
- Put a ```<ui-view></ui-view>``` in the parent component
There are several ways to indicate nesting in the ```config```, and here are two common ways:

- Using dot notation in state names:
If you have a ```state``` named ```people```, and another ```state``` named ```people.person```, then ```person``` will be nested inside of ```people```.

File: **config.js**
```js
function config($stateProvider, $urlRouterProvider, $locationProvider){
  $stateProvider
    .state({
      name: 'people',
      url: '/people',
      component: 'peopleComponent',
    })
    .state({
      name: 'people.person',
      url: '/:id',
      component: 'personComponent',
    })
}
```
File: **index.html**
```html
<ui-view></ui-view>
```
File: **people.template.html**
```html
<div>
  <h1>Here are some people</h1>
  <ul>
    <!-- list people here -->
  </ul>
  <h2>Your selected person</h2>
  <ui-view></ui-view>
</div>
```
File: **person.template.html**
```html
<p>I am a person</p>
```

---

#### 2.) Abstract States
Often times you want an outer app component, but you don't want to route to it.
So you can make the app component abstract, which means it doesn't have a url.

- Then you can use the parent property to indicate the nesting, like so:

File: **config.js**
```js
function config($stateProvider, $urlRouterProvider, $locationProvider){
  $stateProvider
    .state({
      name: 'app',
      abstract: true,
      component: 'app',
    })
    .state({
      name: 'people',
      url: '/people',
      parent: 'app',
      component: 'people',
    })
}
```
File: **index.html**
```html
<ui-view></ui-view>
```
File: **app.template.html**
```html
<div>
  <h1>I am the layout</h1>
  <ui-view></ui-view>
</div>
```
File: **people.template.html**
```html
List some people...
```
