import { isInputElement } from './DOMHelpers';

/**
 * Map from strings to key codes
 */
export enum KeyCode {
	Backspace = 8,
	Tab = 9,
	Clear = 12,
	Enter = 13,
	Return = 13,
	Esc = 27,
	Space = 32,
	Left = 37,
	Up = 38,
	Right = 39,
	Down = 40,
	Del = 46,
	Home = 36,
	End = 35,
	PageUp = 33,
	PageDown = 34,
	// TODO: F1-F12
	',' = 188,
	'.' = 190,
	'/' = 191,
	'`' = 192,
	'-' = 189,
	'=' = 187,
	';' = 186,
	'\'' = 222,
	'[' = 219,
	']' = 221,
	'\\' = 220,
	A = 65,
	B = 66,
	C = 67,
	D = 68,
	E = 69,
	F = 70,
	G = 71,
	H = 72,
	I = 73,
	J = 74,
	K = 75,
	L = 76,
	M = 77,
	N = 78,
	O = 79,
	P = 80,
	Q = 81,
	R = 82,
	S = 83,
	T = 84,
	U = 85,
	V = 86,
	W = 87,
	X = 88,
	Y = 89,
	Z = 90,
}

type option = 'ctrl' | 'meta' | 'alt' | 'shift' | 'macctrl' | 'executeDefault';

interface IListener {
	(ev: Event): void;
	inputEl?: boolean;
}

const isBrowser = (typeof window !== 'undefined');

/**
 * We're using this to determine which modifier key should be used for ctrl key combinations.
 * On Macs the command key is used for key combinations that usually use the ctrl key.
 */
const isMac = (isBrowser && navigator.platform.indexOf('Mac') !== -1);

/**
 * Contains a ListenerBucket for each seen key combination hash
 */
const buckets: { [hashCode: string]: ListenerBucket } = Object.create(null);

/**
 * A container for callbacks
 */
export class ListenerBucket {

	listeners: IListener[] = [];
	keyName: keyof typeof KeyCode;
	keyCode: KeyCode;
	options: Set<option>;
	preventDefault: boolean;

	constructor(char: keyof typeof KeyCode, options: Set<option>) {
		this.keyName = char;
		this.keyCode = KeyCode[char];
		this.options = options;
		this.preventDefault = !options.has('executeDefault');
	}

	addListener(listener: IListener, inputEl?: boolean) {
		if (this.listeners.indexOf(listener) > -1) {
			throw new Error('This listener is already listening. You might have a memory leak in your code.');
		}

		// Save inputEl boolean on the function
		if (inputEl != null) {
			listener.inputEl = inputEl;
		}

		// Save listener
		this.listeners.push(listener);
	}

	removeListener(listener: IListener) {
		let index = this.listeners.indexOf(listener);
		if (index === -1) {
			return;
		}

		// Remove listener
		this.listeners.splice(index, 1);
	}

	toString() {
		let m = this.options;
		if (isMac) {
			return (m.has('ctrl')  ? '⌃' : '') + (m.has('alt')   ? '⌥' : '') +
			       (m.has('shift') ? '⇧' : '') + (m.has('meta')  ? '⌘' : '') +
			       this.keyName;
		} else {
			return (m.has('meta')  ? 'Win+'   : '') + (m.has('ctrl')  ? 'Ctrl+'  : '') +
			       (m.has('alt')   ? 'Alt+'   : '') + (m.has('shift') ? 'Shift+' : '') +
			       this.keyName;
		}
	}

	static hashCode(keyCode: KeyCode, options: Set<option>) {
		return keyCode + '-' +
			(options.has('ctrl')  ? '1' : '0') +
			(options.has('meta') ? '1' : '0') +
			(options.has('shift') ? '1' : '0') +
			(options.has('alt')  ? '1' : '0');
	}

	static hashCodeFromEvent(ev: KeyboardEvent) {
		return ev.keyCode + '-' +
			(ev.ctrlKey  ? '1' : '0') +
			(ev.metaKey  ? '1' : '0') +
			(ev.shiftKey ? '1' : '0') +
			(ev.altKey   ? '1' : '0');
	}

}

/**
 * Get the bucket for this specific key combination
 */
export default function KeyPress(char: keyof typeof KeyCode, ...options: option[]) {
	let m = new Set(options);

	// Do some processing for OS X
	if (isMac && m.has('ctrl')) {
		m.delete('ctrl');
		m.add('meta');
	}
	if (m.has('macctrl')) {
		m.add('ctrl');
	}

	// Compute hash for this key combination
	let hashCode = ListenerBucket.hashCode(KeyCode[char], m);
	let bucket = buckets[hashCode];
	if (bucket == null) {
		bucket = buckets[hashCode] = new ListenerBucket(char, m);
	} else {
		// Update preventDefault, because only one of them is possible
		bucket.preventDefault = !m.has('executeDefault');
	}

	return bucket;
}

function handleKey(this: Window, ev: KeyboardEvent) {
	let hash = ListenerBucket.hashCodeFromEvent(ev);
	let bucket = buckets[hash];
	if (bucket == null || bucket.listeners.length === 0) {
		return;
	}
	
	let el = ev.currentTarget as HTMLElement;
	let listeners = bucket.listeners.filter(lnr => lnr.inputEl || !isInputElement(el));
	if (listeners.length === 0) {
		return;
	}

	if (bucket.preventDefault) {
		ev.stopPropagation();
		ev.preventDefault();
	}
	
	for (let listener of listeners) {
		listener.call(this, ev);
	}
}

export function enable() {
	if (!isBrowser) { return; }
	addEventListener('keydown', handleKey);
}

export function disable() {
	if (!isBrowser) { return; }
	removeEventListener('keydown', handleKey);
}

// Install the event handler
enable();