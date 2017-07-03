/**
 * 
 * n! means n × (n − 1) × ... × 3 × 2 × 1
 * 
 * For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
 * and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.
 * 
 * Find the sum of the digits in the number 100!
 */


// ================================================================================
//    CONSTANT
// ================================================================================

const FACTORIAL_START = 1; // :P
const FACTORIAL_END = 100;


// ================================================================================
//    CLASSES
// ================================================================================

const Big = require("big.js");


// ================================================================================
//    ANSWER
// ================================================================================

const answer = () => {
	var product = new Big(1);
	
	for(var i = FACTORIAL_START; i <= FACTORIAL_END; i++) {
		product = product.times(i);
	}
	
	const digits = product.toFixed().split('').map(digit => parseInt(digit));
	var result = 0;
	
	for(var i = 0; i < digits.length; i++) {
		result += digits[i];
	}
	
	return result;
	
};

console.log(answer());