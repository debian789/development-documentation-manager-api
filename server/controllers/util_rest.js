var winston = require('winston')
var _ = require('underscore')
var utils_query = require('server/models/utils_query')
var util_rest = {}

util_rest.all = function (Model, req, res, fieldSearch) {
  return utils_query.findWithParameter(Model, req, fieldSearch, function (err, items) {
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
util_rest.create = function (Model, fields, required, req, res) {
  utils_query.saveNew(Model, req.body, fields, required, function (err, missing, item) {
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

util_rest.getById = function (Model, id, req, res) {
  return utils_query.findById(Model, id, function (err, item) {
    if (err) {
      winston.error(err)
      return res.sendStatus(500)
    }

    return item ? res.send(item) : res.sendStatus(404)
  })
}

util_rest.delete = function (Model, id, req, res) {
  return utils_query.remove(Model, id, req, function (err, notfound) {
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

util_rest.edit = function (Model, id, fields, req, res) {
  return utils_query.saveExisting(Model, id, req.body, fields, function (err, notfound, item) {
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

module.exports = util_rest
