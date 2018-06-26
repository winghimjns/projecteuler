/**
 * The number 3797 has an interesting property. Being prime itself, it is possible to continuously remove digits from left to right, and remain prime at each stage: 3797, 797, 97, and 7. Similarly we can work from right to left: 3797, 379, 37, and 3.
 * 
 * Find the sum of the only eleven primes that are both truncatable from left to right and right to left.
 * 
 * NOTE: 2, 3, 5, and 7 are not considered to be truncatable primes.
 * 
 */

// ================================================================================
//    ADDONS
// ================================================================================

String.prototype.containsAny = function(set) {
	for(let item of set) {
		if (this.includes(item)) { return true; }
	}
	return false;
};

// ================================================================================
//    CONSTANTS
// ================================================================================

const LIMIT = 11; // there are 11 truncatable primes
const NON_TRUNCATABLE_PRIMES = [1,2,3,5,7];
const NON_TRUNCATABLE_PRIME_CHARS = [...'4680'];

// ================================================================================
//    MODELS
// ================================================================================

class PrimeNumbers {
	
	static _checkPrimeWithCurrentSet(object) {
		const self = PrimeNumbers;
		for(let prime of self.primeNumbers) {
			const divident = object / prime;
			if (Number.isInteger(divident)) { return false; }
			else if (divident < prime) { return true; }
		}
		return true;
	}
	
	static *primeNumberGenerator() {
		const self = PrimeNumbers;
		
		self.primeNumbers.push(2);
		yield 2;
		
		for (let i = 3;; i += 2) {
			if (self._checkPrimeWithCurrentSet(i)) {
				self.primeNumbers.push(i);
				yield i;
			}
		}
	}
	
	static isPrime(num) {
		const self = PrimeNumbers;
		const {primeNumbers, iterator} = self;
		while (primeNumbers.length === 0 || primeNumbers[primeNumbers.length - 1] < num) {
			iterator.next();
		}
		
		return primeNumbers.includes(num);
	}
	
	static *[Symbol.iterator]() {
		yield *PrimeNumbers.iterator;
	}
	
}

PrimeNumbers.primeNumbers = [];

PrimeNumbers.iterator = PrimeNumbers.primeNumberGenerator();


// ================================================================================
//    FUNCTIONS
// ================================================================================

const isTruncatablePrime = prime => {
	if (prime < 10) { return false; }
	const primeStr = '' + prime;
	if (NON_TRUNCATABLE_PRIMES.includes(prime)) { return false; }
	else if (primeStr.containsAny(NON_TRUNCATABLE_PRIME_CHARS)) { return false; }
	return isLeftTruncatablePrime(prime) && isRightTruncatablePrime(prime);
};

const isLeftTruncatablePrime = prime => {
	const primeStr = '' + prime;
	if (primeStr.length === 1) { return PrimeNumbers.isPrime(prime); }
	else { return PrimeNumbers.isPrime(prime) && isLeftTruncatablePrime(parseInt(primeStr.substr(1))); }
};

const isRightTruncatablePrime = prime => {
	const primeStr = '' + prime;
	if (primeStr.length === 1) { return PrimeNumbers.isPrime(prime); }
	else { return PrimeNumbers.isPrime(prime) && isRightTruncatablePrime(parseInt(primeStr.substr(0, primeStr.length - 1))); }
};



// ================================================================================
//    ANSWER
// ================================================================================

const answer = () => {
	let truncatablePrimeCount = 0;
	let sum = 0;
	for(let prime of PrimeNumbers) {
		if (isTruncatablePrime(prime)) {
			sum += prime;
			truncatablePrimeCount++;
		}
		if (truncatablePrimeCount >= LIMIT) { break; }
	}
	return sum;
};

console.log(answer());
