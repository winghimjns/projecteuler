/**
 * We shall say that an n-digit DIGIT is pandigital if it makes use of all the digits 1 to n exactly once; for example, 5-digit DIGIT, 15234, is through 5 pandigital.
 * 
 * The product 7254 is unusual, as the identity, 39 x 186 = 7254, containing multiplicand, multiplier, and product is 1 through 9 pandigital.
 * 
 * Find the sum of all products whose multiplicand/multiplier/product identity can be written as a 1 through 9 pandigital.
 * 
 * HINT: Some products can be obtained in more than one way so be sure to only include it once in your sum.
 * 
 */

// ================================================================================
//    CONSTANTS
// ================================================================================

const DIGIT_CHARACTERS = '123456789'; // 9 pandigital


// ================================================================================
//    GENERATORS & ITERATORS
// ================================================================================

const numberCombinationsGenerator = function* (digits) {
	if (digits.length === 2) {
		const firstChar = digits[0];
		const secondChar = digits[1];
		yield `${firstChar}${secondChar}`;
		yield `${secondChar}${firstChar}`;
	} else {
		const firstChar = digits[0];
		const restChars = digits.substr(1);
		const output = [];
		const subGenerator = numberCombinationsGenerator(restChars);
		let nextValue = null;
		
		while(nextValue = subGenerator.next().value) {
			for(let i = 0; i <= nextValue.length; i++) {
				const firstSegment = nextValue.substr(0, i);
				const secondSegment = nextValue.substr(i);
				yield firstSegment + firstChar + secondSegment;
			}
		}
	}
};

const segmentsGenerator = function* (str, segmentCount) {
	const length = str.length;
	for(let i = 1; i < length; i++) {
		const firstSegment = str.substr(0, i);
		const secondSegment = str.substr(i);
		
		if (segmentCount === 2) {
			yield [firstSegment, secondSegment];
		} else {			
			const subsegmentsIterator = segmentsGenerator(secondSegment, segmentCount - 1);
			
			for(let subsegments of subsegmentsIterator) {
				yield [firstSegment, ...subsegments];
			}
		}
	}
};

// ================================================================================
//    ANSWER
// ================================================================================

const answer = () => {
	const numberCombinationsIterator = numberCombinationsGenerator(DIGIT_CHARACTERS);
	const productSet = [];
	for(let num of numberCombinationsIterator) {
		const segmentsIterator = segmentsGenerator(num, 3);
		for(let segments of segmentsIterator) {
			if (segments[0].length + segments[1].length > (DIGIT_CHARACTERS.length >> 1) + 1) { continue; }
			let [multiplicand, multiplier, product] = segments.map(num => parseInt(num));
			if (productSet.indexOf(product) !== -1) { continue; }
			if (multiplicand * multiplier === product) {	
				productSet.push(product);
			}
		}
	}
	
	let sum = 0;
	
	for(let product of productSet) {
		sum += product;
	}
	
	return sum;
};

console.log(answer());
