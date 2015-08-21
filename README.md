# bip66

[![TRAVIS](https://secure.travis-ci.org/bitcoinjs/bip66.png)](http://travis-ci.org/bitcoinjs/bip66)
[![NPM](http://img.shields.io/npm/v/bip66.svg)](https://www.npmjs.org/package/bip66)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Strict DER signature encoding/decoding.t

See [bip66](https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki).


## Example

``` javascript
var bip66 = require('bip66')
var r = new Buffer('1ea1fdff81b3a271659df4aad19bc4ef83def389131a36358fe64b245632e777', 'hex')
var s = new Buffer('29e164658be9ce810921bf81d6b86694785a79ea1e52dbfa5105148d1f0bc1', 'hex')

bip66.encode(r, s)
// Buffer <30 43 02 20 1e a1 fd ff 81 b3 a2 71 65 9d f4 aa d1 9b c4 ef 83 de f3 89 13 1a 36 35 8f e6 4b 24 56 32 e7 77 02 1f 29 e1 64 65 8b e9 ce 81 09 21 bf 81 d6 b8 66 94 78 5a 79 ea 1e 52 db fa 51 05 14 8d 1f 0b c1>

var signature = new Buffer('304302201ea1fdff81b3a271659df4aad19bc4ef83def389131a36358fe64b245632e777021f29e164658be9ce810921bf81d6b86694785a79ea1e52dbfa5105148d1f0bc1', 'hex')
bip66.decode(
// => {
//	r: Buffer <1e a1 fd ff 81 b3 a2 71 65 9d f4 aa d1 9b c4 ef 83 de f3 89 13 1a 36 35 8f e6 4b 24 56 32 e7 77>,
//	s: Buffer <29 e1 64 65 8b e9 ce 81 09 21 bf 81 d6 b8 66 94 78 5a 79 ea 1e 52 db fa 51 05 14 8d 1f 0b c1>
// }
```

A catch-all exception regex:
``` javascript
/Expected DER (integer|sequence)|(R|S) value (excessively padded|is negative)|(R|S|DER sequence) length is (zero|too short|too long|invalid)/
```

## LICENSE [MIT](LICENSE)
