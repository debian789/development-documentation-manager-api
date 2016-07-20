'use strict'

var expect = require('chai').expect
var async = require('async')
var CommandItemSchema = require('server/models/CommandItemSchema')
var CommandsSchema = require('server/models/CommandsSchema')
var UserSchema = require('server/models/UserSchema')

// libreria para testear base de datos MongoDb
var utils = require('test/server/model/UtilDB')
var userTemp;
var commandTemp;


function commandValid(user,itemCommand,callback) {
  // Create initial commands
  var commando = new CommandsSchema()

  commando.title = 'Test prueba'
  commando.description = 'Prueba de commando'
  commando.user = user._id
  commando.commandItems.push(itemCommand)
  commando.save(function (err, datos) {
    expect(err).to.equal(null)
    expect(datos.title).to.equal('Test prueba')
    expect(datos.description).to.equal('Prueba de commando')
    commandTemp = datos
    callback()
  })
}

function commandItemValid(found_user, callback) {
  // Comando Item inicial

  var comandoItem = new CommandItemSchema()
  comandoItem.command = 'ls -la'
  comandoItem.description = 'Listar informacion'

  comandoItem.save(function (err, itemData) {
    commandValid(found_user,itemData,callback)
  })
}

function findUser (callback) {
  /* User has been saved */
  UserSchema.findOne({username: 'debian789'}, function (err, found_user) {
    expect(err).to.be.null
    expect(found_user).to.have.property('is_active', true)
    expect(found_user.token).to.be.undefined
    userTemp = found_user
    callback(found_user)

  })
}

function registerUser(callback) {
  UserSchema.register({'username': 'debian789', 'email': 'debian789@gmail.com'}, 'mypassword', function (err, userCreated) {
    expect(err).to.be.null
    callback(userCreated)
  })
}


function RequestActivationUser(callback) {
  registerUser(function (userCreated) {
    /* Activation function returns the user */
    UserSchema.requestActivation(userCreated.id, function (err, userActivated) {
      expect(err).to.be.null
      callback(userActivated, userCreated)
    })
  })
}

function activateUser(callback) {
  RequestActivationUser(function (userActivated, userCreated) {

    UserSchema.activate(userCreated.id, userActivated.token, function (err, is_active_user) {
      expect(err).to.be.null
      expect(is_active_user).to.have.property('is_active', true)
      expect(is_active_user.token).to.be.undefined
      callback()
    })
  })
}



describe('CommandsSchema: Model', function () {
  describe('Administration command', function () {

    beforeEach(function (done) {
      activateUser(function() {
        findUser(function(dataUser) {
          commandItemValid(dataUser, done)
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
               expect(data.length).to.equal(2)
              return err ? done(err) : cb();

             })
           },
           // query for title
           function (cb) {
             CommandsSchema.find({title:'Test prueba'}, function (err,data) {
               expect(err).to.equal(null)
               expect(data.length).to.equal(1)
               return err ? done(err) : cb();
             })
           },
           // query for description
          function (cb) {
            // list = parametro de busqueda
            var parameterSearch = new RegExp('list', 'i')
            CommandsSchema.find({description: parameterSearch}, function (err, data) {
              expect(data.length).to.equal(1)
              done()
            })

          },
          //  function () {},
          //  function () {},
          //  function () {},
          //  function () {},
          //  function () {},
         ])



       })

     })

     // Edit command
     it ('Should edit a command', function (done) {
       var newTitle = 'Hola mundo !!!'
       CommandsSchema.findOne({_id: commandTemp._id}, function(err, data) {
         data.title = newTitle
         data.is_public= true
         data.is_edit = true
         data.save(function(err, datos) {
           expect(datos.title).to.equal(newTitle)
           expect(datos.is_public).to.equal(true)
           expect(datos.is_edit).to.equal(true)
           done()
         })
       })
     })
    // editar item comando
    it ('Should edit a item command', function (done) {
      var newTitle = 'Hola mundo !!!'
      CommandsSchema.findOne({_id: commandTemp._id}, function(err, data) {
        data.title = newTitle
        data.is_public= true
        data.is_edit = true
        console.log(data.commandItems)
        // deberia poder crear un item de comando previo y enlazarlo
        // y con este asegurar que se creo, luego en la funcion de guadar, seria
        // modificar le valor para  que retornada otro datos
        data.save(function(err, datos) {
          expect(datos.title).to.equal(newTitle)
          expect(datos.is_public).to.equal(true)
          expect(datos.is_edit).to.equal(true)
          done()
        })
      })
    })

    // eliminar comando
    // eliminar un item del comando


  })
})
