import KeyPress from '../keypress-tool';

describe('KeyPress wrapper', () => {
  it('returns same bucket with same options', () => {
    let a = KeyPress('A', 'ctrl');
    let b = KeyPress('A', 'ctrl');
    expect(a).toBe(b);
  });
  it('can add listeners', () => {
    let a = KeyPress('A', 'ctrl');
    a.addListener(function() {
      console.log('Success');
    });
    expect(a.listeners.length).toBe(1);
  });
});