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
const DIGIT_CHARACTER_SET = '9876543210';


// ================================================================================
//    FUNCTIONS
// ================================================================================

const oddPandigitalNumberGenerator = function* (digitsString, topLevel = true) {
	let min = Infinity;
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
				if (parseInt(outputStr) <= min) { min = parseInt(outputStr); } else { throw new Error('fuck'); }
				
				// odd number check
				if (ODD_DIGIT_SET.includes(combination[combination.length - 1])) { continue; }
				yield outputStr;
				
			}
			
		}
	}
	
};


const rawCheckPrime = num => {
	for(let i = 1;; i += 2) {
		const test = num / i;
		if (Number.isInteger(test)) { return false; }
		if (test > i) { break; }
	}
	return true;
};



// ================================================================================
//    ANSWER
// ================================================================================

const answer = () => {
	const digitCharSet = DIGIT_CHARACTER_SET;
	
	do {
		for (let combination of oddPandigitalNumberGenerator(digitCharSet)) {
			console.log(combination);
		}
	} while((digitCharSet = digitCharSet.substr(1 - digitCharSet.length)).length > 1);
	
};

console.log(answer());
