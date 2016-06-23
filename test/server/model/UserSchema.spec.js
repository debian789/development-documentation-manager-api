'use strict';
// import the moongoose helper utilities
var utils = require('test/server/model/UtilDB')
var expect = require('chai').expect
// import our User mongoose model
var UserSchema = require('server/models/UserSchema')
var userData = {
  username: 'Angel',
  password: '1234567',
  email: 'debian789@gmail.com'
}

describe ('UsersSchema: models', function () {
  describe ('Create user', function () {
    // No username
    it ('should not fail if no username', function (done) {
      UserSchema.register({'email': userData.email}, userData.password, function (err, account) {
        expect(err).to.equal(null)
        done()
      })
    })

    // No email
    it ('Should fail if no email', function (done) {
      UserSchema.register({'username': userData.username}, userData.password, function (err, account) {
        expect(err).not.to.equal(null)
        done()
      })
    })

    // Empty password
    it ('Should fail if empty password', function (done) {
      UserSchema.register({'username': userData.username, 'email': 'debian789@gmail.com'}, '', function (err, account) {
        expect(err).not.to.equal(null)
        done()
      })
    })

    // Weak password
    it ('Should fail if weak password', function (done) {
      UserSchema.register({'username': userData.username, 'email': userData.email}, '123', function (err, account) {
        expect(err).not.to.equal(null)
        expect(err.message).to.equal('Password should be between 4 and 32 chars')
        done()
      })
    })

    describe('Register and Authenticate', function () {
      it ('Should register a new User with username and email', function (done) {
        UserSchema.register({'username': userData.username, 'email': userData.email}, userData.password, (err, account) => {
          expect(err).to.equal(null)
          expect(account).to.have.property('username', 'Angel')
          expect(account).to.have.property('email', 'debian789@gmail.com')
          expect(account).to.have.property('is_active', false)
          expect(account).to.have.property('is_administrador', false)
          expect(account).to.have.property('is_staff', false)
          expect(account).to.have.property('hash')
          expect(account).to.have.property('salt')
          done()
        })
      })

      it ('Should authenticate when good password', function (done) {
        UserSchema.register({'username': userData.username, 'email': userData.email}, userData.password, (err, account) => {
          expect(err).to.equal(err)
          UserSchema.findOne({'username': userData.username}, function (err, account) {
            expect(err).to.equal(null)
            account.authenticate(userData.password, function (err, user) {
              expect(err).to.equal(err)
              expect(user).to.have.property('username', 'Angel')
              done()
            })
          })
        })
      })

      it ('Should not authenticate when bad password', function (done) {
        UserSchema.register({'username': userData.username, 'email': userData.email}, userData.password, (err, account) => {
          expect(err).to.equal(null)
          UserSchema.findOne({'username': userData.username}, function (err, account) {
            expect(err).to.equal(null)
            account.authenticate('123', function (err, user) {
              expect(err).to.equal(null)
              expect(user).to.equal(false)
              done()
            })
          })
        })
      })

      describe ('tokens : activation requests', function () {
        it ('should request activation properly', function (done) {
          UserSchema.register({'username': 'angel', 'email': 'neozaru@foo.org'}, 'mypassword7', function (err, account) {
            expect(err).to.equal(null)
            // En teoria no deberia tener un apropiedad token y hay que validar
            // si es igual a undefined
            expect(account).to.have.property('token')
            expect(account.token).to.equal(undefined)
            UserSchema.requestActivation(account.id, function (err, user) {
              expect(err).to.equal(null)
              expect(user).to.have.property('token')
              expect(user.token).to.have.length(20)

              UserSchema.findOne({username: 'angel'}, function (err, found_user) {
                expect(err).to.equal(null)
                expect(found_user).to.have.property('token', user.token)
                done()
              })
            })
          })
        })

        it ('should not request activation if already activated', function (done) {
          UserSchema.register({'username': 'angel', 'email': 'neozaru@foo.org', 'is_active': true}, 'mypassword7', function (err, account) {
            expect(err).to.equal(null)
            expect(account.token).to.equal(undefined)
            UserSchema.requestActivation(account.id, function (err, user) {
              //console.log(err)
            //  expect(err).not.to.equal(null)
              //done()
            })
          })
        })
      })
    })
  })
})
