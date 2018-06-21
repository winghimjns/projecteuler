/**
 * We shall say that an n-digit DIGIT is pandigital if it makes use of all the digits 1 to n exactly once; for example, 5-digit DIGIT, 15234, is through 5 pandigital.
 * 
 * The product 7254 is unusual, as the identity, 39 x 186 = 7254, containing multiplicand, multiplier, and product is 1 through 9 pandigital.
 * 
 * Find the sum of all products whose multiplicand/multiplier/product identity can be written as a 1 through 9 pandigital.
 * 
 * HINT: Some products can be obtained in more than one way so be sure to only include it once in your sum.
 * 
 */

// ================================================================================
//    CONSTANTS
// ================================================================================

const DIGIT_CHARACTERS = '12345789'; // 9 pandigital


// ================================================================================
//    GENERATORS & ITERATOR
// ================================================================================

const numberCombinationsGenerator = function* (digits) {
	const digitChars = [...digits];
	
	if (digits.length === 2) {
		const [firstChar, secondChar] = digitChars;
		yield `${firstChar}${secondChar}`;
		yield `${secondChar}${firstChar}`;
	} else {
		const [firstChar, ...restChars] = digitChars;
		const output = [];
		const subGenerator = numberCombinationsGenerator(restChars);
		let nextValue = null;
		
		while(nextValue = subGenerator.next().value) {
			yield firstChar + nextValue;
			yield nextValue + firstChar;
		}
	}
};

const numberCombinationsIterator = numberCombinationsGenerator(DIGIT_CHARACTERS);
