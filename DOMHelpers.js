/**
 * Check if the element is a place where text can be entered
 */
export function isInputElement(el) {
	return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable;
}