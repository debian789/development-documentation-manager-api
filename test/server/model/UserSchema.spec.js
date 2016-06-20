'use strict';
// import the moongoose helper utilities
var utils = require('test/server/model/UtilDB')
var should = require('chai').should()
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
        should.not.exist(err)
        done()
      })
    })

    // No email
    it ('Should fail if no email', function (done) {
      UserSchema.register({'username': userData.username}, userData.password, function (err, account) {
        should.exist(err)
        done()
      })
    })

    // Empty password
    it ('Should fail if empty password', function (done) {
      UserSchema.register({'username': userData.username, 'email': 'debian789@gmail.com'}, '', function (err, account) {
        should.exist(err)
        done()
      })
    })

    // Weak password
    it ('Should fail if weak password', function (done) {
      UserSchema.register({'username': userData.username, 'email': userData.email}, '123', function (err, account) {
        should.exist(err)
        err.message.should.equal('Password should be between 4 and 32 chars')
        done()
      })
    })

    describe('Register and Authenticate', function () {
      it ('Should register a new User with username and email', function (done) {
        UserSchema.register({'username': userData.username, 'email': userData.email}, userData.password, (err, account) => {
          should.not.exist(err)
          account.should.have.property('username', 'Angel')
          account.should.have.property('email', 'debian789@gmail.com')
          account.should.have.property('is_active', true)
          account.should.have.property('is_administrador', false)
          account.should.have.property('is_staff', false)
          account.should.have.property('hash')
          account.should.have.property('salt')
          done()
        })
      })

      it ('Should authenticate when good password', function (done) {

        UserSchema.register({'username': userData.username, 'email': userData.email}, userData.password, (err, account) => {
          should.not.exist(err)
          UserSchema.findOne({'username': userData.username}, function (err, account) {
            account.authenticate(userData.password, function (err, user) {
              should.not.exist(err)
              user.should.have.property('username', 'Angel')
              done()
            })
          })
        })
      })

      it ('Should not authenticate when bad password', function (done) {

        UserSchema.register({'username': userData.username, 'email': userData.email}, userData.password, (err, account) => {
          should.not.exist(err)
          UserSchema.findOne({'username': userData.username}, function (err, account) {
            account.authenticate('123', function (err, user) {
              should.not.exist(err)
              user.should.be.false
              done()
            })
          })
        })
      })


      // describe ('tokens : activation requests', function () {
      //   it('should request activation properly', function (done) {
      //     UserSchema.register({'username': 'neozaru', 'email': 'neozaru@foo.org'}, 'mypassword', function (err, new_user) {
      //       should.not.exist(err)
      //       console.log(new_user)
      //       //new_user.token.should.to.be.undefined
      //     //  should(new_user.token).be.undefined
      //       /* Activation function returns the user */
      //       UserSchema.requestActivation(new_user.id, function (err, user) {
      //         should.not.exist(err)
      //         user.should.have.property('token')
      //         // expect(user).to.have.property('token')
      //         user.token.should.not.empty
      //
      //         // expect(user.token).to.not.be.empty
      //
      //         /* User has been saved */
      //         UserSchema.findOne({username: 'neozaru'}, function (err, found_user) {
      //           expect(found_user).to.have.property('token', user.token)
      //           done()
      //         });
      //
      //       });
      //
      //     });
      //   });
      // })

    })

  })
})
