'use strict'

const Utils = {
  validateAutentication: function (req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect('/')
    }
  }
}

export default Utils
