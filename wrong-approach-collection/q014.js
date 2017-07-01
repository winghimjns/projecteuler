
/**
 * 
 * The following iterative sequence is defined for the set of positive integers:
 * 
 * n → n/2 (n is even)
 * n → 3n + 1 (n is odd)
 * 
 * Using the rule above and starting with 13, we generate the following sequence:
 * 
 * 13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
 * It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.
 * 
 * Which starting number, under one million, produces the longest chain?
 * 
 * NOTE: Once the chain starts the terms are allowed to go above one million.
 * 
 */

// ================================================================================
//    DATA
// ================================================================================

const MAX_START = 1e6;


// ================================================================================
//    CLASSES
// ================================================================================

const Big = require('big.js');


// ================================================================================
//    FUNCTIONS
// ================================================================================

const collatzNext = current => current.e >= current.c.length || current.c[current.c.length - 1] % 2 === 0 ? current.div(2) : current.times(3).plus(1);


// ================================================================================
//    ANSWER
// ================================================================================

const answer = () => {
	var largestStart = 0;
	for(var i = MAX_START; i > 1; i--) {
		console.log('> ' + i);
		var collatzItemsCount = 1; // count the first one
		var current = new Big(i);

		// keep trying
		while(!(current = collatzNext(current)).eq(1));
		
		// compare, replace it if the current one is larger
		if(current.gt(largestStart)) {
			largestStart = parseInt(current.toFixed());
		}
	}
	
	return largestStart;
};

console.log(answer());
