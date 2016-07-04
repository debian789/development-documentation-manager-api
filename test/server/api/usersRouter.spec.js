var request = require('supertest')
var async = require('async');
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var mails = require('server/config/mails');
var expect = require('chai').expect;

mockgoose(mongoose);

function MailStub(options) {
  this.options = options || {};
  this.name = "MailStub";
}

MailStub.prototype.send = function(mail, cb) {
  if (this.options.customCallback) {
    this.options.customCallback(mail)
  }
  cb(null);
}

var app = require('server/server')()
describe('Users API test  ', function() {
  beforeEach(function() {
      mockgoose.reset()
  })

  describe('Users API', function() {
    it('should register users and send validation email', function(done) {
      var lastMail = {}
      mails.init(new MailStub({
        customCallback: function(mail) {
          lastMail = mail
        }
      }),
      {
        statics: {baseuri: "http://localhost/"}
      })

      async.series([
        function(callback){
          request(app)
            .post('/api/users')
            .send({"username": "neozaru", "email": "neozaru@mailoo.org", "password": "mypassword"})
            .expect(200)
            .end(function(err, res) {
              expect(res.body).to.have.property("_id");
              expect(res.body).to.have.property("username", "neozaru");
              expect(res.body).to.have.property("email", "neozaru@mailoo.org");
               return err ? done(err) : callback();
            })
        },
        function(callback){
          expect(lastMail).to.not.be.empty;
          expect(lastMail.data).to.have.property("to", "neozaru@mailoo.org");
          expect(lastMail.data.subject).to.not.be.empty;
          expect(lastMail.data.text).to.not.be.empty;
          expect(lastMail.data.html).to.not.be.empty;
          done();
        }
      ])
    })

    it('should not register users with wrong username, password or email', function(done) {
      async.series([
        function(callback){
          request(app)
            .post('/api/users')
            .send({"username": "neozaru", "email": "neozaru@mailoo.org"})
            .expect(400, function(err) {
              return err ? done(err) : callback();
            });
        },
        function(callback){
          request(app)
            .post('/api/users')
            .send({"username": "neozaru", "password": "mypassword"})
            .expect(400, function(err) {
              return err ? done(err) : callback();
            });
        },
        function(callback){
          request(app)
            .post('/api/users')
            /* Password too short */
            .send({"username": "neozaru", "email": "neozaru@mailoo.org", "password": "aa"})
            /* 500 doesn't seem good as error code */
            .expect(400, function(err) {
              return err ? done(err) : callback();
            });
        },
         function(callback){
           request(app)
             .post('/api/users')
             /* Username too short */
             .send({"username": "neo", "email": "neozaru@mailoo.org", "password": "aaaaaa"})
             /* 500 doesn't seem good as error code */
             .expect(400, function(err) {
               return err ? done(err) : callback();
             });
         },
         function(callback){
           request(app)
             .post('/api/users')
             /* Username missing */
             .send({"email": "neozaru@mailoo.org", "password": "aaaaaa"})
             /* 500 doesn't seem good as error code */
             .expect(200, function(err) {
               return err ? done(err) : callback();
             });
         },
         function(callback){
           request(app)
             .post('/api/users')
             .send({"username": "neozaru", "email": "neozaruArobasemailoo.org", "password": "mypassword"})
             .expect(400, function(err) {
               done(err);
             });
         }
      ])
    });

    it('should activate registered users', function(done) {
      var lastMail = {};
      mails.init(new MailStub({
        customCallback: function(mail) {
          lastMail = mail;
        }
      }),
      {
        statics: {baseuri: "http://localhost/"}
      });

      var userid = 0;
      /* I saw the future */
      async.series([
        function(callback){
          request(app)
            .post('/api/users')
            .send({"username": "neozaru", "email": "neozaru@mailoo.org", "password": "mypassword"})
            .expect(200)
            .end(function(err, res) {
              userid = res.body._id;
              return err ? done(err) : callback();
            })
        },
        function(callback){
          expect(lastMail.data.text).to.not.be.empty;
          /* Extract validation token */
          var pattern = new RegExp(/&token=([a-z0-9]+)/);
          var matches = lastMail.data.text.match(pattern);
          var token = matches[1];

          request(app)
            .post('/api/users/'+userid+'/activate')
            .send({token: token})
            .expect(200)
            .end(function(err, res) {
              done(err);
            })
        }
      ])
    })

    it('should not activate when no token', function(done) {
      var userid = 0;
      /* I saw the future */

      async.series([
        function(callback){
          request(app)
            .post('/api/users')
            .send({"username": "neozaru", "email": "neozaru@mailoo.org", "password": "mypassword"})
            .expect(200)
            .end(function(err, res) {
              userid = res.body._id;
              return err ? done(err) : callback();
            })
        },
        function(callback){
          request(app)
            .post('/api/users/'+userid+'/activate')
            .expect(400)
            .end(done);
        }
      ])
    });

    it('should not activate when wrong token', function(done) {
      var userid = 0;
      /* I saw the future */
      async.series([
        function(callback){
          request(app)
            .post('/api/users')
            .send({"username": "neozaru", "email": "neozaru@mailoo.org", "password": "mypassword"})
            .expect(200)
            .end(function(err, res) {
              userid = res.body._id;
              return err ? done(err) : callback();
            })
        },
        function(callback){
          request(app)
            .post('/api/users/'+userid+'/activate')
            .send({token: "BADTOKEN"})
            .expect(400)
            .end(done);
        }
      ])
    })

    it('should not activate when wrong user id', function(done) {

      var userid = 0;
      /* I saw the future */
      async.series([
        function(callback) {
          request(app)
            .post('/api/users/aaaaaa/activate')
            .send({token: "WHATEVER"})
            .expect(400)
            .end(done);
        }
      ])
    })
  })
})
