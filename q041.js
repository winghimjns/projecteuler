/**
 * 
 * We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once. For example, 2143 is a 4-digit pandigital and is also prime.
 * 
 * What is the largest n-digit pandigital prime that exists?
 * 
 */

// ================================================================================
//    ANALYZE
// ================================================================================

/*

First of all, the largest pandigital number should be 9876543210, which is not a prime number, but for the worst case of the following algorithm, it should be smaller than this number.

first of all, before check it to be prime number, we should make a generator to generate pandigital number, from the max to second-max and so on. When we have found one of them are prime, then return the such number and end the procedure.

For example : 

- 9876543210 (max pandigital number)
- 9876543201 (2nd large one)
- 9876543120 (3rd)
- 9876543102 (4th)
- 9876543021 (5th)
- 9876543012 (6th)
.
.
.


*/


// ================================================================================
//    CONSTANTS
// ================================================================================

const ODD_DIGIT_SET = [...'02468'];
const DIGIT_CHARACTER_SET = '1234567890';


// ================================================================================
//    FUNCTIONS
// ================================================================================

const digitCharSetGenerator = function* (charSet) {
	const original = charSet;
	for(let i = charSet.length; i > 0; i--) {
		const outputChars = original.substr(0, i);
		yield [...outputChars].sort().reverse().join('');
	}
};

const oddPandigitalNumberGenerator = function* (digitsString, topLevel = true) {
	
	if (digitsString.length === 2) {
		const [a, b] = digitsString;
		yield a + b;
		yield b + a;
	} else {
		
		for(let i = 0; i < digitsString.length; i++) {
			const pivot = digitsString[i];
			const restChars = digitsString.substr(0, i) + digitsString.substr(i + 1);

			for(let combination of oddPandigitalNumberGenerator(restChars)) {
				const outputStr = pivot + combination;
				
				// odd number check, ignore if it's an odd number
				if (ODD_DIGIT_SET.includes(outputStr[outputStr.length - 1])) { continue; }
				
				// first character can't be started by zero
				if (outputStr[0] === '0') { continue; }
				
				yield outputStr;
				
			}
			
		}
	}
	
};


const rawCheckPrime = num => {
	for(let i = 3;; i += 2) {
		const test = num / i;
		if (Number.isInteger(test)) { return false; }
		if (i > test) { return true; }
	}
	return true;
};



// ================================================================================
//    ANSWER
// ================================================================================

const answer = () => {
	for(let digitCharSet of digitCharSetGenerator(DIGIT_CHARACTER_SET)) {	
		for (let combinationStr of oddPandigitalNumberGenerator(digitCharSet)) {
			const combination = parseInt(combinationStr);
			if (rawCheckPrime(combination)) { return combination; }
		}
	}
};

console.log(answer());
