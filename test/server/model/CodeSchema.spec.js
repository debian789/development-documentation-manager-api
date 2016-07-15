'use strict'

var expect = require('chai').expect
var CodeSchema = require('server/models/CodeSchema')
var UserSchema = require('server/models/UserSchema')

// libreria para testear base de datos MongoDb
var utils = require('test/server/model/UtilDB')


describe('CodeSchema: models', function () {
  describe('Administration code', function () {
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

    // create code is public false
    it ('Should create code is_public false', function (done) {
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

    // create code is public true
    it ('Should create code is_public true', function (done) {
      var code = new  CodeSchema()

      code.title = 'copy and paste'
      code.description = 'copy and paste code all '
      code.code = '<H1>copy and paste</H1>'
      code.user = userTemp._id
      code.is_public = true
      code.save(function(err, data) {
        expect(err).to.equal(null)
        expect(data.title).to.equal('copy and paste')
        expect(data.description).to.equal('copy and paste code all ')
        expect(data.code).to.equal('<H1>copy and paste</H1>')
        expect(data.is_public).to.equal(true)
        expect(data.user).to.equal(userTemp._id)
        done()
      })

    })

    // query all by user public true
    it ('Should query all by user', function (done) {

      var code = new  CodeSchema()

      code.title = 'copy and paste'
      code.description = 'copy and paste code all '
      code.code = '<H1>copy and paste</H1>'
      code.user = userTemp._id
      code.is_public = true
      code.save(function(err, data) {
        expect(err).to.equal(null)

        CodeSchema.find({is_public:true, user:userTemp._id}, function (err, data) {
          expect(data.length).to.equal(1)
          done()
        })
      })
    })

    // query all by user
    it ('Should query all by is_public false', function (done) {

          var code = new  CodeSchema()

          code.title = 'copy and paste'
          code.description = 'copy and paste code all '
          code.code = '<H1>copy and paste</H1>'
          code.user = userTemp._id
          code.save(function(err, data) {
            expect(err).to.equal(null)

            CodeSchema.find({user: userTemp._id}, function (err, data) {
              expect(err).to.equal(null)
              expect(data.length).to.equal(1)
              expect()
              done()
            })


          })

        })


        // query all by user
        it ('Should query all by is_public true', function (done) {

          var code = new  CodeSchema()

          code.title = 'copy and paste'
          code.description = 'copy and paste code all '
          code.code = '<H1>copy and paste</H1>'
          code.user = userTemp._id
          code.is_public = true
          code.save(function(err, data) {
            expect(err).to.equal(null)

            CodeSchema.find({is_public:true}, function (err, data) {
              expect(err).to.equal(null)
              expect(data.length).to.equal(1)

              done()
            })


          })

        })

    // edit
    it ('should allow edit a Code', function (done) {
      var code = new CodeSchema()

      code.title = 'Hola mundo !!'
      code.description = 'Esto es una descripcion'
      code.user = userTemp._id

      code.save(function (err, data) {
        expect(err).to.equal(null)
        CodeSchema.findOne({user:userTemp._id, _id: data._id }, function (err, dataFind) {
          expect(err).to.equal(null)
          expect(data.is_public).to.equal(false)
          dataFind.title = 'Buscar Archivos'
          dataFind.description = 'nueva description'
          dataFind.is_public = true

          dataFind.save(function (err, dataSave) {
            expect(dataSave.title).to.equal('Buscar Archivos')
            expect(dataSave.description).to.equal('nueva description')
            expect(String(dataSave._id)).to.equal(String(data._id))
            expect(dataSave.is_public).to.equal(true)
              done()
          })

        })
      })
    })

    // Delete
    it ('Should allow delete a Code', function (done) {
      var code = new CodeSchema()

      code.title = 'Hola mundo'
      code.user = userTemp._id

      code.save(function(err, data) {
        expect(err).to.equal(null)
        expect(data.title).to.equal('Hola mundo')
        CodeSchema.findOneAndRemove({_id: data._id, user:userTemp._id}, function (err, dataDelete) {
          CodeSchema.findOne({_id: dataDelete._id}, function (err, dataFind){
            expect(err).to.equal(null)
            expect(dataFind).to.equal(null)
            done()
          })
        })
      })


    })
  })
})
