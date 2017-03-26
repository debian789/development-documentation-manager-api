const utilRest = require('server/controllers/utilRest')
const mailUtils = require('server/common/mailUtils')
const httplikeErrors = require('server/common/httplikeErrors')
/* Let caller define which model use (better architecture, esier testing) */
const usersInj = function (UserModel) {
  const users = {}
  users.all = function (req, res) {
    return utilRest.all(UserModel, req, res)
  }

  users.create = function (req, res) {
    const user = new UserModel({
      username: req.body.username,
      email: req.body.email
    })

    UserModel.register(user, req.body.password, function (error, newUser) {
      if (error) {
        if (error.code) {
          return res.status(error.code).send(error.message)
        }
        const err = httplikeErrors.fromMongo(error)
        return res.status(err.code).send(err.message)
      }

      UserModel.requestActivation(newUser.id, function (err, userToact) {
        if (err) {
          return res.status(500)
        }

        mailUtils.sendActivationMail(userToact, function (err, html, text) {
          if (err) {
            return res.sendStatus(500)
          }

          return res.send(newUser)
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
    return utilRest.get(UserModel, req.params.userid, req, res)
  }

  users.delete = function (req, res) {
    if (req.user._id !== req.params.userid) {
      return res.sendStatus(401)
    }
    return utilRest.delete(UserModel, req.params.userid, req, res)
  }

  users.edit = function (req, res) {
    if (req.user._id !== req.params.userid) {
      return res.sendStatus(401)
    }
    return utilRest.edit(UserModel, req.params.userid, ['username', 'email'], req, res)
  }

  return users
}

module.exports = usersInj
