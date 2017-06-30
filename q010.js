
const getPrimeSum = max => {

    const listOfPrime = [2];
    var sum = 0;

    // 3 is the second prime number
    outer: for(var i = 3;; i+=2) {
        inner: for(let j = 0; j < listOfPrime.length; j++) {
            const testPrime = listOfPrime[j];

            //if(i / 2 < testPrime) {
            //    console.log(i, listOfPrime);
            //    continue outer;
            //}

            if(i % testPrime === 0) {
                // not prime, break
                continue outer;
            }
        }

        if(i >= max) {
            return sum;
        }

        listOfPrime.push(i);
        sum += (i);

    }
};


const answer = () => {
    const primes = getPrimeSum(2000000);
    return primes;
};

console.log(answer());

// answer is 142915828925 - 2000003 = 142913828922, but used more than 1 min