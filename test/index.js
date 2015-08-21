/* global describe, it */

var assert = require('assert')
var bip66 = require('../')
var fixtures = require('./fixtures')

describe('bip66', function () {
  describe('encode', function () {
    fixtures.valid.forEach(function (f) {
      it('encodes ' + f.DER + ' correctly', function () {
        var r = new Buffer(f.signature.r, 'hex')
        var s = new Buffer(f.signature.s, 'hex')

        var DER = bip66.encode(r, s)
        assert.strictEqual(DER.toString('hex'), f.DER)
      })
    })
  })

  describe('decode', function () {
    fixtures.valid.forEach(function (f) {
      it('decodes ' + f.DER + ' correctly', function () {
        var buffer = new Buffer(f.DER, 'hex')
        var signature = bip66.decode(buffer)

        assert.strictEqual(signature.r.toString('hex'), f.signature.r)
        assert.strictEqual(signature.s.toString('hex'), f.signature.s)
      })
    })

    fixtures.invalid.DER.forEach(function (f) {
      it('throws "' + f.exception + '" for ' + f.hex, function () {
        var buffer = new Buffer(f.hex, 'hex')

        assert.throws(function () {
          bip66.decode(buffer)
        }, new RegExp(f.exception))
      })
    })
  })
})
