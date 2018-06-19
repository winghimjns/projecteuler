/**
 * 
 * Euler discovered the remarkable quadratic formula:
 * 
 * n2+n+41
 * It turns out that the formula will produce 40 primes for the consecutive integer values 0≤n≤39. However, when n=40,402+40+41=40(40+1)+41 is divisible by 41, and certainly when n=41,412+41+41 is clearly divisible by 41.
 * 
 * The incredible formula n2−79n+1601 was discovered, which produces 80 primes for the consecutive values 0≤n≤79. The product of the coefficients, −79 and 1601, is −126479.
 * 
 * Considering quadratics of the form:
 * 
 * n2+an+b, where |a|<1000 and |b|≤1000
 * 
 * where |n| is the modulus/absolute value of n
 * e.g. |11|=11 and |−4|=4
 * Find the product of the coefficients, a and b, for the quadratic expression that produces the maximum number of primes for consecutive values of n, starting with n=0.
 * 
 */


// ================================================================================
//    CONSTANTS
// ================================================================================

const A_MAX = 1000;
const B_MAX = 1000 - 1;

// ================================================================================
//    ADDONS
// ================================================================================

// assume the array is sorted
Array.prototype.binarySearch = function(num) {
	let left = 0;
	let right = this.length;
	let middle;
	
	// pre-conditions
	if (this.length === 0) { return -1; }
	if (num < this[0]) { return -1; }
	if (num > this[this.length - 1]) { return -1; }
	
	while(left < right) {
		middle = left + ((right - left) >> 1);
		if (this[middle] === num) {
			return middle;
		} else if (num > this[middle]) {
			if (left === middle) { break; }
			left = middle;
		} else if (num < this[middle]) {
			if (right === middle) { break; }
			right = middle;
		}
	}
	
	return -1;
};


// ================================================================================
//    VARIABLES
// ================================================================================

const primeNumbers = [2];
const nonPrimeNumbers = [];

// ================================================================================
//    FUNCTIONS
// ================================================================================

const numberSort = (a, b) => a > b;

const isPrime = num => {
	if (num <= 1) { return false; }
	if (primeNumbers.binarySearch(num) !== -1) { return true; }
	if (num % 2 === 0 || nonPrimeNumbers.binarySearch(num) !== -1) { return false; }
	
	const numHalf = num >> 1;
	for(let i = 3; i < numHalf; i += 2) {
		if (num % i === 0) {
			if (num > nonPrimeNumbers[nonPrimeNumbers.length - 1]) {
				nonPrimeNumbers.push(num);
			} else {
				nonPrimeNumbers.push(num);
				nonPrimeNumbers.sort(numberSort);
			}
			return false;
		}
	}
	
	if (num > primeNumbers[primeNumbers.length - 1]) {
		primeNumbers.push(num);
	} else {
		primeNumbers.push(num);
		primeNumbers.sort(numberSort);
	}
	
	return true;
}

const checkQuadraticGenerationPrimeCount = (a, b) => {
	let primeCount = 0;
	for(let n = 0; n < Math.abs(b) && n　< Math.abs(a); n++) {
		if (isPrime(n * n + n * a + b)) { primeCount++; }
		else { return 0; }
	}
	return primeCount;
};

// ================================================================================
//    ANSWER
// ================================================================================

const answer = () => {
	let bestFormula = [0, 0];
	let maxPrimeGenerated = 0;
	for(let a = -A_MAX; a <= A_MAX; a++) {
		for(let b = -B_MAX; b <= B_MAX; b++) {
			const primeCount = checkQuadraticGenerationPrimeCount(a, b);
			if (primeCount > maxPrimeGenerated) {
				bestFormula = [a, b];
				maxPrimeGenerated = primeCount;
			}
		}
		console.log('a', a, primeNumbers.length, primeNumbers[primeNumbers.length - 1]);
	}
	
	return bestFormula[0] * bestFormula[1];
}

console.log(answer());
