const winston = require('winston')
import _ from 'underscore'
const utilsQuery = require('server/models/utilsQuery')
const utilRest = {}

utilRest.all = function (Model, req, res, fieldSearch) {
  return utilsQuery.findWithParameter(Model, req, fieldSearch, function (err, items) {
    if (err) {
      winston.error(err)
      return res.sendStatus(500)
    }

    return res.send(items)
  })
}

/*
* field corresponde a los campos que se van a guadar en la DB
*/
utilRest.create = function (Model, fields, required, req, res) {
  utilsQuery.saveNew(Model, req.body, fields, required, function (err, missing, item) {
    if (!_.isEmpty(missing)) {
      return res.status(400).send({'error': {'missing': missing}})
    }

    if (err) {
      winston.error(err)
      return res.sendStatus(500)
    }

    return res.status(201).send(item)
  })
}

utilRest.getById = function (Model, id, req, res) {
  return utilsQuery.findById(Model, id, req, function (err, item) {
    if (err) {
      winston.error(err)
      return res.sendStatus(500)
    }

    return item ? res.send(item) : res.sendStatus(404)
  })
}

utilRest.delete = function (Model, id, req, res) {
  return utilsQuery.remove(Model, id, req, function (err, notfound) {
    if (err) {
      winston.error(err)
      return res.sendStatus(500)
    }

    if (notfound) {
      return res.sendStatus(404)
    }

    return res.sendStatus(202)
  })
}

utilRest.edit = function (Model, id, fields, req, res) {
  return utilsQuery.saveExisting(Model, id, req.body, fields, function (err, notfound, item) {
    if (err) {
      winston.error(err)
      return res.sendStatus(500)
    }

    if (notfound) {
      return res.sendStatus(404)
    }

    return res.send(item)
  })
}

module.exports = utilRest
