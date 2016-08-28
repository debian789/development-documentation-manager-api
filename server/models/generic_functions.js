var _ = require('underscore')
var urlUtil = require('url')

var generic = {};

generic.copyFields = function(source, target, fields, required) {
    if (_.isEmpty(fields)) {
        return [];
    }

    return _.filter(fields, function(field) {
        if (!_.isUndefined(source[field])) {
            target[field] = source[field];
        }
        else if (_.contains(required,field)) {
            return field;
        }
    });
}

// /* DB methods */
// generic.find = function(Model, cb) {
//     return Model.find(function(err, items) {
//       return cb(err, items);
//     })
// }

generic.findWithParameter = function(Model, req, fieldSearch, cb) {
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

  return Model.find({
    '$or': arraySearch
  })
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

generic.findById = function(Model, id, cb) {
    return Model.findById(id, function(err, item) {
        return cb(err, item);
    });
}

generic.saveNew = function(Model, obj, fields, required, cb) {
    var item = new Model();
    var missing = generic.copyFields(obj, item, fields, required);
    if (!_.isEmpty(missing)) {
        return cb(null, missing, null);
    }


    item.save(function(err, data) {
        return cb(err, [], item);
    });
}

generic.remove = function(Model, id, cb) {
    return generic.findById(Model, id, function(err, item) {

        if (err) {
            return cb(err);
        }

        if (!item) {
            return cb(null, true);
        }

        return item.remove(function(err) {
            return cb(err);
        });

    });
}

generic.saveExisting = function(Model, id, obj, fields, cb) {
    return generic.findById(Model, id, function(err, item) {
        if (err) {
            return cb(err)
        }

        if (!item) {
            return cb(null, true);
        }

        generic.copyFields(obj, item, fields, []);

        return item.save(function(err) {
            return cb(err, false, item);
        });

    });
}

module.exports = generic;
