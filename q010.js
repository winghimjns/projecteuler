
const getPrimeSum = max => {
	// in throry, 2 is the first prime
	const primes = [2];
	var isPrime = false;
	var sum = 2;
	
	for(var i = 3; i <= max; i+=2) {
		// assuming it's a prime
		isPrime = true;
		
		for(var j = 0; j < primes.length; j++) {
			const prime = primes[j];
			
			// check if the current prime is bigger than test number's half, stop
			if(prime > (i >> 1)) {
				break;
			}
			
			// check if the current testing can be divided by current prime
			if(i % prime === 0) {
				// then i should not be prime
				isPrime = false;
				break;
			}
			
		}
		
		if(isPrime) {
			sum += i;
			primes.push(i);
		}
	}
	
	return sum;
};

const answer = () => getPrimeSum(100);


console.log(answer());
