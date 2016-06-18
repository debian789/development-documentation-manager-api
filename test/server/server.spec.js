'use strict'

var request = require('supertest')

describe('Load express server', function () {
  var server

  beforeEach(function () {
    server = require('server/server')
  })

  afterEach(function () {
    server.close()
  })

  it('response to /api/code-public', function testSlash (done) {
    request(server)
      .get('/api/code-public')
      .expect(200, [], done)
  })
})
