### Dependency Injection [DI](https://docs.angularjs.org/guide/di):
- Any reference to code you didn't define
  - passing in the data from another place
- Separation of code/ functionality
- Code is easy to extend without modification
  - (able to add an item/ data without needing to update the main functionality)

#### 3 ways to pass info in [Dependency Annotation](https://docs.angularjs.org/guide/di)
- ##### implicit (DON'T USE IF YOU PLAN ON MINIFYING):
  - assumes that the function parameter names(aka Dependency names) are the names of the dependencies
  - if you minify it will shrink the necessary dependency names (losing the link to said dependency because it was not put into a string)
- ##### inline:
  - an array of (dependancies) as strings passed to controller
- ##### inject (preferred):
  - use $inject on the controller to add dependancies


---
STOLEN FROM LEARN ARTICLE

---

###  (2x)Ways to reference dependencies (***Hard-Code & Passing-in***)
  There are 2 main ways your code can reference other code:

- ##### 1.)  
  - You can ***hard-code*** the thing you want
(basically by referencing global variables):
```js
  function controller() {
    const vm = this
    new ArticleService().findAll().then(articles => {
      vm.articles = articles
    })
  }
```

- ##### 2.)  
  - You can ***pass-in*** the thing you want:
```js
controller.$inject = ['articleService']
  function controller(articleService) {
    const vm = this
    articleService.findAll().then(articles => {
      vm.articles = articles
    })
  }
```

##### In 1.) (hard-coding)
- Your code is very rigid. For example if you wanted the following code to write to a file instead of console.loging the results, how would you do it?
```js
function doStuff() {
  let data = fs.readFileSync('data.txt')
  let parsed = new CSVParser().parse(data)
  console.log(parsed)
}
```
- Consider what would happen if you rewrote your code like this:
```js
function doStuff(writer) {
  let data = fs.readFileSync('data.txt')
  let parsed = new CSVParser().parse(data)
  writer.write(parsed)
}
```
- See how writer is defined as a parameter? Now you could do this:

```js
const consoleWriter = {
  write: (message) => { console.log(message) }
}

class FileWriter {
  constructor(path) {this.path = path}
  write(message) { fs.writeFileSync(message, this.path) }
}

doStuff(consoleWriter)
doStuff(new FileWriter('output.txt'))
doStuff(new FileWriter('parsed.txt'))
```

All of a sudden your code becomes easy to extend without having to modify it.

---

#### Overcoming drawbacks to injecting dependencies
- One drawback to injecting dependencies is:
  - now everyone who calls your code needs to pass extra arguments in, which can get cumbersome.
- That's why frameworks like Angular have builtin support for injecting dependencies. For example: In Angular 1, once you've declared the name of the thing you want, Angular will find it and hand it to you.

```js
controller.$inject = ['articleService']
function controller(articleService) {
  const vm = this
  articleService.findAll().then(articles => {
    vm.articles = articles
  })
}
```

  ##### Sequence of events:
  - Angular sees that your controller is about to load
  - Angular sees that your controller would like something named articleService
  - Angular finds something called articleService
  - If it already has an instance of articleService it reuses it
  - If it doesn't have one, it'll set it up
  - Angular calls your controller function and passes in the articleService that it found

---

##### Putting things into the dependency injector:
- Define a service for the DI:

``` js
(function() {
  'use strict';

  app.module('app')
    .service('articleService', articleService)

  function articleService() {
    this.findAll = function() {
      // do some hard work
    }
  }
```

---

##### NOTE: Angular 1 has a number of types of things it can inject ( providers, services, factories, constants and values)

### Getting things out of the dependency injector:
Make sure your function is a named function, not an inline function:
```js
// do this....
(function() {
  'use strict';

  app.component('myComponent', {
    controller: controller
  })

  function controller(){

  }
}())

// don't do this....
app.component('myComponent', {
  controller: function(){}
})
```
- Declare what you are injecting with $inject
```js
  controller.$inject = ['$http']
  function controller(){

  }
```
- Add the dependencies as parameters
```js
  controller.$inject = ['$http']
  function controller($http){

  }
```

The _order_ is very important, and they **must** match.

#### Guideline:
- The parameter names should match the name of the injected dependencies.
So if you ```$inject = ['foo', 'bar']```, your parameters should be function ```controller(foo, bar) {}```
### PAY ATTENTION TO ORDER!
