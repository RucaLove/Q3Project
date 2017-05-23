## Integrating With Express.js

#### Where to put the Angular code?
- The client-side code should go in Folder: **/public** in your app.

---
#### How to serve index.html?
- In Angular (and other client-side frameworks) the client-side router needs to be able to read and manipulate the URL.
- This means that when you request http://example.com/people/4, Express needs to serve up File: **public/index.html** so that Angular can read and process the route.

- To enable this, you need to create a wildcard route that will take any request and return File: **index.html**:
```js
app.use('*', function(req, res, next) {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')})
})
```
- The key here is that this route needs to go beneath any API routes:
```js
app.use('/api/people', people)
app.use('/api/addresses', addresses)
// install wildcard route beneath other routes
app.use('*', function(req, res, next) {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')})
})
```
---

#### What about /node_modules?
- When using lite-server to serve things locally, you could just reference File: **/node_modules**. But in a typical Express setup, **node_modules** is not made public by default.
- You can easily change that by adding another express.static line, like so:
```js
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, '/../', 'node_modules')))
```
- Then in index.html you can just write:
```html
<script src="/angular/angular.min.js"></script>
<script src="/angular-ui-router/release/angular-ui-router.min.js"></script>
```
##### Notice how you don't need to reference **node_modules** at all anymore.

---

### Setting up browsersync
- In development you want to work on the API and the Angular app at the same time. Ideally:

- When you change server-side files, you reload the server
- When you change client-side files, browser sync auto-reloads the client-side without restarting the server
- You can achieve this by adding gulp, gulp-nodemon and browser-sync to your package.json, then adding the following file:

File: **/gulp.js**
```js
const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const nodemon = require('gulp-nodemon')

gulp.task('default', ['browser-sync'], function () {
})

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init({
    proxy: 'http://localhost:5000',
    files: ['public/**/*.*'],
    browser: 'google chrome',
    port: 7000,
        reloadDelay: 1000,
  })
})

gulp.task('nodemon', function (cb) {
  let started = false

  return nodemon({
    script: './app/bin/www',
    ignore: [
      'test/',
      'public/',
      'gulpfile.js',
      'node_modules/'
    ],
  }).on('start', function () {
    if (!started) {
            setTimeout(cb, 500)
      started = true
    }
  })
})
```

- Then you can add a start script like this to package.json:

```js
"scripts": {
  "dev": "gulp"
}
```

Then you can start your app in _development_ with ```npm run dev```

###### Obviously there are much more sophisticated build systems you can use, but this is an easy starter if you are just getting into single-page-application development.
