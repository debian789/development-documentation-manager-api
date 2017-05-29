import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { createServer } from 'http'
import { printSchema } from 'graphql/utilities/schemaPrinter'
import schema from './graphql'
import mongoose from 'mongoose'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import routes from './routers/index'
import passport from 'passport'
import  { DATA_BASE, SERVER } from './common/constants'

// Connect mongo database
if (DATA_BASE.USER_DB && DATA_BASE.PASS_DB) {
  mongoose.connect(`mongodb://${DATA_BASE.USER_DB}:${DATA_BASE.PASS_DB}@${DATA_BASE.HOST_DB}:${DATA_BASE.PORT_DB}/${DATA_BASE.NAME_DB}`)
} else {
  mongoose.connect(`mongodb://${DATA_BASE.HOST_DB}:${DATA_BASE.PORT_DB}/${DATA_BASE.NAME_DB}`)
}

const GRAPHQL_PORT = SERVER.GRAPHQL_PORT
const WS_PORT = SERVER.WS_PORT
const app = express().use('*', cors())

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
app.use(compression())
app.use(passport.initialize())

app.use('/', routes)
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  context: {}
}))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}))

app.use('/schema', (req, res) => {
  res.set('Content-Type', 'text/plain')
  res.send(printSchema(schema))
})

app.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://${SERVER.HOST}:${GRAPHQL_PORT}/graphql`
  )
)

// WebSocket server for subscriptions
const websocketServer = createServer((request, response) => {
  response.writeHead(404)
  response.end()
})

websocketServer.listen(WS_PORT, () => console.log( // eslint-disable-line no-console
  `Websocket Server is now running on http://${SERVER.HOST}:${WS_PORT}`
  )
)

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

export default app
