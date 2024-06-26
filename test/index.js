import tape from 'tape'
import { check, decode, encode } from '../src/esm/index.js'
import fixtures from './fixtures.json' assert { type: 'json' }
const { valid, invalid } = fixtures

valid.forEach(function (fixture) {
  tape('check: returns true for ' + fixture.DER, function (t) {
    const buffer = Buffer.from(fixture.DER, 'hex')
    t.same(check(buffer), true)
    t.end()
  })

  tape('decode: ' + fixture.DER, function (t) {
    const buffer = Buffer.from(fixture.DER, 'hex')
    const signature = decode(buffer)
    t.same(signature.r.toString('hex'), fixture.r)
    t.same(signature.s.toString('hex'), fixture.s)
    t.end()
  })

  tape('encode: ' + fixture.r + ', ' + fixture.s, function (t) {
    const r = Buffer.from(fixture.r, 'hex')
    const s = Buffer.from(fixture.s, 'hex')
    const DER = Buffer.from(encode(r, s))
    t.same(DER.toString('hex'), fixture.DER)
    t.end()
  })
})

invalid.decode.forEach(function (fixture) {
  tape('check: returns false for ' + fixture.DER + ' (' + fixture.exception + ')', function (t) {
    const buffer = Buffer.from(fixture.DER, 'hex')
    t.same(check(buffer), false)
    t.end()
  })

  tape('throws "' + fixture.exception + '" for ' + fixture.DER, function (t) {
    const buffer = Buffer.from(fixture.DER, 'hex')
    t.throws(function () {
      decode(buffer)
    }, new RegExp(fixture.exception))
    t.end()
  })
})

invalid.encode.forEach(function (fixture) {
  tape('throws "' + fixture.exception + '" for ' + fixture.r + ', ' + fixture.s, function (t) {
    const r = Buffer.from(fixture.r, 'hex')
    const s = Buffer.from(fixture.s, 'hex')
    t.throws(function () {
      encode(r, s)
    }, new RegExp(fixture.exception))
    t.end()
  })
})
