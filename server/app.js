import express from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import compression from 'compression'
import routes from './routers/index'
import api from './routers/api'
import passport from 'passport'
import cors from 'cors'
import mongoose from 'mongoose'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';

// const path = require('path')

// const auth = require("server/config/auth")

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
