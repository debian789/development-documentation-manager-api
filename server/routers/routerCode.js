'use strict'
const Router = require('express')
const codeSchema = require('server/models/codeSchema')
const Utils = require('server/routers/Utils')

const code = Router()

code.get('/code-public', (req, res) => {
  codeSchema.find({'is_public': true}).exec(function (err, data) {
    if (err) {
      return res.sendStatus(500)
    }

    res.json(data)
  })
})

code.get('/code-public/:id', (req, res) => {
  let id = req.params.id
  codeSchema.findone({'_id': id, 'is_public': true}, (err, data) => {
    if (err) {
      return res.sendStatus(500)
    }

    res.json(data)
  })
})

code.put('/code-private', Utils.validateAutentication, (req, res) => {
  res.send('hola')
})

module.exports = code
