var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  res.send('root for the API')
})

/* Used as meta-router */
router.use('/users', require('server/routers/users'))
router.use('/command-public', require('server/routers/CommandsPublicRouter'))
router.use('/command-private', require('server/routers/CommandsPrivateRouter'))
router.use('/sessions', require('server/routers/sessions'))

module.exports = router
