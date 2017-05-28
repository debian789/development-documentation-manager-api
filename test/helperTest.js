'use strict'

const test = require('ava')

test('should pass', t => {
  t.pass()
})

test('it shoul support async/wait', async t => {
  let p = Promise.resolve(43)
  let secret = await p
  t.is(secret, 43)
})
