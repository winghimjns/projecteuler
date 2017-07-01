
/**
 * 2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.
 * 
 * What is the sum of the digits of the number 2^1000?
 */

// ================================================================================
//    DATA
// ================================================================================

const Big = require("big.js");


// ================================================================================
//    ANSWER
// ================================================================================

const answer = () => {
	const bigNum = (new Big(2)).pow(1000);
	var sum = 0;
	const digits = bigNum.c;
	for(var i = 0; i < digits.length; i++) {
		sum += digits[i];
	}
	return sum;
};

console.log(answer());
