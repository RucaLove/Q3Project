# [SERVICES](https://docs.angularjs.org/guide/services)

- Dependency Injection also known as inversion of control
- Explain how services keep your code DRY and allows you to separate business logic[backend (side of angular app that does something other than DOM/ View client sees) & front-end]

- Objects that know how to create injectable services are called providers

- before a service can be created.
- A provider must exist that knows how to create that service
- The .service() function
- use the .service() function on .module
- your service is a constructor function
- $inject any dependencies you need on your services
- create your methods and properties on this.


##### Clear URL tells Angular to work off a base url "/" and allows you to work off of a nice neat url vs using # in the anchor(link) tags in your html

Sets server.js to ```app.use('*', )``` Sends all incomeing urls to render index.html

```js
app.use("*", function (req, res, next) {
  res.sendFile("index.html", {root: path.join(__dirname, "public")})
})
```

- Services are invoked with ```new```
- ```this.``` Comes from the creation of a service
- Http calls return a promises (.success & fail)

FOLDER: wdi-ng-servies-comprehender

#### ANGULAR JS  public/ services / edit-distance.service.js

```js
(function () {
  angular
    .module("app")
    //Service declaired on .module ('serviceName',  new constructor) service in this case
    .service("editDistanceService", service)

  // $inject dependecies onto service
  service.$inject = ["$http", "$q"]

  // Constructor function to create service along with dependencies
  function service($http, $q) {
    this.submitEditDistance = submitEditDistance

    function submitEditDistance(word1, word2) {
      let req = {
        method: "POST",
        url: "/word/edit-distance",
        data: {
          sources: [word1, word2]
        }
      }

      return $http(req).then(success, fail)

      // ERROR HANDLING LAST FOR READABILITY
      function success(result) {
        return result.data.distance
      }
      function fail(err) {
        return $q.reject(err)
      }
    }
  }
})()

```

#### word-router.js file

```js
var express = require("express")
var router = express.Router()
var nlpHelpers = require("./nlp-helpers")

router.post("/sound-alike", function(req, res) {
  if (req.body.sources && Array.isArray(req.body.sources)) {
    //get javascript object back
    var result = nlpHelpers.soundexAndMetaphoneTests(req.body.sources)
    res.setHeader("Content-Type", "application/json")
    // SET HEADER TO JSON/ SEND JSON BACK
    res.send(JSON.stringify(result))
  } else {
    // IF ITS NOT JSON SEND AN ERROR
    res.sendStatus(400)
  }
})

router.post("/stemmer", function(req, res) {
  if (req.body.source && typeof req.body.source === "string") {
    var result = nlpHelpers.stemWordsInString(req.body.source)
    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify(result))
  } else {
    res.sendStatus(400)
  }
})

router.post("/edit-distance", function(req, res) {
  if (req.body.sources && Array.isArray(req.body.sources)) {
    var result = nlpHelpers.editDistance(req.body.sources)
    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify(result))
  } else {
    res.sendStatus(400)
  }
})

module.exports = router
```
