Service notes 5 10 2017
# Services and Constructors
##### Look into [Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

---

# Constructors

### Creating a Constructor with: new
- Example:
```js
new FunctionName()
```


- DavidA is a Constructor
- Constructors are a type of function
- normally called functions are not constructors unless created with new

```js
function DavidA() {
  let that = { }
  that.saySpeciesName = saySpeciesName
function saySpeciesName() {
  console.log('NarWhal');
}
  return that
}
let nature = DavidA()
nature.saySpeciesName()
```
---

### WIth the [New](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new) operator && (scope of ```this.```)

``` js
function DavidA() {
  this.species = 'Canine'
  this.saySpeciesName = saySpeciesName
  function saySpeciesName() {
    console.log(species);
  }
}
let x = () => 5
let nature = new DavidA()
nature.saySpeciesName()
```
---

``` js

function DavidA() {
  this.species = 'Canine'
  this.saySpeciesName = saySpeciesName
  function saySpeciesName() {
    console.log(species);
  }
}
// Return is not needed w/ Fat-Arrow inline syntax
let x = () => 5
//
let nature = new DavidA()
// nature.saySpeciesName()
DavidA.prototype.sayNetwork = function() {
  return 'BBC'
};
console.log(nature.sayNetwork());
```

---

#### Creating a Constructor with new and using this.


``` js
function Animal(species, canFly) {
  this.species = species
  this.canFly = canFly

  this.describe = function() {
    return `${species} ${canFly? 'can fly': 'sadly trapped on ground'}`

  }
}
let a = new Animal('snake', false)
console.log(a.describe());
```

---

#### USING ```.apply```

``` js
function emily() {
  return `emily says ${this.word}`
}

let that = {word: 'Yay'}

// functions have functions that you can call on them .apply in this case
console.log(emily.apply(that));

// MORE ON APPLY this. === the fuction, we are applying .apply on the functuon to add in a parameter / argument
// this.apply() === emily.appy()
```

---

#### MDN [call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) && MDN [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

```js
function emily(food, moreFood) {
  return `emily says ${this.word} ${food} and ${moreFood}`
}
let that = {word: 'Yay'}
// functions have functions that you can call on them .call
console.log(emily.call(that)); // emily says Yay undefined and undefined

let emilyEnhanced = emily.bind(that)
console.log(emilyEnhanced('chocolate', 'food'));  //emily says Yay chocolate and food
```
Alicia's Example:
```js
function emily(food, moreFood) {
  return `Emily says ${this.word} ${food} and ${moreFood}`
}

let self = {word: 'Yay'}
console.log(emily.apply(self, ['chocolate', 'cheese'])) // Emily says Yay chocolate and cheese
console.log(emily.call(self, 'chocolate', 'cheese')) //Emily says Yay chocolate and cheese
console.log(emily('chocolate'))  // Emily says undefined chocolate and undefined

let emilyEnhanced = emily.bind(self)
console.log(emilyEnhanced('chocolate', 'cheese')) // Emily says Yay chocolate and cheese

```

---
