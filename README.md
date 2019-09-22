# incremental-js-identifier

[![NPM Version](https://img.shields.io/npm/v/incremental-js-identifier.svg)](https://www.npmjs.com/package/incremental-js-identifier)

Utility to create incremental JS identifiers

## Installation

```sh
# npm
npm install incremental-js-identifier --save-dev

# yarn
yarn add incremental-js-identifier --dev
```


## Usage

```js
const idGenerator = require('incremental-js-identifier');
const nextID = idGenerator();

nextID(); // -> A
nextID(); // -> B
nextID(); // -> C
...
nextID(); // -> _
nextID(); // -> AA
...
nextID(); // -> A_
nextID(); // -> A0
```


## API

### idGenerator([options]) ⇒ `function`
Returns a function that will return a new, incrementing identifier each time it is called.

| Param | Type | Description |
|-------|------|-------------|
| [options.prefix] | string | A prefix to prepend to every generated identifier. |
| [options.validFirstCharacters] | string | The characters that are valid at the start of the identifier. Defaults to `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$_`.<br>Must not contain duplicate characters. |
| [options.validCharacters] | string | The characters that are valid from the second position in the identifier. Defaults to `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$_0123456789`.<br>Must not contain duplicate characters. |

**Example**

```js
const idGenerator = require('incremental-js-identifier');

const nextPrefixedID = idGenerator({prefix: '_'});
nextPrefixedID(); // -> _A
nextPrefixedID(); // -> _B
nextPrefixedID(); // -> _C
```