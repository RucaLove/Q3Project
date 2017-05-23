# Migrating from Express Generator to an SPA Structure

## Objectives

By the end of this lesson you will:

1.  Convert an Express-generated application to a structure suitable to an SPA
2.  Setup a wildcard route on the server

## Rationale

The Express generator gives you a ton of useful defaults such as:

*   separating the `app.js` file from the `bin/www` so it's easier to use `app.js`
*   providing some sensible middleware such as `morgan` for logging and `bodyParser` for parsing JSON requests
*   some sensible error handlers

The issue is that only _some_ of those defaults are sensible for single-page-applications (SPAs).

But it's enough that you'll still probably want to start from the generator and restructure, rather than learn all the boilerplate so early in your career.

Or maybe you have an existing application that was generated, which you'd like to convert to a more suitable format.

Sadly, it's about as many steps to modify the generated app as it is to just create it from scratch, so pick your poison ☠️ 😵

### 1 - Setup a folder structure

By default when you generate an express app with the generator, you get a file structure like this:

    my-app
    ├── app.js            <-- #1
    ├── bin
    │   └── www
    ├── package.json
    ├── public            <-- #2
    │   ├── images
    │   ├── javascripts
    │   └── stylesheets
    ├── routes
    │   ├── index.js
    │   └── users.js
    └── views             <-- #3
        ├── error.jade
        ├── index.jade
        └── layout.jade

Notice 3 things about this structure:

