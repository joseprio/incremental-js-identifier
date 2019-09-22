'use strict';

const incrementalJsIdentifier = require('./incremental-js-identifier');

test('identifier is incremental', () => {
    const idGenerator = incrementalJsIdentifier();
    expect(idGenerator()).toBe('A');
    expect(idGenerator()).toBe('B');
    expect(idGenerator()).toBe('C');
});

test('prefix works as expected', () => {
    const idGenerator = incrementalJsIdentifier({prefix: '_'});
    expect(idGenerator()).toBe('_A');
    expect(idGenerator()).toBe('_B');
    expect(idGenerator()).toBe('_C');
});

test('valid characters works as expected', () => {
    const idGenerator = incrementalJsIdentifier({validFirstCharacters: 'AB', validCharacters: 'CD'});
    expect(idGenerator()).toBe('A');
    expect(idGenerator()).toBe('B');
    expect(idGenerator()).toBe('AC');
    expect(idGenerator()).toBe('AD');
    expect(idGenerator()).toBe('BC');
    expect(idGenerator()).toBe('BD');
    expect(idGenerator()).toBe('ACC');
    expect(idGenerator()).toBe('ACD');
    expect(idGenerator()).toBe('ADC');
});