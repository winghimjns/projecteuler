
const getPrimeList = max => {

    const listOfPrime = [];

    // 2 is the first prime number
    outer: for(var i = 2;; i++) {
        inner: for(let j = 0; j < listOfPrime.length; j++) {
            const testPrime = listOfPrime[j];
            if(i % testPrime === 0) {
                // not prime, break
                continue outer;
            }
        }

        listOfPrime.push(i);

        if(i >= max) {
            listOfPrime.pop();
            return listOfPrime;
        }
    }
};


const answer = () => {
    const primes = getPrimeList(2000000);
    var sum = 0;
    for(var i = 0; i < primes.length; i++) {
        const prime = primes[i];
        sum += prime;
    }
    return sum;
};

console.log(answer());

// answer is 142915828925 - 2000003 = 142913828922, but used more than 1 min