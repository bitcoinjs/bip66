var test = require('tape')
var bip66 = require('../')
var fixtures = require('./fixtures')

fixtures.valid.forEach(function (fixture) {
  test('check: returns true for ' + fixture.DER, function (t) {
    var buffer = new Buffer(fixture.DER, 'hex')
    t.same(bip66.check(buffer), true)
    t.end()
  })

  test('decode: ' + fixture.DER, function (t) {
    var buffer = new Buffer(fixture.DER, 'hex')
    var signature = bip66.decode(buffer)
    t.same(signature.r.toString('hex'), fixture.r)
    t.same(signature.s.toString('hex'), fixture.s)
    t.end()
  })

  test('encode: ' + fixture.r + ', ' + fixture.s, function (t) {
    var r = new Buffer(fixture.r, 'hex')
    var s = new Buffer(fixture.s, 'hex')
    var DER = bip66.encode(r, s)
    t.same(DER.toString('hex'), fixture.DER)
    t.end()
  })
})

fixtures.invalid.decode.forEach(function (fixture) {
  test('check: returns false for ' + fixture.DER + ' (' + fixture.exception + ')', function (t) {
    var buffer = new Buffer(fixture.DER, 'hex')
    t.same(bip66.check(buffer), false)
    t.end()
  })

  test('throws "' + fixture.exception + '" for ' + fixture.DER, function (t) {
    var buffer = new Buffer(fixture.DER, 'hex')
    t.throws(function () {
      bip66.decode(buffer)
    }, new RegExp(fixture.exception))
    t.end()
  })
})

fixtures.invalid.encode.forEach(function (fixture) {
  test('throws "' + fixture.exception + '" for ' + fixture.r + ', ' + fixture.s, function (t) {
    var r = new Buffer(fixture.r, 'hex')
    var s = new Buffer(fixture.s, 'hex')
    t.throws(function () {
      bip66.encode(r, s)
    }, new RegExp(fixture.exception))
    t.end()
  })
})
