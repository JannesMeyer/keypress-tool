# keypress-tool

[![Build Status](https://travis-ci.org/JannesMeyer/keypress-tool.svg?branch=master)](https://travis-ci.org/JannesMeyer/keypress-tool)
[![Dependencies](https://david-dm.org/JannesMeyer/keypress-tool.svg)](https://david-dm.org/JannesMeyer/keypress-tool)
[![Development Dependencies](https://david-dm.org/JannesMeyer/keypress-tool/dev-status.svg)](https://david-dm.org/JannesMeyer/keypress-tool#info=devDependencies)

**Import the module** (ES6 syntax)

~~~js
import KeyPress from 'keypress-tool';
~~~

## KeyPress

~~~js
KeyPress('a', ['ctrl']) === KeyPress('a', ['ctrl']) // true
KeyPress('a', ['ctrl']) === KeyPress('a', ['ctrl', 'shift']) // false
~~~

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