/**
 * 
 * Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n).
 * If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers.
 * 
 * For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.
 * 
 * Evaluate the sum of all the amicable numbers under 10000.
 * 
 */

// ================================================================================
//    DATA
// ================================================================================


const MAX = 10000;


// ================================================================================
//    FUNCTIONS
// ================================================================================

const {getFactors} = require("./lib");

const d = num => {
	const factors = getFactors(num);
	var sum = 0;
	for(var i = 0; i < factors.length; i++) {
		sum += factors[i];
	}
	return sum;
};


// ================================================================================
//    ANSWER
// ================================================================================

const answer = () => {
	const matches = [];
	const checkedNum = [];
	
	for(var i = 1; i <= MAX; i++) {
		
		if(checkedNum.indexOf(i) !== -1) {
			continue;
		}
		
		const b = d(i);
		
		if(b < i) {
			continue;
		}
		
		// well, if the numbers in this condition will not be counted, please mentioned -_-
		else if (b === i) {
			//matches.push(i);
			continue;
		}
		
		else {
			if(d(b) == i) {
				matches.push(i);
				matches.push(b);
				checkedNum.push(b);
			}
		}
	}
	
	// sum
	var sum = 0;
	
	for(var i = 0; i < matches.length; i++) {
		sum += matches[i];
	}
	
	return sum;
	
};

console.log(answer());
