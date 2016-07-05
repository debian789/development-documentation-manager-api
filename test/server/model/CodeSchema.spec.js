'use strict'

var expect = require('chai').expect
var CodeSchema = require('server/models/CodeSchema')
var UserSchema = require('server/models/UserSchema')

// libreria para testear base de datos MongoDb
var utils = require('test/server/model/UtilDB')


describe('CodeSchema: models', function () {
  describe('Creation code', function () {
    var userTemp;
    beforeEach(function (done) {
      UserSchema.register({'username': 'debian789', 'email': 'debian789@gmail.com'}, 'mypassword', function (err, new_user) {
        expect(err).to.be.null
        /* Activation function returns the user */
        UserSchema.requestActivation(new_user.id, function (err, user) {
          expect(err).to.be.null
            UserSchema.activate(new_user.id, user.token, function (err, is_active_user) {
              expect(err).to.be.null
              expect(is_active_user).to.have.property('is_active', true)
              expect(is_active_user.token).to.be.undefined

              /* User has been saved */
              UserSchema.findOne({username: 'debian789'}, function (err, found_user) {
                expect(err).to.be.null
                expect(found_user).to.have.property('is_active', true)
                expect(found_user.token).to.be.undefined
                userTemp = found_user
                done()
              })
            })
        })
      })
    })

    // create code not error
    it ('Should create code', function (done) {
      var code = new  CodeSchema()

      code.title = 'copy and paste'
      code.description = 'copy and paste code all '
      code.code = '<H1>copy and paste</H1>'
      code.user = userTemp._id
      code.save(function(err, data) {
        expect(err).to.equal(null)
        expect(data.title).to.equal('copy and paste')
        expect(data.description).to.equal('copy and paste code all ')
        expect(data.code).to.equal('<H1>copy and paste</H1>')
        expect(data.is_public).to.equal(false)
        expect(data.user).to.equal(userTemp._id)
        done()
      })

    })


    // query all by user
    // query by stete (public) - true
    // query by stete (public) - false
    // return error is not public query
    // edit
    // Delete


  })
})
