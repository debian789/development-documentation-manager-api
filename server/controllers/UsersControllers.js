var util_rest = require('server/controllers/util_rest')
var mail_utils = require('server/common/mail_utils')
var httplike_errors = require('server/common/httplike_errors')
/* Let caller define which model use (better architecture, esier testing) */
var usersInj = function (UserModel) {
  var users = {}
  users.all = function (req, res) {
    return util_rest.all(UserModel, req, res)
  }

  users.create = function (req, res) {
    var user = new UserModel({
      username: req.body.username,
      email: req.body.email
    })

    UserModel.register(user, req.body.password, function (err, new_user) {
      if (err) {
        if (err.code) {
          return res.status(err.code).send(err.message)
        }
        var err = httplike_errors.fromMongo(err)
        return res.status(err.code).send(err.message)
      }

      UserModel.requestActivation(new_user.id, function (err, user_toact) {
        if (err) {
          return res.status(500)
        }

        mail_utils.sendActivationMail(user_toact, function (err, html, text) {
          if (err) {
            return res.sendStatus(500)
          }

          return res.send(new_user)
        })
      })
    })
  }

  users.activate = function (req, res) {
    if (!req.params.userid || !req.body.token) {
      return res.sendStatus(400)
    }

    UserModel.activate(req.params.userid, req.body.token, function (err, user) {
      if (err) {
        if (err.code) {
          return res.status(err.code).send(err.message)
        }
        return res.sendStatus(500)
      }
      return res.send(user)
    })
  }

  users.get = function (req, res) {
    return util_rest.get(UserModel, req.params.userid, req, res)
  }

  users.delete = function (req, res) {
    if (req.user._id != req.params.userid) {
      return res.sendStatus(401)
    }
    return util_rest.delete(UserModel, req.params.userid, req, res)
  }

  users.edit = function (req, res) {
    if (req.user._id != req.params.userid) {
        return res.sendStatus(401)
    }
    return util_rest.edit(UserModel, req.params.userid, ['username', 'email'], req, res)
  }

  return users
}

module.exports = usersInj
