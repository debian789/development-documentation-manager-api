'use strict'

import express from 'express'

const router = express.Router()

/* GET home page. */
router.get('/', function (req, res) {
  res.sendfile('public/index.html')
})

export default router
