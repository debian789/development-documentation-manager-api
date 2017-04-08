'use strict'

import path from 'path'
import emailTemplates from 'email-templates'
import winston from 'winston'
import mails from '../config/mails'

const templatesDir = path.join(__dirname, '../templates')

export default class MailUitls {
  constructor (mailsOption) {
    this.mailsOption = mailsOption
  }

  getBaseOptions () {
    return {
      from: this.mailsOption.options.defaultFrom || 'debian789@email.com'
    }
  }

  renderActivationMail (user, cb) {
    /* Performance issues */
    emailTemplates(templatesDir, function (err, template) {
      if (err) {
        return cb(err)
      }
      // Render a single email with one template
      let context = {user: user, statics: this.mailsOption.options.static_context}

      template('activation_mail', context, function (err, html, text) {
        return cb(err, html, text)
      })
    })
  }

  sendActivationMail (user, cb) {
    this.renderActivationMail(user, function (err, html, text) {
      if (err) {
        return cb(err)
      }

      let mailOptions = this.getBaseOptions()

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
}
