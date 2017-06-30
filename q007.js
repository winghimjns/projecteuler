
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


const answer = () => getPrimeList(10001).pop();

console.log(answer());