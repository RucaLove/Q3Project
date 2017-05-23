const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

if (process.env.NODE_ENV !== 'test') {
  const logger = require('morgan')
  app.use(logger('dev'))
}

app.use(bodyParser.json())
// GETS RID OF NEED FOR NODE_MODULES PATH
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, '/../', 'node_modules')))

// DAS ROUTES
app.use('/api/posts', require('./routes/posts'))
app.use('/api/posts', require('./routes/comments'))

// SERVING 'index.html'
app.use('*', function(req, res, next) {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')})
})

app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  console.log(err)
  res.status(err.status || 500)
  res.json(err)
})

module.exports = app
