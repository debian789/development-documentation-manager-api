var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('root for the API');
});


/* Used as meta-router */
router.use('/users', require('server/routers/users'))
router.use('/commands', require('server/routers/CommandsRouter'))
router.use('/sessions', require('server/routers/sessions'))
module.exports = router;
