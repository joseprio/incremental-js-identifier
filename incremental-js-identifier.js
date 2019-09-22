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
    const prefix = options && options.prefix || '';
    const validFirstCharacters = options && options.validFirstCharacters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$_';
    const validCharacters = options && options.validCharacters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$_0123456789';

    const charIndices = [0];

    return function() {
        let nextID = prefix;

        // Build the next ID
        nextID += validFirstCharacters[charIndices[0]];
        for (let i = 1; i < charIndices.length; i++) {
            nextID += validCharacters[charIndices[i]];
        }

        // Set up the indices for the next one
        for (let i = charIndices.length - 1; i >= 0; i--) {
            if (i > 0) {
                if (charIndices[i] < validCharacters.length - 1) {
                    charIndices[i]++;
                    break;
                }
                // This needs to be reset
                charIndices[i] = 0;
            } else {
                if (charIndices[0] < validFirstCharacters.length - 1) {
                    charIndices[0]++;
                } else {
                    charIndices[0] = 0;
                    charIndices.push(0);
                }
            }
        }

        return nextID;
    };
}

module.exports = incrementalJSIdentifier;