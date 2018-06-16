/**
 * A unit fraction contains 1 in the numerator. The decimal representation of the unit fractions with denominators 2 to 10 are given:
 * 
 * 1/2	= 	0.5
 * 1/3	= 	0.(3)
 * 1/4	= 	0.25
 * 1/5	= 	0.2
 * 1/6	= 	0.1(6)
 * 1/7	= 	0.(142857)
 * 1/8	= 	0.125
 * 1/9	= 	0.(1)
 * 1/10	= 	0.1
 * Where 0.1(6) means 0.166666..., and has a 1-digit recurring cycle. It can be seen that 1/7 has a 6-digit recurring cycle.
 * 
 * Find the value of d < 1000 for which 1/d contains the longest recurring cycle in its decimal fraction part.
 * 
 */

// ================================================================================
//    CONSTANTS
// ================================================================================

const TRY_UNTIL = 1000 - 1;


// ================================================================================
//    FUNCTIONS
// ================================================================================

const arrayEquals = (a, b) =>　{
	if (a.length !== b.length) { return false; }
	for(let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) { return false; }
	}
	return true;
}

const getRepeatSequence = str => {
	if ([0, 1].indexOf(str.length) !== -1) { return null; }
	for(let i = 0; i < str.length - 1; i++) {
		const length = (str.length - i) >> 1;
		const left = str.substr(i, length);
		const right = str.substr(i + length);
		if (left === right) { return left; }
	}
	
	return null;
};

const getArrayRepeatSequence = arr => {
	if ([0, 1].indexOf(arr.length) !== -1) { return []; }
	for(let i = 0; i < arr.length - 1; i++) {
		const halfLength = ((arr.length - i) >> 1) + i;
		let hasSequence = true;
		
		for(let j = 0; j < halfLength - i; j++) {
			if (arr[i + j] !== arr[halfLength + j]) {
				hasSequence = false;
				break;
			}
		}
		
		if (hasSequence) {
			return arr.slice(halfLength);
		}
	}
	return [];
};


const getDivideDecimalSequenceLength = object => {
	let decimals = '';
	let subject = 10;
	let subjects = [];
	let lastSubject = 0;
	
	for(;;) {
		const result = subject / object;
		const resultString = `${result}`;
		
		// if it's totally divided
		if (resultString.indexOf('.') === -1) {
			return '';
		}
		
		// if the subject cannot be divided (subject / object < 1)
		if (resultString.indexOf('.') !== -1 && resultString[0] === '0') {
			subjects.push(subject);
			subject *= 10;
			decimals += '0';
			continue;
		}
		
		const nextDigitString = resultString.split('.')[0];
		
		// if the next decimal string is not a string. then it should be null or something wrong. should throw error
		if (typeof nextDigitString !== 'string') { throw new Error('error 01'); }
		
		// check if the sequence match
		
		const nextDigit = parseInt(nextDigitString);
		decimals += nextDigit;
		subjects.push(subject);
		subject = (subject % object) * 10;
		
		// do a check, check if the decimals is already in a sequence, and the subject 
		//const repeatSequence = getRepeatSequence(decimals);
		const subjectRepeatSequence = getArrayRepeatSequence(subjects);
		if (subjectRepeatSequence.length !== 0) { return subjectRepeatSequence.length || 0; }
		
	}
};


// ================================================================================
//    SOLUTION
// ================================================================================

const solution = () => {
	let maxSequenceLength = 0;
	let maxSequenceIndex = -1;
	for(let i = 2; i <= TRY_UNTIL; i++) {
		console.log(i);
		const sequenceLength = getDivideDecimalSequenceLength(i);
		if (sequenceLength > maxSequenceLength) {
			maxSequenceLength = sequenceLength;
			maxSequenceIndex = i;
		}
	}
	return maxSequenceIndex;
}

console.log(solution());
