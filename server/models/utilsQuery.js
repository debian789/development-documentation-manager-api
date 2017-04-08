import _ from 'underscore'
import urlUtil from 'url'

const utilsQuery = {}

utilsQuery.copyFields = function (source, target, fields, required) {
  if (_.isEmpty(fields)) {
    return []
  }

  return _.filter(fields, function (field) {
    if (!_.isUndefined(source[field])) {
      target[field] = source[field]
    } else if (_.contains(required, field)) {
      return field
    }
  })
}

// /* DB methods */
// utilsQuery.find = function(Model, cb) {
//     return Model.find(function(err, items) {
//       return cb(err, items);
//     })
// }

utilsQuery.findWithParameter = function (Model, req, fieldSearch, cb) {
  const parameter = urlUtil.parse(req.url, true).query
  // const page = Number(req.param('page') > 0 ? req.param('page') : 0)
  const page = Number(parameter.page ? parameter.page : 0)
  const limitPage = Number(parameter.limit ? parameter.limit : 10)
  const textSearch = parameter.search ? parameter.search : ''
  const arraySearch = []
  let objSearch = {}

  if (Array.isArray(fieldSearch)) {
    fieldSearch.map(function (data) {
      objSearch[data] = new RegExp(textSearch, 'i')
      arraySearch.push(objSearch)
      objSearch = {}
    })
  }

  const objectSearch = {
    '$or': arraySearch
  }

  if (req.body.user) {
    objectSearch['user'] = req.body.user
  } else {
    objectSearch['is_public'] = true
  }

  return Model.find(objectSearch)
    .limit(limitPage)
    .skip(limitPage * page)
    .exec(function (err, items) {
      if (err) {
        cb(err)
      }
      Model.find({
        '$or': arraySearch
      })
        .count()
        .exec(function (err, count) {
          return cb(err, {
            data: items,
            actualPage: page,
            pages: Math.round(count / limitPage) === 0 ? 0 : Math.round(count / limitPage),
            countData: count,
            limitByPage: limitPage
          })
        })
    })
}

utilsQuery.findById = function (Model, id, req, cb) {
  const objectFiter = {
    '_id': id
  }

  if (req.body['user']) {
    objectFiter['user'] = req.body.user
  }

  return Model.find(objectFiter, function (err, item) {
    if (item.length > 0) {
      return cb(err, item[0])
    } else {
      return cb(null, true)
    }
  })
}

utilsQuery.saveNew = function (Model, obj, fields, required, cb) {
  const item = new Model()
  const missing = utilsQuery.copyFields(obj, item, fields, required)
  if (!_.isEmpty(missing)) {
    return cb(null, missing, null)
  }

  item.save(function (err, data) {
    return cb(err, [], item)
  })
}

utilsQuery.remove = function (Model, id, req, cb) {
  // return utilsQuery.findById(Model, id, function(err, item) {
  const objectFilter = {
    '_id': id,
    'user': req.body.user
  }

  return Model.find(objectFilter, function (err, item) {
    if (err) {
      return cb(err)
    }

    if (!item) {
      return cb(null, true)
    }

    if (item.length > 0) {
      return item[0].remove({
        '_id': item._id
      }, function (err) {
        return cb(err)
      })
    } else {
      return cb(null, true)
    }
  })
}

utilsQuery.saveExisting = function (Model, id, obj, fields, cb) {
  return utilsQuery.findById(Model, id, function (err, item) {
    if (err) {
      return cb(err)
    }

    if (!item) {
      return cb(null, true)
    }

    utilsQuery.copyFields(obj, item, fields, [])

    return item.save(function (err) {
      return cb(err, false, item)
    })
  })
}

export default utilsQuery
