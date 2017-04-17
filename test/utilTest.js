'use strict'

import objectUtil from '../server/common/utils/objectUtil'
const test = require('ava')

test('It should valid the type of input data', t => {
  let reference = ''
  let values = {description: 'world', code: 'code 123'}
  let result = objectUtil.assignValueToObject(reference, values)
  t.is(result, undefined)
})

test('It should assign value to object reference in assignValueToObject', t => {
  let reference = {
    _id: '58f38d60852f851b9eacb7ba',
    title: 'hello',
    code: 'ls -la',
    __v: 0,
    is_edit: false
  }

  let values = {description: 'world', code: 'code 123'}
  let result = objectUtil.assignValueToObject(reference, values)

  t.is(result.description, 'world')
  t.is(result.title, 'hello')
  t.is(result.is_edit, false)
  t.is(result.code, 'code 123')
  t.is(result._id, '58f38d60852f851b9eacb7ba')
})
