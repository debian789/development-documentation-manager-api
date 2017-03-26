const express = require('express')
// const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const compression = require('compression')
const routes = require('server/routers/index')
const api = require('server/routers/api')
const passport = require('passport')
const cors = require('cors')

// const auth = require("server/config/auth")

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mydb')
const appFunc = function (staticPath) {
  // staticPath = staticPath || path.join(__dirname, 'public')
  // view engine setup
  const app = express()

  app.use(cors())
  app.set('view engine', 'jade')

  // uncomment after placing your favicon in /public
  // app.use(favicon(__dirname + '/public/favicon.ico'))
  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use(cookieParser())
  app.use(express.static('public'))

  // app.use(express.static(staticPath))
  app.use(compression())
  app.use(passport.initialize())
  app.use('/', routes)
  app.use('/api', api)

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // error handlers
  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500)
      res.send(err)
    })
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.send(err)
  })

  return app
}
module.exports = appFunc
