# keypress-tool

[![Build Status](https://travis-ci.org/JannesMeyer/keypress-tool.svg?branch=master)](https://travis-ci.org/JannesMeyer/keypress-tool)
[![Dependencies](https://david-dm.org/JannesMeyer/keypress-tool.svg)](https://david-dm.org/JannesMeyer/keypress-tool)
[![Development Dependencies](https://david-dm.org/JannesMeyer/keypress-tool/dev-status.svg)](https://david-dm.org/JannesMeyer/keypress-tool#info=devDependencies)

[![npm](https://nodei.co/npm/keypress-tool.png?compact=true)](https://www.npmjs.com/package/keypress-tool)

## Usage

```js
import KeyPress from 'keypress-tool';

// Calling it with the same parameters returns identical objects
KeyPress('A', 'ctrl') === KeyPress('A', 'ctrl'); // true
KeyPress('A', 'ctrl') === KeyPress('A', 'ctrl', 'shift'); // false

// Add listeners like this
KeyPress('A', 'shift').addListener(ev => {
  console.log('Key combination pressed');
});

// Set the second parameter to true if this listener should also fire during text input
KeyPress('A').addListener(handleEvent, true);

function handleEvent(event) {
  console.log('Key combination pressed');
}

// Clean up (very important to avoid memory leaks)
KeyPress('A').removeListener(handleEvent);

// The default is to preventDefault. Pass 'executeDefault' if you want to change this
KeyPress('A', 'executeDefault');

// Generate a short description of the key combination
let k = KeyPress('A', 'ctrl', 'shift', 'alt', 'meta');
k.toString(); // 'Win+Ctrl+Alt+Shift+A' on most platforms
k.toString(); // '⌃⌥⇧⌘A' on macOS
```

Only these special keys work in fullscreen in Safari:

  Tab, Enter, Space, Left, Up, Right, Down, ; = , - . / \` \[ \] '

See also:

- [Quirksmode: Detecting keystrokes](http://www.quirksmode.org/js/keys.html)

## Contributing

Download source and compile:

```sh
git clone git@github.com:JannesMeyer/keypress-tool.git
yarn
```

Compile and watch for file changes:

```sh
yarn start
```

Run tests:

```sh
yarn test
```

Pull requests welcome. Please respect the existing formatting and indentation style. Furthermore, please add tests for code that you contribute.

## License

[LGPL v3.0](https://www.gnu.org/licenses/lgpl-3.0.en.html)