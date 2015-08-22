/* global describe, it */

var assert = require('assert')
var bip66 = require('../')
var fixtures = require('./fixtures')

describe('bip66', function () {
  describe('check', function () {
    fixtures.valid.forEach(function (f) {
      it('returns true for ' + f.DER, function () {
        var buffer = new Buffer(f.DER, 'hex')

        assert.strictEqual(bip66.check(buffer), true)
      })
    })

    fixtures.invalid.decode.forEach(function (f) {
      it('returns false for ' + f.DER + ' (' + f.exception + ')', function () {
        var buffer = new Buffer(f.DER, 'hex')

        assert.strictEqual(bip66.check(buffer), false)
      })
    })
  })

  describe('decode', function () {
    fixtures.valid.forEach(function (f) {
      it('decodes ' + f.DER, function () {
        var buffer = new Buffer(f.DER, 'hex')
        var signature = bip66.decode(buffer)

        assert.strictEqual(signature.r.toString('hex'), f.r)
        assert.strictEqual(signature.s.toString('hex'), f.s)
      })
    })

    fixtures.invalid.decode.forEach(function (f) {
      it('throws "' + f.exception + '" for ' + f.DER, function () {
        var buffer = new Buffer(f.DER, 'hex')

        assert.throws(function () {
          bip66.decode(buffer)
        }, new RegExp(f.exception))
      })
    })
  })

  describe('encode', function () {
    fixtures.valid.forEach(function (f) {
      it('encodes ' + f.r + ', ' + f.s, function () {
        var r = new Buffer(f.r, 'hex')
        var s = new Buffer(f.s, 'hex')

        var DER = bip66.encode(r, s)
        assert.strictEqual(DER.toString('hex'), f.DER)
      })
    })

    fixtures.invalid.encode.forEach(function (f) {
      it('throws "' + f.exception + '" for ' + f.r + ', ' + f.s, function () {
        var r = new Buffer(f.r, 'hex')
        var s = new Buffer(f.s, 'hex')

        assert.throws(function () {
          bip66.encode(r, s)
        }, new RegExp(f.exception))
      })
    })
  })
})
