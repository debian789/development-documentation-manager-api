const path = require('path')
const emailTemplates = require('email-templates')
const winston = require('winston')
const templatesDir = path.join(__dirname, '../templates')
const mails = require('server/config/mails')

const mailUtils = {}

mailUtils.getBaseOptions = function () {
  return {
    from: mails.options.defaultFrom || 'debian789@email.com'
  }
}

mailUtils.renderActivationMail = function (user, cb) {
  /* Performance issues */
  emailTemplates(templatesDir, function (err, template) {
    if (err) {
      return cb(err)
    }
    // Render a single email with one template
    let context = {user: user, statics: mails.options.static_context}

    template('activation_mail', context, function (err, html, text) {
      return cb(err, html, text)
    })
  })
}

mailUtils.sendActivationMail = function (user, cb) {
  mailUtils.renderActivationMail(user, function (err, html, text) {
    if (err) {
      return cb(err)
    }

    let mailOptions = mailUtils.getBaseOptions()

    mailOptions.to = user.email
    mailOptions.subject = 'Welcome ' + user.username + ', activate your account'
    mailOptions.text = text
    mailOptions.html = html

    mails.send(mailOptions, function (err, info) {
      winston.log('Sent mail')
      winston.log(info)
      if (err) {
        winston.error(err)
      }

      cb(err, info)
    })
  })
}

module.exports = mailUtils
