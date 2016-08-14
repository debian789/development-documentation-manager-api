'use strict'
var request = require('supertest')
var expect = require('chai').expect
var mongoose = require('mongoose');
var async = require('async')
var expect = require('chai').expect;
var CommandControllers = require('server/controllers/CommandControllers')
var mockgoose = require('mockgoose');
mockgoose(mongoose);

var mails = require('server/config/mails');

function MailStub(options) {
  this.options = options || {};
  this.name = "MailStub";
}

MailStub.prototype.send = function(mail, cb) {
  if (this.options.customCallback) {
    this.options.customCallback(mail);
  }
  cb(null);
};

var server = require('server/server')()
//var server = request.agent("http://localhost:3000")
describe('CommandControllers', function () {
  var idUserTemp = ''
  var lastMail = {};

  beforeEach(function(done) {
    mockgoose.reset()

    mails.init(new MailStub({
     customCallback: function(mail) {
       lastMail = mail;
     }
    }), {
     statics: {baseuri: "http://localhost/"}
    });

    request(server)
      .post('/api/users')
      .send({"username": "neozaru", "email": "neozaru@mailoo.org", "password": "mypassword"})
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.have.property("_id");
        expect(res.body).to.have.property("username", "neozaru");
        expect(res.body).to.have.property("email", "neozaru@mailoo.org");
        idUserTemp = res.body._id
        done()
      })
  })

  describe('Functionalidades de CommandControllers', function () {
    it('Crear un comando y obtenerlo', function (done) {
      async.series([
        function (callback) {
          request(server)
          .get('/api/commands')
          .expect('Content-Type', /json/)
          .expect(200)
          .expect({})
          .end(function(err, res) {
            return err ? done(err) : callback()
          })
        }, function(callback) {
          request(server)
          .post('/api/commands')
          .send({'title':'hola mundo','description':'is command', 'user':idUserTemp})
          .expect(201)
          .end(function(err, res) {
            expect(res.body).to.have.property('title', 'hola mundo')
            expect(res.body).to.have.property('description', 'is command')
            expect(res.body).to.have.property('is_edit', false)
            expect(res.body).to.have.property('is_public', false)
            expect(res.body).to.have.property('ItemsCommand')
            return err ? done(err) : callback()
          })
        }, function(callback) {
          request(server)
          .post('/api/commands')
          .send({
            'title':'Hello world !',
            'user':idUserTemp,
            'is_edit': true,
            'is_public': true
          })
          .expect(201)
          .end(function(err, res) {
            expect(res.body).to.have.property('title', 'Hello world !')
            expect(res.body).to.have.property('is_edit', true)
            expect(res.body).to.have.property('is_public', true)
            expect(res.body).to.have.property('ItemsCommand')
            return err ? done(err) : callback()
          })
        }, function (callback) {
          request(server)
          .get('/api/commands')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            expect(res.body).to.have.length(2)
            expect(res.body[0]).to.have.property('title', 'hola mundo')
            expect(res.body[0]).to.have.property('is_edit', false)
            expect(res.body[1]).to.have.property('title', 'Hello world !')
            expect(res.body[1]).to.have.property('is_edit', true)
            done()
          })
        }
      ])





    })
  })
})