1.  There is a top level `app.js`, which is a _little_ confusing because your Angular / React app could theoretically also be called `app.js` (although hopefully it's something like `app.module.js`, `app.component.js` etc..)
2.  Your client-side code is buried several levels deep in `public/javascript/**/**.js`, which makes your client-side app seem a bit like a second-class citizen
3.  There is a views directory that you won't be using at all

One higher-level issue with this structure is that it's not intention-revealing. That is, it doesn't _look_ like a single-page application.

### Create client / server directories

First, you'll want to make a few modifications:

    express my-app && cd $_
    mkdir server
    mv bin routes app.js server
    rm -rf views
    mv public client

Your app structure will now look like this:

    my-app
    ├── client
    │   ├── images
    │   ├── javascripts
    │   └── stylesheets
    │       └── style.css
    ├── package.json
    └── server
        ├── app.js
        ├── bin
        │   └── www
        └── routes
            ├── index.js
            └── users.js

That's a great start.

### Setup the client

First make sure there's a `client/index.html`

    touch client/index.html

Then put your client-side application in there.

### Pare down `server/app.js`

Your generated app.js file has a lot of cruft that you don't need:

    var express = require('express');
    var path = require('path');
    var favicon = require('serve-favicon');                     // <--- #1
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');

    var index = require('./routes/index');
    var users = require('./routes/users');

    var app = express();

    app.set('views', path.join(__dirname, 'views'));            // <--- #2
    app.set('view engine', 'jade');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));        // <--- #3
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));    // <--- #4

    app.use('/', index);                                        
    app.use('/users', users); // <--- #6

    app.use(function(req, res, next) {                          // <--- #7
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    app.use(function(err, req, res, next) {
      res.locals.message = err.message;                         // <--- #8
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');                                      // <--- #9
    });

    module.exports = app;

1.  You can remove any line referencing a `favicon` - if you need one, put it in the `client` directory
2.  You can completely remove the view engine code, and also the related dependencies in `package.json`
3.  You almost certainly no longer need to parse url-encoded form data, so you can remove that
4.  You don't have a `public` directory anymore, so this will change to point to the `client` directory
5.  You'll want to mount all of your routes on the `/api` or `/api/v1` prefix
6.  You'll need to add a wildcard route to serve your `html5Mode` urls
7.  As you'll see below, you no longer need your `404` handler, since that will be a client-side concern now
8.  In the error function, you no longer need to set locals (since that's a view concern)
9.  In the error function, you should `res.json` instead of `res.render` (since `res.render` depends on a view engine)

Your final `app.js` might look like this:

    const express = require('express')
    const path = require('path')
    const logger = require('morgan')
    const cookieParser = require('cookie-parser')
    const bodyParser = require('body-parser')

    const index = require('./routes/index')
    const users = require('./routes/users')

    const app = express()

    app.use(logger('dev'))
    app.use(bodyParser.json())
    app.use(cookieParser())
    app.use(express.static(path.join(__dirname, '/../client')))   // <--- #1

    app.use('/api/v1', index)
    app.use('/api/v1', users)

    app.use('*', function (req, res) {                            // <--- #2
      res.sendFile('index.html', {
        root: path.join(__dirname, '/../client')
      })
    })

    app.use(function(err, req, res, next) {                       // <--- #3
      const response = { message: err.message }
      if (req.app.get('env') === 'development') {
        response.stack = err.stack
      }

      res.status(err.status || 500).json(response)
    })

    module.exports = app

1.  Set the `static` path to point to the `/client` directory (it used to be `/public`)
2.  Set up a wildcard route (see below for details)
3.  Set up an error handler that will provide you with useful debugging information in development

### Setup package.json

In `package.json` you'll need to update the `start` script to point to the new location of `bin/www`, like so:

    "scripts": {
      "start": "node ./server/bin/www"
    },

## #2 - The wildcard route

The wildcard route you added above looks like this:

    app.use('*', function (req, res) {
      res.sendFile('index.html', {
        root: path.join(__dirname, '/../client')
      })
    })

It maps _any_ request to render `index.html`.

When a user goes to your Angular app to a path like `/people/12/addresses`, then the following sequence of events needs to happen:

1.  The server receives an HTTP request for `/people/12/addresses`
2.  Express hands the request to `express.static`, looks in the `client` directory for a match and doesn't find it
3.  Express matches the path against `/api/v1` and doesn't find a match
4.  So Express falls through to the `*` route (the "wildcard" route)
5.  Express then renders `client/index.html`
6.  ---- This request/response cycle is done ----
7.  The _Browser_ receives `index.html`, and sees some css and JavaScript files linked
8.  The browser sends a new HTTP request for `/stylesheets/main.css` (or whatever)
9.  Express receives the HTTP request
10.  Express hands the request to `express.static` and finds a match, so it renders `/client/stylesheet/main.css`
11.  ---- This repeats for all static assets ----
12.  The browser loads the JS files, boots Angular, ui-router inspects `/people/12/addresses` and updates to DOM

![](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgU1BBIFJvdXRpbmcKCkJyb3dzZXItPkV4cHJlc3M6IEdFVCAvcGVvcGxlLzEyL2FkZHJlc3NlcwoAGwctPlN0YXRpYzogbWF0Y2gAFxU_CgAeBgBMC25vcGUAOQpBUEkAgH8FZXMAKR4AHgoAMhlXaWxkY2FyZDoKAAIIAIFCC3NlbmRGaWxlIGNsaWVudC9pbmRleC5odG1sAIFFCgCBfAc6IDxodG1sPgCBexhqcy9hcHAvYXBwLm1vZHVsZS5qAIF6GgAZFACCAhN5dXAAdRNzZW5kAFkXbm90ZSBsZWZ0IG9mIACBMQgKICAgIG5vdyB1aS1yb3V0ZXIgdGFrZXMgb3ZlcgAYBWFuZCBtYXBzIAAmBQCDSRUgICAgdG8gYSBzdGF0ZSwgYW5kAFMFdXBkYXRlcyB0aGUgRE9NCmVuZCBub3RlCg&s=default)

_Phew!_ 🎉

NOTE: it's important that your wildcard route go _below_ your API routes. Otherwise the `*` route will match any other route.

## Stretch It

There are a lot of nuances that aren't well-covered here. For example, what happens if you make a request to `/api/v1/some-non-existant-route`? Or what if you make an `OPTIONS` or `POST` request to a non-existant route?

In those cases it's better to render a 404\. After you have your fullstack SPA app working, update it such that:

*   Asking for non-existent `/api/v1/*` routes renders a 404 JSON response
*   Making non-get requests does not render the `index.html` file

## Resources

    title SPA Routing

    Browser->Express: GET /people/12/addresses
    Express->Static: match /people/12/addresses?
    Static->Express: nope
    Express->API Routes: match /people/12/addresses?
    API Routes->Express: nope
    Express->Wildcard:
    Wildcard->Express: sendFile client/index.html
    Express->Browser: <html>
    Browser->Express: GET /js/app/app.module.js
    Express->Static: match /js/app/app.module.js?
    Static->Express: yup
    Express->Browser: send /js/app/app.module.js
    note left of Browser:
        now ui-router takes over
        and maps
        /people/12/addresses
        to a state, and
        updates the DOM
    end note
