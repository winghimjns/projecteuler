/**
 * 
 * Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.
 * 
 * 
 * How many such routes are there through a 20×20 grid?
 * 
 */

// ================================================================================
//    DATA
// ================================================================================

//const GRID_SIZE = 2;
//const GRID_SIZE = 6;
const GRID_SIZE = 20;


// ================================================================================
//    GLOBAL VARIABLE
// ================================================================================

// WTF : this calculation used to calculate for half another, and right now 
// it can be finished under 1 sec with this caching functionality
const calculatedCombinations = (() => {
	const rows = [];
	for(var i = 0; i <= GRID_SIZE; i++) {
		const cols = [];
		for(var j = 0; j <= GRID_SIZE; j++) {
			cols.push(-1);
		}
		rows.push(cols);
	}
	return rows;
})();


// ================================================================================
//    FUNCTIONS
// ================================================================================

const calcWalkCombinations = (left, top, gridSize = GRID_SIZE) => {
	
	if(calculatedCombinations[left][top] !== -1) {
		return calculatedCombinations[left][top];
	}
	
	if(left == gridSize && top == gridSize) {
		// already at goal, can walk anymore
		return 1;
	}
	
	else if(left == gridSize) {
		// can only walk down
		const walkDown = calcWalkCombinations(left, top + 1, gridSize);
		calculatedCombinations[left][top + 1] = walkDown;
		return walkDown;
	}
	
	else if(top == gridSize) {
		// can only walk right
		const walkRight = calcWalkCombinations(left + 1, top, gridSize);
		calculatedCombinations[left + 1][top] = walkRight;
		return walkRight;
	}
	
	// return the sum of count of combinations to walk right and down
	const walkRight = calcWalkCombinations(left + 1, top, gridSize);
	calculatedCombinations[left + 1][top] = walkRight;
	const walkDown = calcWalkCombinations(left, top + 1, gridSize);
	calculatedCombinations[left][top + 1] = walkDown;
	
	return walkDown + walkRight;
	
};

// ================================================================================
//    ANSWER
// ================================================================================

const answer = () => calcWalkCombinations(0,0);

console.log(answer());

//var i = 10;
//console.log(' > ' + i + "\t: " + calcWalkCombinations(0,0,i++));
//console.log(' > ' + i + "\t: " + calcWalkCombinations(0,0,i++));
//console.log(' > ' + i + "\t: " + calcWalkCombinations(0,0,i++));
//console.log(' > ' + i + "\t: " + calcWalkCombinations(0,0,i++));
//console.log(' > ' + i + "\t: " + calcWalkCombinations(0,0,i++));
//console.log(' > ' + i + "\t: " + calcWalkCombinations(0,0,i++));
//console.log(' > ' + i + "\t: " + calcWalkCombinations(0,0,i++));
//console.log(' > ' + i + "\t: " + calcWalkCombinations(0,0,i++));
//console.log(' > ' + i + "\t: " + calcWalkCombinations(0,0,i++));
//console.log(' > ' + i + "\t: " + calcWalkCombinations(0,0,i++));
//console.log(' > ' + i + "\t: " + calcWalkCombinations(0,0,i++));
//console.log(' > ' + i + "\t: " + calcWalkCombinations(0,0,i++));
//console.log(' > ' + i + "\t: " + calcWalkCombinations(0,0,i++));
//console.log(' > ' + i + "\t: " + calcWalkCombinations(0,0,i++));
//console.log(' > ' + i + "\t: " + calcWalkCombinations(0,0,i++));
//console.log(' > ' + i + "\t: " + calcWalkCombinations(0,0,i++));
//console.log(' > ' + i + "\t: " + calcWalkCombinations(0,0,i++));
//console.log(' > ' + i + "\t: " + calcWalkCombinations(0,0,i++));
//console.log(' > ' + i + "\t: " + calcWalkCombinations(0,0,i++));
//console.log(' > ' + i + "\t: " + calcWalkCombinations(0,0,i++));
