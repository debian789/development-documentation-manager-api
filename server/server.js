'use strict'
var http = require('http')
var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var expressSesion = require('express-session')
// var mongooseConfig = require('server/config/mongooseConfig')
var passport = require('passport')
var auth  = require('server/config/auth')
// var Strategy = require('passport-local')
var path = require('path')
var expressSession = require('express-session')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

// var UserSchema = require('server/models/UserSchema')
// var routerCode = require('server/routers/routerCode')
var api = require('server/routers/api')
//const MongoStore = require('connect-mongo')(expressSession)

var appFunc = function(staticPath) {
  // const LocalStrategy = Strategy
  const app = express()
  const port = process.env.PORT || 3000

  // Manejo de archivos estaticos
  app.use(require('stylus').middleware(path.join(__dirname, 'public')))
  app.use(express.static('public'))

  // Middleware para el manejo de datos del formulario
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())

  app.use(cookieParser())

  app.use(expressSesion({
    secret: 'estoEsSecretoXD',
    resave: false,
    saveUninitialized: false
    //,
    //store: new MongoStore({url: process.env.DB_Connection ? process.env.DB_Connection : 'mongodb://localhost/librarycheatcode'})
  }))

  app.use(passport.initialize())
  // app.use(passport.session())

  // Configuracion para la implementacion de autenticacion
  // passport.use(new LocalStrategy(UserSchema.authenticate()))
  // passport.serializeUser(UserSchema.serializeUser())
  // passport.deserializeUser(UserSchema.deserializeUser())

  // Configuracion de ruta de las vistas
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'hjs')

  app.use('/api', api)
  const server = http.createServer(app)

  server.listen(port)
  console.log(`server iniciado en el puerto: ${port}`)
  return app
}



module.exports = appFunc
