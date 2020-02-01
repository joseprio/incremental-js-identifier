'use strict';

const incrementalJsIdentifier = require('./incremental-js-identifier');

test('identifier is incremental', () => {
    const idGenerator = incrementalJsIdentifier();
    expect(idGenerator()).toBe('A');
    expect(idGenerator()).toBe('B');
    expect(idGenerator()).toBe('C');
});

test('incrementing valid characters works as expected', () => {
    const idGenerator = incrementalJsIdentifier({validFirstCharacters: 'AB', validCharacters: 'CDE'});
    expect(idGenerator()).toBe('A');
    expect(idGenerator()).toBe('B');
    expect(idGenerator()).toBe('AC');
    expect(idGenerator()).toBe('BC');
    expect(idGenerator()).toBe('AD');
    expect(idGenerator()).toBe('BD');
    expect(idGenerator()).toBe('AE');
    expect(idGenerator()).toBe('BE');
    expect(idGenerator()).toBe('ACC');
    expect(idGenerator()).toBe('BCC');
    expect(idGenerator()).toBe('ADC');
    expect(idGenerator()).toBe('BDC');
    expect(idGenerator()).toBe('AEC');
    expect(idGenerator()).toBe('BEC');
    expect(idGenerator()).toBe('ACD');
    expect(idGenerator()).toBe('BCD');
    expect(idGenerator()).toBe('ADD');
    expect(idGenerator()).toBe('BDD');
    expect(idGenerator()).toBe('AED');
    expect(idGenerator()).toBe('BED');
    expect(idGenerator()).toBe('ACE');
    expect(idGenerator()).toBe('BCE');
    expect(idGenerator()).toBe('ADE');
    expect(idGenerator()).toBe('BDE');
    expect(idGenerator()).toBe('AEE');
    expect(idGenerator()).toBe('BEE');
    expect(idGenerator()).toBe('ACCC');
});


test('arbitrary and generated identifiers work well together', () => {
    const idGenerator = incrementalJsIdentifier({validFirstCharacters: 'AB', validCharacters: 'CDE'});
    expect(() => idGenerator(-1)).toThrow();
    expect(idGenerator()).toBe('A');
    expect(idGenerator()).toBe('B');
    expect(() => idGenerator(0)).toThrow(); // Arbitrary ID already exists
    expect(() => idGenerator(1)).toThrow(); // Arbitrary ID already exists
    expect(idGenerator(2)).toBe('AC'); // Arbitrary ID 
    expect(() => idGenerator(2)).toThrow(); // Arbitrary ID already exists
    expect(idGenerator()).toBe('BC'); // Generated ID will skip one
});