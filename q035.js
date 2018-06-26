/**
 * The number, 197, is called a circular prime because all rotations of the digits: 197, 971, and 719, are themselves prime.
 * 
 * There are thirteen such primes below 100: 2, 3, 5, 7, 11, 13, 17, 31, 37, 71, 73, 79, and 97.
 * 
 * How many circular primes are there below one million?
 * 
 */

// ================================================================================
//    CONSTANTS
// ================================================================================

const MAXIMUM_DIGITS = 6;
const MAXIMUM_NUMBER = Math.pow(10, MAXIMUM_DIGITS - 1);

// ================================================================================
//    MODELS
// ================================================================================

/**
 * 
 * 
 * NOTE : different digits of prime numbers will be divided into different lists`
 * 
 */
class PrimeNumberLists {
	
	static *primeNumbersGenerator(maxDigit) {
		
		const primeNumbers = [2];
		const max = Math.pow(10, maxDigit) - 1;
		
		yield 2;
		
		for(let i = 3; i < max; i += 2) {
			
			if (PrimeNumberLists.checkPrime(i, primeNumbers)) {
				primeNumbers.push(i);
				yield i;
			}
		}
		
	}
	
	static checkPrime(num, set) {
		for(let i = 0; i < set.length; i++) {
			
			const tryNum = set[i];
			const dividend = num / tryNum;
			
			// dividable > not prime number
			if (Number.isInteger(dividend)) { return false; }
			
			// dividend smaller than divider > tried the max possible divider > not prime number
			else if (dividend < tryNum) { return true; }
			
		}
		
		return true;
	}
	
	static generatePrimeNumberList(maxDigit) {
		
		const lists = new PrimeNumberLists();
		let currentDigit = 1;
		let groupMax = Math.pow(10, currentDigit);
			
		const primeNmberIterator = PrimeNumberLists.primeNumbersGenerator(maxDigit);
		let currentList = [];
		let primeNumber;
		
		while(primeNumber = primeNmberIterator.next().value) {
			
			if (primeNumber > groupMax) {
				currentDigit++;
				groupMax *= 10;
				lists.push(currentList);
				currentList = [];
			}
			
			currentList.push(primeNumber);
			
		}
		
		if (currentList.length >= 0) {
			lists.push(currentList);
		}
		
		return lists;
	}
	
	constructor() {
		this.list = [];
	}
	
	*[Symbol.iterator]() {
		yield* this.list;
	}
	
	push(item) {
		return this.list.push(item);
	}
}


// ================================================================================
//    FUNCTIONS
// ================================================================================

const uniqueFilter = (value, index, self) => self.indexOf(value) === index;

const circularCombinationsGenerator = function* (str) {
	const yieldedSet = [];
	for(let i = 0; i < str.length; i++) {
		const output = str.substr(i) + str.substr(0, i);
		
		if (!yieldedSet.includes(output)) {
			yieldedSet.push(output);
			yield output;
		}
	}
};

const checkCombinationInList = (item, list) => {
	
	if (!list.includes(item)) { return 0; }
	
	const combinationsIterator = circularCombinationsGenerator('' + item);
	let isValid = true;
	let sum = 0;
	
	for(let combination of combinationsIterator) {
		const combinationNumber = parseInt(combination);
		const index = list.indexOf(combinationNumber);
		
		if (index === -1) { isValid = false; }
		else { list.splice(index, 1); sum++; }
		
	}
	
	return isValid ? sum : 0;
};


// ================================================================================
//    ANSWER
// ================================================================================

const answer = () => {
	
	const primeNumberLists = PrimeNumberLists.generatePrimeNumberList(MAXIMUM_DIGITS);
	let sum = 0;
	let primeNumber;
	for(let list of primeNumberLists) {
		while(primeNumber = list[0]) {
			const adding = checkCombinationInList(primeNumber, list);
			sum += adding;
		}
	}
	return sum;
	
};

console.log(answer());
