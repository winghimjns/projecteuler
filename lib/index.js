
const getPrimeList = count => {

    const listOfPrime = [];

    // 2 is the first prime number
    outer: for(var i = 2;; i++) {

        if(listOfPrime.length >= count) {
            break;
        }

        inner: for(let j = 0; j < listOfPrime.length; j++) {
            const testPrime = listOfPrime[j];
            if(i % testPrime === 0) {
                // not prime, break
                continue outer;
            }
        }
        listOfPrime.push(i);
    }

    return listOfPrime;
};

const getFactors = num => {
	
	const factors = [1];
	const half = num >> 1;
	
	if(num % 2 === 0) {
		factors.push(2);		
		for(var i = 3; i <= half; i++) {
			if(num % i === 0) {
				factors.push(i);
			}
		}
	} else {		
		for(var i = 3; i <= half; i += 2) {
			if(num % i === 0) {
				factors.push(i);
			}
		}
	}
	
	return factors;
};

const exporting = {
    getPrimeList,
	getFactors
};

for(key in exporting) {
	module.exports[key] = exporting[key];
}
