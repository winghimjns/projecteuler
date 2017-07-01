/**
 * 
 * The sequence of triangle numbers is generated by adding the natural numbers. So the 7th triangle number would be 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28. The first ten terms would be:
 * 
 * 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...
 * 
 * Let us list the factors of the first seven triangle numbers:
 * 
 *  1: 1
 *  3: 1,3
 *  6: 1,2,3,6
 * 10: 1,2,5,10
 * 15: 1,3,5,15
 * 21: 1,3,7,21
 * 28: 1,2,4,7,14,28
 * We can see that 28 is the first triangle number to have over five divisors.
 * 
 * What is the value of the first triangle number to have over five hundred divisors?
 * 
 */

// ================================================================================
//    FUNCTIONS
// ================================================================================

const nextTriangleNumber = (current = 0, nextIndex = 1) => current + nextIndex;
const countFactors = num => {
	var count = 0;
	var limit = num >> 1;
	for(var i = 1; i < limit; i++) {
		if(num % i === 0) {
			count++;
		}
	}
	
	return count;
};


// ================================================================================
//    CONSTANTS
// ================================================================================

const FACTOR_GOAL = 500;



// ================================================================================
//    ANSWER
// ================================================================================

const answer = () => {
	var current = 0;
	for(var i = 1;; i++) {
		current = nextTriangleNumber(current, i);
		const count = countFactors(current);
		
		if(count >= FACTOR_GOAL) {
			return current;
		}
	}
};

console.log(answer());

// item 12375, the answer is 76576500, which has 574 facters
// this took me half an hour to finish the calculation