'use strict'

var request = require('supertest') // Test servicios
// var Mongoose = require('mongoose').Mongoose;
// var mongoose = new Mongoose();
// /* Creates in-memory db */
// var mockgoose = require('mockgoose');
// mockgoose(mongoose);
//
// before(function(done) {
//     mockgoose(mongoose).then(function() {
//         mongoose.connect('mongodb://localhost/test', function(err) {
//             done(err);
//         });
//     });
// });
describe('Load express server', function () {
  var server
  var UserSchema

  beforeEach(function () {
    server = require('server/server')
    // UserSchema = require('server/models/UserSchema')
  })

  afterEach(function () {
    server.close()
  })

  it ('response to /api/code-public', function testSlash (done) {
    request(server)
      .get('/api/code-public')
      .expect(200, [], done)
  })

  it ('Create code in /api/code-private', function (done) {
    // Redirecciona por la validacion
    request(server)
      .put('/api/code-private')
      .expect(302, done)

//      UserSchema.register(new UserSchema({username: 'demo'}), 'demo123', (err, account) => {
//        console.log('.........')
 //     if (err) {
     //       return res.render('register', {account: account})
     //     }

     //     passport.authenticate('local')(req, res, () => {
     //       res.redirect('/admin')
     //     })
        })

    // request(server)

//  })
})
