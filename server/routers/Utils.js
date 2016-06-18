'use strict'

var Utils = {
  validateAutentication: function (req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect('/')
    }
  }
}

module.exports = Utils
