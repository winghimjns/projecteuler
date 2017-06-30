
//If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
//Find the sum of all the multiples of 3 or 5 below 1000.

const MAXIMUM = 1000 - 1;

const main = () => {
	
	const sumOfMultiples = base => {
		const total = Math.floor(MAXIMUM / base);
		const last = MAXIMUM - MAXIMUM % base;
		return ((base + last) * total) / 2;
	};

	const sumOfMultiplesOf3 = sumOfMultiples(3);
	const sumOfMultiplesOf5 = sumOfMultiples(5);
	const sumOfMultiplesOf15 = sumOfMultiples(15);

	console.log(sumOfMultiplesOf3 + sumOfMultiplesOf5 - sumOfMultiplesOf15);
};

main();