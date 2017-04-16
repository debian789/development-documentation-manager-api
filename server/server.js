import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { createServer } from 'http'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { printSchema } from 'graphql/utilities/schemaPrinter'
import { subscriptionManager } from './graphql/subscriptions'
//import schema from './graphql/schema/schema'
import schema from './graphql'
console.log(schema)
import mongoose from 'mongoose'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import routes from './routers/index'
import api from './routers/api'
import passport from 'passport'
//import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'

// Connect mongo database
mongoose.connect('mongodb://localhost/graphql')

const GRAPHQL_PORT = 8081
const WS_PORT = 8091
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

// app.use(express.static(staticPath))
app.use(compression())
app.use(passport.initialize())


app.use('/', routes)
app.use('/api', api)

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  context: {},
}))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}))

// graphQLServer.get("/", graphiqlExpress({ endpointURL: '/graphql'}));

app.use('/schema', (req, res) => {
  res.set('Content-Type', 'text/plain')
  res.send(printSchema(schema))
})

app.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
  )
)

// WebSocket server for subscriptions
const websocketServer = createServer((request, response) => {
  response.writeHead(404)
  response.end()
})

websocketServer.listen(WS_PORT, () => console.log( // eslint-disable-line no-console
  `Websocket Server is now running on http://localhost:${WS_PORT}`
  )
)

// eslint-disable-next-line
/*new SubscriptionServer(
 { subscriptionManager },
 websocketServer
 );*/








// const path = require('path')

// const auth = require("server/config/auth")

// mongoose.connect('mongodb://localhost/mydb')
//const appFunc = function (staticPath) {
// staticPath = staticPath || path.join(__dirname, 'public')
// view engine setup
//const app = express()


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
//  return app
//}
// module.exports = appFunc
