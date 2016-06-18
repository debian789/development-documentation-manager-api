'use strict'
var Router = require('express')
var CodeSchema = require('server/models/CodeSchema')
// var Utils = require('server/models/Utils')

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
code.get('/code', (req, res, next) => {
  console.log('.....')
  res.json('hola')
  //CodeSchema.find({})
})

module.exports = code
