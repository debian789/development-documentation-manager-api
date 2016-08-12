'use strict'
var request = require('supertest')
var expect = require('chai').expect
var mongoose = require('mongoose');
var async = require('async')
var expect = require('chai').expect;
var CommandControllers = require('server/controllers/CommandControllers')
var mockgoose = require('mockgoose');
mockgoose(mongoose);

var server = require('server/server')()
//var server = request.agent("http://localhost:3000")
describe('CommandControllers', function () {
  beforeEach(function() {
      mockgoose.reset()
  })

  describe('Functionalidades de CommandControllers', function () {
    it('Crear un comando sin problemas', function (done) {
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
         return err ? done(err) : callback();
      })

      // return err ? done(err) : cb();
  },
  function(callback) {
    request(server)
    .post('/api/commands')
    .send({'title':'hola mundo','user':'1'})
    .expect(200)
    .end(function(err, res) {

      console.log(res.body)
      console.log('................')
      return   done()
    })
    //  return done();
  }
])





    })
  })
})
