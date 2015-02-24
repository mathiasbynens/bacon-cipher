# bacon-cipher [![Build status](https://travis-ci.org/mathiasbynens/bacon-cipher.svg?branch=master)](https://travis-ci.org/mathiasbynens/bacon-cipher) [![Dependency status](https://gemnasium.com/mathiasbynens/bacon-cipher.svg)](https://gemnasium.com/mathiasbynens/bacon-cipher)

_bacon-cipher_ is a JavaScript implementation of [Bacon’s cipher, a.k.a. the Baconian cipher](http://en.wikipedia.org/wiki/Bacon's_cipher). It can be used to encode plaintext to Bacon-ciphertext, or the other way around (i.e. decoding). [Here’s an online demo.](https://mothereff.in/bacon)

By default it uses the most common Bacon cipher alphabet, i.e. `ABCDEFGHIKLMNOPQRSTUWXYZ` (24 letters). This boils down to the following translations:

```
a   AAAAA   g     AABBA   n    ABBAA   t     BAABA
b   AAAAB   h     AABBB   o    ABBAB   u-v   BAABB
c   AAABA   i-j   ABAAA   p    ABBBA   w     BABAA
d   AAABB   k     ABAAB   q    ABBBB   x     BABAB
e   AABAA   l     ABABA   r    BAAAA   y     BABBA
f   AABAB   m     ABABB   s    BAAAB   z     BABBB
```

## Installation

Via [npm](https://www.npmjs.com/):

```bash
npm install bacon-cipher
```

Via [Bower](http://bower.io/):

```bash
bower install bacon-cipher
```

Via [Component](https://github.com/component/component):

```bash
component install mathiasbynens/bacon-cipher
```

In a browser:

```html
<script src="bacon.js"></script>
```

In [Narwhal](http://narwhaljs.org/), [Node.js](https://nodejs.org/), and [RingoJS](http://ringojs.org/):

```js
var bacon = require('bacon-cipher');
```

In [Rhino](http://www.mozilla.org/rhino/):

```js
load('bacon.js');
```

Using an AMD loader like [RequireJS](http://requirejs.org/):

```js
require(
  {
    'paths': {
      'bacon': 'path/to/bacon'
    }
  },
  ['bacon'],
  function(bacon) {
    console.log(bacon);
  }
);
```

## API

### `bacon.version`

A string representing the semantic version number.

### `bacon.encode(text, options)`

This function takes a string of text (the `text` parameter) and encrypts it using Bacon’s cipher.

```js
bacon.encode('steganography');
// → 'BAAABBAABAAABAAAABBAAAAAAABBAAABBABAABBABAAAAAAAAAABBBAAABBBBABBA'
```

By default it uses the most common Bacon cipher alphabet, i.e. `ABCDEFGHIKLMNOPQRSTUWXYZ` (24 letters). In this case instances of `J` are replaced with `I`, and instances of `V` are replaced with `U` before further encoding the input string.

```js
bacon.encode('James Vendetta');
// → 'ABAAAAAAAAABABBAABAABAAAB BAABBAABAAABBAAAAABBAABAABAABABAABAAAAAA'
```

It’s possible to pass an (optional) `options` object with an `alphabet` property to override the cipher alphabet. Note that in that case, no preprocessing (like replacing `j` and `v`) is done. For example, to use the full 26-letter alphabet:

```js
bacon.encode('James Vendetta', {
  'alphabet': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
});
// → 'ABAABAAAAAABBAAAABAABAABA BABABAABAAABBABAAABBAABAABAABBBAABBAAAAA'
```

### `bacon.decode(text, options)`

This function takes a string of text (the `text` parameter) and decrypts it using Bacon’s cipher.

By default it uses the most common Bacon cipher alphabet, i.e. `ABCDEFGHIKLMNOPQRSTUWXYZ` (24 letters).

```js
bacon.decode('BAAABBAABAAABAAAABBAAAAAAABBAAABBABAABBABAAAAAAAAAABBBAAABBBBABBA');
// → 'STEGANOGRAPHY'

bacon.decode('ABAAAAAAAAABABBAABAABAAAB BAABBAABAAABBAAAAABBAABAABAABABAABAAAAAA');
// → 'IAMES UENDETTA'
```

It’s possible to pass an (optional) `options` object with an `alphabet` property to override the cipher alphabet. For example, to use the full 26-letter alphabet:

```js
bacon.decode('ABAABAAAAAABBAAAABAABAABA BABABAABAAABBABAAABBAABAABAABBBAABBAAAAA', {
  'alphabet': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
});
// → 'JAMES VENDETTA'
```

### Using the `bacon` binary

To use the `bacon` binary in your shell, simply install _bacon-cipher_ globally using npm:

```bash
npm install -g bacon-cipher
```

After that you will be able to use Bacon’s cipher from the command line:

```bash
$ bacon --encode 'foo bar baz'
AABABABBABABBAB AAAABAAAAABAAAA AAAABAAAAABABBB

$ bacon --decode 'AABABABBABABBAB AAAABAAAAABAAAA AAAABAAAAABABBB'
FOO BAR BAZ

$ bacon --encode --alphabet=ABCDEFGHIJKLMNOPQRSTUVWXYZ 'Julius Caesar'
ABAABBABAAABABBABAAABABAABAABA AAABAAAAAAAABAABAABAAAAAABAAAB

$ bacon --decode --alphabet=ABCDEFGHIJKLMNOPQRSTUVWXYZ 'ABAABBABAAABABBABAAABABAABAABA AAABAAAAAAAABAABAABAAAAAABAAAB'
JULIUS CAESAR
```

Read a local text file, encrypt it using Bacon’s cipher with a non-default cipher alphabet, and save the result to a new file:

```bash
$ bacon --encode < foo.txt > foo-bacon.txt
```

Or do the same with an online text file:

```bash
$ curl -sL 'https://mths.be/brh' | bacon --encode > bacon.txt
```

Or, the opposite — read a local file containing Bacon ciphertext, decode it back to plain text, and save the result to a new file:

```bash
$ bacon --decode < bacon.txt > original.txt
```

See `bacon --help` for the full list of options.

## Support

_bacon_ is designed to work in at least Node.js v0.10.0, Narwhal 0.3.2, RingoJS 0.8-0.9, PhantomJS 1.9.0, Rhino 1.7RC4, as well as old and modern versions of Chrome, Firefox, Safari, Opera, and Internet Explorer.

## Unit tests & code coverage

After cloning this repository, run `npm install` to install the dependencies needed for development and testing. You may want to install Istanbul _globally_ using `npm install istanbul -g`.

Once that’s done, you can run the unit tests in Node using `npm test` or `node tests/tests.js`. To run the tests in Rhino, Ringo, Narwhal, and web browsers as well, use `grunt test`.

To generate the code coverage report, use `grunt cover`.

## Notes

This project inspired Joseph Werle to create [a C implementation of the Baconian cipher](https://github.com/jwerle/libbacon). Check it out!

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |

## License

_bacon_ is available under the [MIT](https://mths.be/mit) license.
