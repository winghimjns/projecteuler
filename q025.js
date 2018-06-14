/**
 * The Fibonacci sequence is defined by the recurrence relation:
 * 
 * Fn = Fn−1 + Fn−2, where F1 = 1 and F2 = 1.
 * Hence the first 12 terms will be:
 * 
 * F1 = 1
 * F2 = 1
 * F3 = 2
 * F4 = 3
 * F5 = 5
 * F6 = 8
 * F7 = 13
 * F8 = 21
 * F9 = 34
 * F10 = 55
 * F11 = 89
 * F12 = 144
 * The 12th term, F12, is the first term to contain three digits.
 * 
 * What is the index of the first term in the Fibonacci sequence to contain 1000 digits?
 * 
 */

// ================================================================================
//    MODELS
// ================================================================================

/** 
 * the way i am going to solved it is to build my "big integer like" class.
 * I did solve some question with some online resources. But I think I should stop now.
 * it's good to see that JavaScript is now support BigInt. But anyway...~
 * 
 * This big integer should only be used in this problem. it's unable to calculate operations except adding,
 * and it's unable to calculate decimals
 * 
 */
 
let gg = 0;
class BigInteger {
	
	static fromArrayInt(numbers) {
		const instance = new BigInteger(0);
		instance.numbers = numbers;
		return instance;
	}
	
	constructor(numbers = 0) {
		this.numbers = [...(numbers + '')].map(numStr => parseInt(numStr)).reverse();
	}
	
	add(object) {
		
		// casting
		if (typeof object === 'number') { object = new BigInteger(object); }

		const newInstanceNumbers = [];

		let addingDigit = 0;
		let digit = 0;
		
		while(digit < this.numbers.length || digit < object.numbers.length) {
			
			const thisValueTemp = this.numbers[digit];
			const thisValue = typeof thisValueTemp !== 'undefined' ? thisValueTemp : 0;
			
			const objectValueTemp = object.numbers[digit];
			const objectValue = typeof objectValueTemp !== 'undefined' ? objectValueTemp : 0;
			
			const tempAdding = thisValue + objectValue + addingDigit;
			addingDigit = Math.floor(tempAdding / 10);

			newInstanceNumbers.push(tempAdding % 10);
			
			digit++;
		}
		
		if (addingDigit !== 0) {
			newInstanceNumbers.push(addingDigit);
		}
		
		return BigInteger.fromArrayInt(newInstanceNumbers);
	}
	
	length() {
		return this.numbers.length;
	}
	
	toString() {
		return [...this.numbers].reverse().join('');
	}
	
	clone() {
		const newInstance = new BigInteger(0);
		newInstance.numbers = [...this.numbers];
		return newInstance;
	}
	
}

// ================================================================================
//    VARIABLES
// ================================================================================

const getFibonacciCache = {};


// ================================================================================
//    FUNCTIONS
// ================================================================================

const getFibonacci = n => {
	if (getFibonacciCache.hasOwnProperty(n)) { return getFibonacciCache[n]; }
	
	if (n < 1) { throw new Error('positive integer please'); }

	switch(n) {
		case 1:
		case 2:
			const newFibonacci = new BigInteger(1);
			getFibonacciCache[n] = Object.freeze(newFibonacci.clone());
			return newFibonacci;
		default:
			const last = getFibonacci(n - 1);
			const last2 = getFibonacci(n - 2);
			const newFabonacci = new BigInteger(0).add(last).add(last2);
			return getFibonacciCache[n] = newFabonacci;
	}
}


// ================================================================================
//    SOLUTION
// ================================================================================

const solution = () => {
	for(let i = 1;; i++) {
		const fibonacci = getFibonacci(i);
		if (fibonacci.length() >= 1000) { console.log(fibonacci.toString()); return i; }
	}
}

console.log(solution());
