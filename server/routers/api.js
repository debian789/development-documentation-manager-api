import express from 'express'
const router = express.Router()

router.get('/', function (req, res) {
  res.send('root for the API')
})

import users from '../routers/users'
import commandsPublicRouter from '../routers/commandsPublicRouter'
import commandsPrivateRouter from '../routers/commandsPrivateRouter'
import sessions from '../routers/sessions'

/* Used as meta-router */
router.use('/users', users)
router.use('/command-public', commandsPublicRouter)
router.use('/command-private', commandsPrivateRouter)
router.use('/sessions', sessions)

export default router
