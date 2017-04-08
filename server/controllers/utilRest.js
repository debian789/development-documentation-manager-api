import winston from 'winston'
import _ from 'underscore'
import utilsQuery from '../models/utilsQuery'
// const utilRest = {}

export default class UtilRest {
  all (Model, req, res, fieldSearch) {
    return utilsQuery.findWithParameter(Model, req, fieldSearch, (err, items) => {
      if (err) {
        winston.error(err)
        return res.sendStatus(500)
      }

      return res.send(items)
    })
  }

  create (Model, fields, required, req, res) {
    utilsQuery.saveNew(Model, req.body, fields, required, (err, missing, item) => {
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

  getById (Model, id, req, res) {
    return utilsQuery.findById(Model, id, req, (err, item) => {
      if (err) {
        winston.error(err)
        return res.sendStatus(500)
      }

      return item ? res.send(item) : res.sendStatus(404)
    })
  }

  delete (Model, id, req, res) {
    return utilsQuery.remove(Model, id, req, (err, notfound) => {
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

  edit (Model, id, fields, req, res) {
    return utilsQuery.saveExisting(Model, id, req.body, fields, (err, notfound, item) => {
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
}
/* utilRest.all = function (Model, req, res, fieldSearch) {
 return utilsQuery.findWithParameter(Model, req, fieldSearch, function (err, items) {
 if (err) {
 winston.error(err)
 return res.sendStatus(500)
 }

 return res.send(items)
 })
 }


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
 */
