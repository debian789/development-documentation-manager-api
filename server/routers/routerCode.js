'use strict'
var Router = require('express')
var CodeSchema = require('server/models/CodeSchema')
var Utils = require('server/routers/Utils')

var code = Router()

code.get('/code-public', (req, res) => {
  CodeSchema.find({'is_public': true}).exec(function (err, data) {
    if (err) {
      return res.sendStatus(500)
    }

    res.json(data)
  })
})

code.get('/code-public/:id', (req, res) => {
  let id = req.params.id
  CodeSchema.findone({'_id': id, 'is_public': true}, (err, data) => {
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
