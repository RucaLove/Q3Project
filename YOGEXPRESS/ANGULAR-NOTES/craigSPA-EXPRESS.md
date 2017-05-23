
### CREATING SERVER SIDE SPA
(from express generator)
look at notes from: **/Users/christiantaggart/Desktop/Files/CODE PERSONAL/Software_Notes/Angular/GALVANIZE_Express-Generator_SPA-Creation_notes.md**
###### express --help (check into this/ look at the options)

(Deleting all un needed files, and lines  of code)
- Delete Public Folder/Directory
- Delete Views Folder/Directory
- Clean up(remove lines of un-needed code) File:**app.js**
- Configure CORS
- Configure BASE_URL in client side services.js:
##### [GULP](http://gulpjs.com/)
- USE GULP TO GO THROUGH(SEARCH AND REPLACE)
  - all instances of 'DOMAIN_GOES_HERE'

```js
const BASE_URL = `DOMAIN_GOES_HERE/api/pirates`
```

---

#### [CORS](https://www.npmjs.com/package/cors):
'CROSS ORIGIN RESOURCE SHARING'
- Server has set list of acceptable urls that it will serve data back to
- Sets in the headers in the request

TO INSTALL:
npm i cors

Require it in your app.js file:

#### Simple Usage (Enable All CORS Requests):
```js

var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
```

#### Enable CORS for a Single Route:
```js
var express = require('express')
var cors = require('cors')
var app = express()

app.get('/products/:id', cors(), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a Single Route'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
```

#### Configuring CORS:
```js
var express = require('express')
var cors = require('cors')
var app = express()

var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/products/:id', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for only example.com.'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
```
#### Configuring CORS w/ Dynamic Origin:
```js
var express = require('express')
var cors = require('cors')
var app = express()

var whitelist = ['http://example1.com', 'http://example2.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.get('/products/:id', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a whitelisted domain.'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
```
