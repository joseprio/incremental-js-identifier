'use strict';

// An identifier must start with $, _, or any character in the Unicode categories
// “Uppercase letter (Lu)”, “Lowercase letter (Ll)”, “Titlecase letter (Lt)”, 
// “Modifier letter (Lm)”, “Other letter (Lo)”, or “Letter number (Nl)”.
//
// The rest of the string can contain the same characters, plus any U+200C zero
// width non-joiner characters, U+200D zero width joiner characters, and characters
// in the Unicode categories “Non-spacing mark (Mn)”, “Spacing combining mark
// (Mc)”, “Decimal digit number (Nd)”, or “Connector punctuation (Pc)”.
//
// This utility tries to generate valid JS identifiers that are as small as
// possible in bytes. For simplicity, no Unicode characters are used.

function incrementalJSIdentifier(options) {
    const validFirstCharacters = options && options.validFirstCharacters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$_';
    const validCharacters = options && options.validCharacters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$_0123456789';

    let counter = 0;
	const calculatedNumbers = new Set();

	function compute(fromNumber, isFirst = true) {
		const characters = isFirst ? validFirstCharacters : validCharacters;
		const divided = Math.floor(fromNumber / characters.length);
		const remainder = fromNumber % characters.length;
        return `${characters[remainder]}${divided > 0 ? compute(divided - 1, false) : ''}`;
    }

    const computator = function(fromNumber) {
        if (fromNumber != null) {
            // Arbitrary generation
            if (fromNumber < counter || calculatedNumbers.has(counter)) {
                throw new Error(`Already computed number ${fromNumber}`);
            }
            calculatedNumbers.add(fromNumber);
            if (fromNumber === counter) {
                counter++;
            }
            return compute(fromNumber);
        }

        // Incremental generation
        const nextID = compute(counter);
        do {
			// Clean up arbitrarily generated if needed
            calculatedNumbers.delete(counter);
            counter++;
        } while (calculatedNumbers.has(counter));
        return nextID;
    };

    computator.combinationsFor = function(numCharacters) {
        if (numCharacters < 1) {
            throw new Error('Number must be larger than zero');
        }
        let total = 0;
        for (let c=0; c<numCharacters; c++) {
            total += validFirstCharacters.length * Math.pow(validCharacters.length, c);
        }
        if (total > Number.MAX_SAFE_INTEGER) {
            throw new Error('Combinations exceed the maximum safe integer');
        }
        return total;
    };
    return computator;
}

module.exports = incrementalJSIdentifier;
