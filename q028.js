/**
 * Starting with the number 1 and moving to the right in a clockwise directionm a 5 by 5 spiral is formed as follows:
 * 
 * 21 22 23 24 25
 * 20  7  8  9 10
 * 19  6  1  2 11
 * 18  5  4  3 12
 * 17 16 15 14 13
 * 
 * It can be verified that the sum of the numbers on the diagonals is 101.
 * 
 * What is the sum of the numbers on the diagonals in a 1001 by 1001 spiral formed in the same way?
 * 
 */

// ================================================================================
//    CONSTANTS
// ================================================================================

const LENGTH = 1001;
const CENTER_INDEX = (LENGTH >> 1);
const LOOPS = (LENGTH >> 1);


// ================================================================================
//    MODELS
// ================================================================================

class Loop {
	
	/**
	 * index of loop, e.g. [2,3,4,5,6,7,8,9] is the 1st loop, etc.
	 * 
	 * {int}
	 */
	//index;
	
	/**
	 * count of each side
	 * 
	 * {int}
	 */
	//side;
	
	/**
	 * number of starting number (inclusive)
	 * 
	 * {int}
	 */
	//start;
	
	/**
	 * number of the ending number (inclusive)
	 * 
	 * {int}
	 */
	//end;
	
	static generateLoops(loopsCount) {
		const output = [];
		for(let i = 1; i <= loopsCount; i++) {
			output.push(new Loop(i));
		}
		return output;
	}
	
	static calculateSide(index) {
		return (index << 1) + 1;
	}
	
	static calculateLength(side) {
		return ((side - 1) << 2) - 1;
	}
	
	static calculateStart(side) {
		const prevSide = side - 2;
		return prevSide * prevSide + 1;
	}
	
	constructor(index) {
		const side = Loop.calculateSide(index);
		const length = Loop.calculateLength(side);
		const start = Loop.calculateStart(side);
		const end = start + length;
		
		this.index = index;
		this.side = side;
		this.start = start;
		this.end = end;
	}
	
	getTopLeft() {
		return this.start + (this.side - 1) * 3 - 1;
	}
	
	getTopRight() {
		return this.end;
	}
	
	getBottomLeft() {
		return this.start + (this.side - 1) * 2 - 1;
	}
	
	getBottomRight() {
		return this.start + (this.side - 1) - 1;
	}
	
	getLoopSum() {
		return this.getTopLeft() + this.getTopRight() + this.getBottomLeft() + this.getBottomRight();
	}
}


// ================================================================================
//    ANSWER
// ================================================================================

const answer = () => {
	const loops = Loop.generateLoops(LOOPS);
	let sum = 1;
	for(let i = 0; i < loops.length; i++) {
		const loop = loops[i];
		sum += loop.getLoopSum();
	}
	return sum;
};

console.log(answer());
