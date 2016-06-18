'use strict';
// import the moongoose helper utilities
var utils = require('./UtilDB')
var should = require('chai').should()
// import our User mongoose model
var UserSchema = require('server/models/UserSchema')

describe('Users: models', function () {
  describe('#create()', function () {
    it('should create a new User', function (done) {
      // Create a User object to pass to User.create()
      var u = {
        username: 'Angel'
      }
      UserSchema.create(u, function (err, createdUser) {
        // Confirm that that an error does not exist
        // console.log(should.not)
        should.not.exist(err)
        // verify that the returned user is what we expect
        // console.log()
        createdUser.username.should.equal('Angel')
        // createdUser.name.familyName.should.equal('Obama');
        // Call done to tell mocha that we are done with this test
        done()
      })
    })
  })
})
