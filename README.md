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
nextID(); // -> BA
...
nextID(); // -> $_
nextID(); // -> __
nextID(); // -> A0
```


## API

### idGenerator([options]) ⇒ `function`
Returns a function that will return a new, incrementing identifier each time it is called without arguments, or an identifier
created from a number defined as the first parameter.

Will throw if passed a number that was already used.

The incremental mode will skip any number that was already created.

| Param | Type | Description |
|-------|------|-------------|
| [options.validFirstCharacters] | string | The characters that are valid at the start of the identifier. Defaults to `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$_`.<br>Must not contain duplicate characters. |
| [options.validCharacters] | string | The characters that are valid from the second position in the identifier. Defaults to `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$_0123456789`.<br>Must not contain duplicate characters. |

**Example**

```js
const idGenerator = require('incremental-js-identifier');

const nextPrefixedID = idGenerator({validFirstCharacters: '_'});
nextPrefixedID(); // -> _A
nextPrefixedID(); // -> _B
nextPrefixedID(); // -> _C
```