# keypress-tool

[![Build Status](https://travis-ci.org/JannesMeyer/keypress-tool.svg?branch=master)](https://travis-ci.org/JannesMeyer/keypress-tool)
[![Dependencies](https://david-dm.org/JannesMeyer/keypress-tool.svg)](https://david-dm.org/JannesMeyer/keypress-tool)
[![Development Dependencies](https://david-dm.org/JannesMeyer/keypress-tool/dev-status.svg)](https://david-dm.org/JannesMeyer/keypress-tool#info=devDependencies)

[![npm](https://nodei.co/npm/keypress-tool.png?compact=true)](https://www.npmjs.com/package/keypress-tool)

## Usage

```js
import KeyPress from 'keypress-tool';

KeyPress('a', ['ctrl']) === KeyPress('a', ['ctrl']) // true
KeyPress('a', ['ctrl']) === KeyPress('a', ['ctrl', 'shift']) // false
```

Options can be an Array with combinations of the following values:

- `'ctrl'`
- `'alt'`
- `'shift'`
- `'meta'`
- `'macctrl'`
- `'executeDefault'`


http://www.quirksmode.org/js/keys.html
Only some keys work in fullscreen in Safari:
tab, enter, space, left, up, right, down, ; = , - . / ` [\ ] '

## Contributing

Download source and compile:

	git clone git@github.com:[USERNAME]/keypress-tool.git
	make

Watch for changes and recompile:

	make watch

Run tests:

	npm test
