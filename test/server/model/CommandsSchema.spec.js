'use strict'

var expect = require('chai').expect
var async = require('async')
var CommandItemSchema = require('server/models/CommandItemSchema')
var CommandsSchema = require('server/models/CommandsSchema')
var UserSchema = require('server/models/UserSchema')

// libreria para testear base de datos MongoDb
var utils = require('test/server/model/UtilDB')


describe('CommandsSchema: Model', function () {
  describe('Administration command', function () {
    var userTemp;
    var commandTemp;
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

                // Create initial commands
                var commando = new CommandsSchema()
                commando.title = 'Test prueba'
                commando.description = 'Prueba de commando'
                commando.user = found_user._id

                commando.save(function (err, datos) {
                  expect(err).to.equal(null)
                  expect(datos.title).to.equal('Test prueba')
                  expect(datos.description).to.equal('Prueba de commando')
                  commandTemp = datos
                  done()

                })




              })
            })
        })
      })




    })

    // Crear un comando sin item
    it ('Crear un comando sin item', function (done) {

      var commando = new CommandsSchema()
      commando.title = 'Listar directorios'
      commando.description = 'mostrar todo'
      commando.user = userTemp._id

      commando.save(function (err, datos) {
        expect(err).to.equal(null)
        expect(datos.title).to.equal('Listar directorios')
        expect(datos.description).to.equal('mostrar todo')
        done()


      })

    })
    // crear un comando con items
    it ('Crear un comando con items', function (done) {

      var commando = new CommandsSchema()
      var commandoItem = new CommandItemSchema()

      commandoItem.command = 'ls -la'
      commandoItem.description = 'mostrar directorios'

      commandoItem.save(function (err, dataItem) {
        expect(err).to.equal(null)
        commando.title = 'Listar directorios'
        commando.description = 'mostrar todo'
        commando.user = userTemp._id
        commando.commandItems.push(dataItem)

        commando.save(function (err, datos) {
          expect(err).to.equal(null)
          expect(datos.title).to.equal('Listar directorios')
          expect(datos.description).to.equal('mostrar todo')
          expect(datos.commandItems).to.be.an('array')
          expect(datos.commandItems[0]).to.equal(dataItem._id)
          done()
        })
      })



    })

    // cambiar el estado del comando is_public true
    it ('Should change the state the commands', function (done) {

      async.series([
        // change is_public to true
      function (callback) {
        expect(commandTemp.is_public).to.equal(false)
        commandTemp.is_public = true
        commandTemp.save(function(err, data) {
          expect(err).to.equal(null)
          expect(data).to.be.an('object')
          expect(data.is_public).to.equal(true)
          return err ? done(err) : callback();
        })
      },
      // change is_edit to true
      function (callback) {
        expect(commandTemp.is_edit).to.equal(false)
        commandTemp.is_edit = true

        commandTemp.save(function(err, data) {
          expect(err).to.equal(null)
          expect(data).to.be.an('object')
          expect(data.is_edit).to.equal(true)
          done(err)

        })
      }])


    })

    // consultar comandos is_public true
    it ('Should query for title, description,  is_public, is_edit,'
     +'dateCreate and user', function (done) {

       var commando = new CommandsSchema()
       commando.title = 'searh'
       commando.description = 'list the query'
       commando.user = userTemp._id

       commando.save(function (err, datos) {
         expect(err).to.equal(null)
         expect(datos.title).to.equal('searh')
         expect(datos.description).to.equal('list the query')

         async.series([
           // query all
           function (cb) {
             CommandsSchema.find({}, function (err,data) {
               expect(err).to.equal(null)
               console.log(data)
               expect(data.length).to.equal(2)
              return err ? done(err) : cb();

             })
           },
           // query for title
           function (cb) {
             CommandsSchema.find({title:'Test prueba'}, function (err,data) {
               expect(err).to.equal(null)
               console.log(data)
               expect(data.length).to.equal(1)
               done()
             })
           },
          //  function () {},
          //  function () {},
          //  function () {},
          //  function () {},
          //  function () {},
          //  function () {},
         ])



       })

     })
    // busqueda de comando por titulo
    // editar un comando
    // editar item comando
    // eliminar comando
    // eliminar un item del comando


  })
})
