/**
 * Surprisingly there are only three numbers that can be written as the sum of fourth powers of their digits:
 * 
 * 1634 = 14 + 64 + 34 + 44
 * 8208 = 84 + 24 + 04 + 84
 * 9474 = 94 + 44 + 74 + 44
 * As 1 = 14 is not a sum it is not included.
 * 
 * The sum of these numbers is 1634 + 8208 + 9474 = 19316.
 * 
 * Find the sum of all the numbers that can be written as the sum of fifth powers of their digits.
 * 
 */

// ================================================================================
//    CONSTANTS
// ================================================================================

const POWER = 5;

// ================================================================================
//    PRE-DEFINES
// ================================================================================

const maxDigits = 4; // TODO

const numberPowerSet = (function(power) {
	const set = {};
	for(let i = 0; i < 10; i++) {
		set[i] = Math.pow(i, power);
	}
	return set;
})(POWER);

/**
 * the maximum possible number for the whole calculation. So the calculation should stop here (include it self)
 */
const maxNumber = (function(power) {
	const maxSingleNum = Math.pow(9, power);
	let sum = 0;
	let digit = 1;
	do {
		digit++;
		sum += maxSingleNum;
	}while(`${sum}`.length > digit);
	return sum;
})(POWER);


// ================================================================================
//    FUNCTIONS
// ================================================================================

const numLeadZero = (num, leadingZeros) => {
	const numString = '0'.repeat(leadingZeros) + num;
	return numString.substr(numString.length - leadingZeros);
};

const testNumber = num => {
	const numString = `${num}`;
	let sum = 0;
	const nums = [...numString].map(num => parseInt(num));
	for(let i = 0; i < nums.length; i++) {
		const testNum = parseInt(nums[i]);
		sum += numberPowerSet[testNum];
	}
	return sum === num;
};

const testNumberSet = max => {
	const min = 2;
	const set = [];
	
	for(let i = min; i <= max; i++) {
		const num = i;
		if (testNumber(num)) {
			set.push(num);
		}
	}
	return set;
};


// ================================================================================
//    ANSWER
// ================================================================================

const answer = () => {
	const numberArr = testNumberSet(maxNumber);
	let sum = 0;
	
	for(let i = 0; i < numberArr.length; i++) {
		sum += numberArr[i];
	}
	return sum;
};

console.log(answer());
