/**
 * If p is the perimeter of a right angle triangle with integral length sides, {a,b,c}, there are exactly three solutions for p = 120.
 * 
 * {20,48,52}, {24,45,51}, {30,40,50}
 * 
 * For which value of p ≤ 1000, is the number of solutions maximised?
 * 
 */


// ================================================================================
//    CONSTANTS
// ================================================================================

const P = 1000;


// ================================================================================
//    GENERATORS
// ================================================================================

const squareNumberGenerator = function*(max) {
	for(let i = 1; i <= max; i++) {
		const output = i * i;
		yield i * i;
	}
};


// ================================================================================
//    FUNCTIONS
// ================================================================================

const validateTriangle = (a, b, c) => b + c > a && a + c > b && a + b > c;


// ================================================================================
//    ANSWER
// ================================================================================

const answer = () => {
	
	// a + b >= c is the law for triangle, so the maximum length won't be more than half of triangle, so if max length is 1000, c's length could be maximum 499 (1000 / 2 > c)
	const halfP = P >> 1;
	const squareNumbers = [...squareNumberGenerator(halfP)];
	let solutions = {};
	
	// 
	while(squareNumbers.length > 0) {
		const cIndex = squareNumbers.length - 1;
		const c = cIndex + 1;
		const cSquare = squareNumbers[cIndex];
		
		for(let bIndex = cIndex - 1; bIndex >= 1; bIndex--) {
			const b = bIndex + 1;
			const bSquare = squareNumbers[bIndex];
			const aSquare = cSquare - bSquare;
			const aIndex = squareNumbers.indexOf(aSquare); // TODO : do binary search instead of linear search
			
			// if a exists and a's index should be lesser than b's index, avoiding duplication
			if (aIndex !== -1 && aIndex <= bIndex) {
				const a = aIndex + 1;
				
				if (validateTriangle(a, b, c) && a + b + c <= P) {
					if (typeof solutions[a+b+c] === 'undefined') {
						solutions[a+b+c] = 1;
					} else {
						solutions[a+b+c]++;
					}
				}
			}
		}
		
		// get rid of the last one, because it's impossible to be part of the triangle since this point
		squareNumbers.pop();
	}
	
	let maxP;
	let maxCombinationCount = 0;
	
	for(let p in solutions) {
		const combinationCount = solutions[p];
		if (combinationCount > maxCombinationCount) {
			maxCombinationCount = combinationCount;
			maxP = parseInt(p);
		}
	}
	
	return maxP;
};

console.log(answer());
