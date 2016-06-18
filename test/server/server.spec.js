'use strict'

var request = require('supertest')

describe('Load express server', function () {
  var serverd

  beforeEach(function () {
    serverd = require('server/server')
  })

  afterEach(function () {
    serverd.close()
  })

  it('response to /api/code-public', function testSlash (done) {
    request(serverd)
      .get('/code-public')
      .expect(404, done)
  })
})
