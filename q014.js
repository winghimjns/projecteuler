
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
//    FUNCTIONS
// ================================================================================

const collatzNext = current => current % 2 === 0 ? current / 2 : current * 3 + 1;


// ================================================================================
//    ANSWER
// ================================================================================

const answer = () => {
	
	var currentAnswer = 1;
	var longest = 0;
	
	for(var i = 2; i < MAX_START; i++) {
		var currentNum = i;
		var currentChainCount = 0;
		
		do {
			
			currentChainCount++;
			
			if(currentNum === currentAnswer) {
				longest += currentChainCount;
				currentAnswer = i;
				break;
			}
			
		} while((currentNum = collatzNext(currentNum)) != 1);
		
		if(currentChainCount > longest) {
			longest = currentChainCount;
			currentAnswer = i;
		}
		
	}
	
	return currentAnswer;
	
};

console.log(answer());
