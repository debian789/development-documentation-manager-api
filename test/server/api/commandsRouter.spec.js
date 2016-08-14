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
  beforeEach(function() {
      mockgoose.reset()
  })

  describe('Functionalidades de CommandControllers', function () {
    it('Crear un comando sin problemas', function (done) {

      var lastMail = {};
      mails.init(new MailStub({
       customCallback: function(mail) {
         lastMail = mail;
       }
      }),
      {
       statics: {baseuri: "http://localhost/"}
      });
      var idUserTemp = ''

      

      async.series([
        function(callback) {
          request(server)
            .post('/api/users')
            .send({"username": "neozaru", "email": "neozaru@mailoo.org", "password": "mypassword"})
            .expect(200)
            .end(function(err, res) {
              expect(res.body).to.have.property("_id");
              expect(res.body).to.have.property("username", "neozaru");
              expect(res.body).to.have.property("email", "neozaru@mailoo.org");
              idUserTemp = res.body._id
              return err ? done(err) : callback();
            })
        },
        function(callback) {
          debugger
          request(server)
          .post('/api/commands')
          .send({'title':'hola mundo','user':idUserTemp})
          .expect(200)
          .end(function(err, res) {
            done()
          })
          //  return done();
        }
      ])





    })
  })
})
