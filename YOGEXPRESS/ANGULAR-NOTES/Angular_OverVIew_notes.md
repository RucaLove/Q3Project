Separation on concerns

Database | Backend | Fontend

Database: persists the data(psql)

Backend: Creates an api Authentication  & Authorization (js/node)

Front end: Manipulates the DOM (AngularJS etc)

---

### SINGLE PAGE APPS:

Move the Ui code to the front end into its own app.
- Can distribute front end code on a fastest via CDN
- Faster than serving files locally
- Separation of concerns

- Running all in the browser makes a more responsive experience for the UI
- Manipulate the DOM(Views)

Communicates with the backends using APIs
- Common JSON data type

---

### Angular FrameWorks(& others):

##### AngularJS < 1.6:
- Used in many apps Currently the most popular.

##### AngularJS 1.6:
- Best of both worlds
- Able to use both controller/template and component system.

##### Angular 2, Angular4:
- component based system

##### React / Vue:
- component based systems

---

### Data Binding

- IDEA BEHIND VIEW IS TO GET SOMETHING TO AND FROM THE USER
COMPONENT DIAGRAM


vm = view model
```javascript
CONTROLLER_file.js
STATE == stuff to get transferred to the VIEW
vm.alpha
vm.beta
vm.omega

// behavior
vm.submitAwesome
```
$ctrl = controller
```html
VIEW_file.html

<p>{{$ctrl.alpha}}</p>
<p>{{$ctrl.beta}}</p>
<p>{{$ctrl.omega}}</p>
<form ng-submit>
```
---
#### START ALL ANGULAR SOURCE FILES WITH AN IMMEDIATELY INVOKED FUNCTION

```html
<html ng-app="app">
```
- ng-: is the name for attributes that do Angular things

- ng-app: tells angular to take over the DOM at that point

- "app": tells angular to use the module "app" as the app

---

$q = Promise

Set state on a controller via form fields

Access state on a controller via expressions

---
