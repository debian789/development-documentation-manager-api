'use strict'
var request = require('supertest')
var expect = require('chai').expect
var mongoose = require('mongoose')
var async = require('async')
// var expect = require('chai').expect
// var CommandPublicControllers = require('server/controllers/CommandPublicControllers')
// var CommandPrivateControllers = require('server/controllers/CommandPrivateControllers')
var mockgoose = require('mockgoose')
mockgoose(mongoose)

var mails = require('server/config/mails')

function MailStub (options) {
  this.options = options || {}
  this.name = 'MailStub'
}

MailStub.prototype.send = function (mail, cb) {
  if (this.options.customCallback) {
    this.options.customCallback(mail)
  }
  cb(null)
}

var server = require('server/server')()
// var server = request.agent('http://localhost:3000')
describe('CommandPublicControllers', function () {
  var idUserTemp = ''
  var lastMail = {}

  beforeEach(function (done) {
    mockgoose.reset()

    mails.init(new MailStub({
      customCallback: function (mail) {
        lastMail = mail
      }
    }), {
      statics: {baseuri: 'http://localhost/'}
    })

    request(server)
      .post('/api/users')
      .send({'username': 'neozaru', 'email': 'neozaru@mailoo.org', 'password': 'mypassword'})
      .expect(200)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res.body).to.have.property('_id')
        expect(res.body).to.have.property('username', 'neozaru')
        expect(res.body).to.have.property('email', 'neozaru@mailoo.org')
        idUserTemp = res.body._id
        done()
      })
  })

  describe('Functionalidades de CommandPublicControllers', function () {

    it('Crear un comando y obtenerlo', function (done) {
      debugger;
      debugger;
      async.series([
        // query all return {}
        function (callback) {
          debugger
          request(server)
          .get('/api/command-public/all')
          .expect('Content-Type', /json/)
          .expect(200)
          .expect({})
          .end(function (err, res) {
            return err ? done(err) : callback()
          })
        }, function (callback) {
          // create commando
          debugger
          request(server)
          .post('/api/command-private/command')
          .send({'title': 'hola mundo', 'description': 'is command', 'user': idUserTemp})
          .expect(201)
          .end(function (err, res) {
            // console.log(res.body)
            expect(res.body).to.have.property('title', 'hola mundo')
            expect(res.body).to.have.property('description', 'is command')
            expect(res.body).to.have.property('is_edit', false)
            expect(res.body).to.have.property('is_public', false)
            expect(res.body).to.have.property('itemsCommand')
            return err ? done(err) : callback()
          })
        }, function (callback) {
          debugger
          // create command
          request(server)
          .post('/api/command-private/command')
          .send({
            'title': 'Hello world !',
            'user': idUserTemp,
            'is_edit': true,
            'is_public': true
          })
          .expect(201)
          .end(function (err, res) {
            expect(res.body).to.have.property('title', 'Hello world !')
            expect(res.body).to.have.property('is_edit', true)
            expect(res.body).to.have.property('is_public', true)
            expect(res.body).to.have.property('itemsCommand')
            return err ? done(err) : callback()
          })
        }, function (callback) {
          // create command
          debugger
          request(server)
          .post('/api/command-private/command')
          .send({
            'title': 'Files linux',
            'user': idUserTemp,
            'is_edit': true,
            'is_public': true,
            'itemsCommand': [{
              command: 'ls -la',
              description: 'View files and directory'
            }, {
              command: 'mkdir name',
              description: 'Create directory'
            }
            ]
          })
          .expect(201)
          .end(function (err, res) {
            expect(res.body).to.have.property('title', 'Files linux')
            expect(res.body).to.have.property('is_edit', true)
            expect(res.body).to.have.property('is_public', true)
            expect(res.body).to.have.property('itemsCommand')
            expect(res.body.itemsCommand).to.have.length(2)
            return err ? done(err) : callback()
          })
        }, function (callback) {
          debugger
          request(server)
          .get('/api/command-public/all')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res.body).to.have.length(3)
            expect(res.body[0]).to.have.property('title', 'hola mundo')
            expect(res.body[0]).to.have.property('is_edit', false)
            expect(res.body[1]).to.have.property('title', 'Hello world !')
            expect(res.body[1]).to.have.property('is_edit', true)
            return done()
          })
        }
      ])
    })

    it('Should get command by id', function (done) {
      done()
      // async.series([
      //   function (callback) {
      //       // Create command
      //     request(server)
      //       .post('/api/command-private/command')
      //       .send({'title': 'hola', 'user': idUserTemp})
      //       .expect(201)
      //       .end(function (err, res) {
      //         expect(err).to.be.null
      //         expect(res.body).to.have.property('title')
      //           return err ? done(err) : callback()
      //       })
      //   }, function (callback) {
      //       // get command
      //     request(server)
      //       .get('/api/command-public/all')
      //       .expect(200)
      //       .end(function (err, res) {
      //         expect(err).to.be.null
      //         done()
      //       })
      //   }
      // ])
    })
  })
})
