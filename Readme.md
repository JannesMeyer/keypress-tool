# keypress-tool

[![Build Status](https://travis-ci.org/JannesMeyer/keypress-tool.svg?branch=master)](https://travis-ci.org/JannesMeyer/keypress-tool)
[![Dependencies](https://david-dm.org/JannesMeyer/keypress-tool.svg)](https://david-dm.org/JannesMeyer/keypress-tool)
[![Development Dependencies](https://david-dm.org/JannesMeyer/keypress-tool/dev-status.svg)](https://david-dm.org/JannesMeyer/keypress-tool#info=devDependencies)

[![npm](https://nodei.co/npm/keypress-tool.png?compact=true)](https://www.npmjs.com/package/keypress-tool)

## Usage

```js
import KeyPress from 'keypress-tool';

KeyPress('A', 'ctrl') === KeyPress('A', 'ctrl') // true
KeyPress('A', 'ctrl') === KeyPress('A', 'ctrl', 'shift') // false
```

http://www.quirksmode.org/js/keys.html
Only some keys work in fullscreen in Safari:
tab, enter, space, left, up, right, down, ; = , - . / ` [\ ] '

## Contributing

Download source and compile:

	git clone git@github.com:JannesMeyer/keypress-tool.git
	yarn
	yarn run prepublish

Or compile and watch for file changes:

	yarn start

Run tests:

	yarn test

Please respect the existing formatting and indentation style. Please add tests for code that you contribute. Submit a pull request when you are done.
