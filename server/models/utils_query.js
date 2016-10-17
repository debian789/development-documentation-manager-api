var _ = require('underscore')
var urlUtil = require('url')

var utils_query = {};

utils_query.copyFields = function(source, target, fields, required) {
    if (_.isEmpty(fields)) {
        return []
    }

    return _.filter(fields, function(field) {
        if (!_.isUndefined(source[field])) {
            target[field] = source[field]
        }
        else if (_.contains(required,field)) {
          return field
        }
    })
}

// /* DB methods */
// utils_query.find = function(Model, cb) {
//     return Model.find(function(err, items) {
//       return cb(err, items);
//     })
// }

utils_query.findWithParameter = function(Model, req, fieldSearch, cb) {
  var parameter = urlUtil.parse(req.url, true).query
  // var page = Number(req.param('page') > 0 ? req.param('page') : 0)
  var page = Number(parameter.page ? parameter.page : 0)
  var limitPage = Number(parameter.limit ? parameter.limit : 10)
  var textSearch = parameter.search ? parameter.search : ''
  var arraySearch = []
  var objSearch = {}

  if (Array.isArray(fieldSearch)) {
    fieldSearch.map(function (data) {
      objSearch[data] = new RegExp(textSearch, 'i')
      arraySearch.push(objSearch)
      objSearch = {}
    })
  }

  var objectSearch = {
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

utils_query.findById = function(Model, id, cb) {
    return Model.findById(id, function(err, item) {
        return cb(err, item);
    });
}

utils_query.saveNew = function(Model, obj, fields, required, cb) {
    var item = new Model();
    var missing = utils_query.copyFields(obj, item, fields, required);
    if (!_.isEmpty(missing)) {
        return cb(null, missing, null);
    }


    item.save(function(err, data) {
        return cb(err, [], item);
    });
}

utils_query.remove = function(Model, id, req, cb) {
    // return utils_query.findById(Model, id, function(err, item) {
    var objectFilter = {
      '_id': id,
      'user': req.body.user
    }

    return Model.find(objectFilter, function(err, item) {

        if (err) {
            return cb(err)
        }

        if (!item) {
            return cb(null, true)
        }

        if (item.length > 0) {
          return item[0].remove({'_id': item._id}, function (err) {
            return cb(err)
          })
        } else {
          return cb(null, true)
        }

    });
}

utils_query.saveExisting = function(Model, id, obj, fields, cb) {
    return utils_query.findById(Model, id, function(err, item) {
        if (err) {
            return cb(err)
        }

        if (!item) {
            return cb(null, true);
        }

        utils_query.copyFields(obj, item, fields, []);

        return item.save(function(err) {
            return cb(err, false, item);
        });

    });
}

module.exports = utils_query;
