import express from 'express'
const router = express.Router()

router.get('/', function (req, res) {
  res.send('root for the API')
})

import users from 'server/routers/users'
import commandsPublicRouter from 'server/routers/commandsPublicRouter'
import commandsPrivateRouter from 'server/routers/commandsPrivateRouter'
import sessions from 'server/routers/sessions'

/* Used as meta-router */
router.use('/users', users)
router.use('/command-public', commandsPublicRouter)
router.use('/command-private', commandsPrivateRouter)
router.use('/sessions', sessions)

export default router
