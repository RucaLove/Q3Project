# Craigs lecture

[GO HERE READ THIS](https://learn.galvanize.com/content/gSchool/angular-curriculum/master/40%20-%20Deploying/45%20-%20Migrating%20from%20Express%20Generator.md)

Understand request/ response handling in a crud app with angular as the client side and node/express as the server side.

pirates_app:

- Separated all folders by Client-side & Sever-Side
- all app.js stuff in one file
- all components.js in one file
- all controllers.js in one file
- all services.js in one file



- resolve sets variable in **controller.js**

File: **/client/javascripts/controllers.js**

```javascript
  .when('/pirates', {
  templateUrl: '../views/pirates/index.html',
  controller: 'PiratesController',
  controllerAs: 'vm',
  // In controller pirates is now set to getAllPirates
  resolve: {
    pirates: getAllPirates
  }
  })
```

File: **/client/javascripts/components.js**

```javascript
.component('gsPirateShow', {
  bindings: {
    pirate: '<'
  }
```

- ```'<'``` = one way binding

- ng-model = two way bound
- one way bould so it wont change the internal state
File: **/views/pirates/index.html**

```html
<gs-pirate-show ng-repeat="pirate in vm.pirates" pirate="pirate"></gs-pirate-show>
```

orange pirate is bound pirate
green pirate in quotes is pirate in controller is the same one in the ng-repeat

- Setting pirates to getAllPirates (service)

- Injects that into the pirates controller

-

### Best way to organize file structure:
by components

- (SIDE NOTE) ngRouter: looks pretty sick

DIAGRAM ADD-PIRATE

- Where are server request, response?:
  - Request:
    is on Controller function: vm.addPirate(vm.pirate)
    PirateService.createPirate(newPirate)
  - Response:
    is handled by /server/routes/pirates.js .post( ...... Function(pirate) {
    res.send(pirate);
- Where is data binding occurring?:
  - /client/views/index.html
  - /client/views/new.html

- where is JSON being transfers in either direction
  - Request from angular to router.post
  - Response from knex to piratesController because it is being sent back to /pirates



















-
