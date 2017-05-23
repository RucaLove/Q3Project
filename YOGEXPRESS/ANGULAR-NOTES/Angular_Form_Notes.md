## Forms


##### Output form value as an object:
- User inputs new value into form field(assigned to variable in ng-model)
  ```html
<input type="text" ng-model="$ctrl.variable.name">
```
---
#### ng-submit
- Submits entire form
- Angular must have a submit button for every form
```html
<form ng-submit="$ctrl.functionName()">
<input type="text" ng-model="$ctrl.variable"/>
<input type="submit">
</form>
```
---

#### ng-click:
- Invokes a function when happened.
```html
<button ng-click="$ctrl.functionName()">
```
---
#### Clearing a form
- call this function on a button
```javascript
functionName(){
delete this.object;
}
```
---
#### Default values in forms
- create a function to create form values
```javascript
functionName(){
this.variable = { key: value, key2: value2};
}
```
---
#### BEST PRACTICE
- Hold all values in an object
  - allows quick manipulation
- Never do DOM manipulation in the controller.
  - Assign data to objects / vars which you then reference from your template.markup with {{ variableName }}

**INSTEAD**
  -  write a directive for dom manipulation
  -  the directive should not have dependencies on other html blocks or scope’s parents objects
  -  the directive should not have any hard coded css selector

    To avoid dependency problems, pass the variable as a parameter.

     Directive should look  like this:
```html
    <div data-my-slide="showDetails"> details content goes here</div>
```
