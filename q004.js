

// ================================================================================
//    FUNCTION
// ================================================================================
const stringReverse = str => str.split('').reverse().join('');
const generatePalindrome = (str, doubleMiddle = true) => doubleMiddle ? str + stringReverse(`${str}`) : str + (stringReverse(`${str}`)).substr(1);
const isPalindrome = str => `${str}` === stringReverse(`${str}`);
const stringLengthEven = str => str.length % 2 === 0;
const stringHalfLength = str => Math.ceil(str.length >> 1);
const stringFirstHalf = str => str.substr(0, stringHalfLength(str));
const isThreeDigitIntegerArray = arr => arr.length === arr.filter(item => `${item}`.length === 3);
const getLargestPossiblePalinDrome = largest3DigitProduct => {
	const str = `${largest3DigitProduct}`;
	const evenLength = stringLengthEven(str);
	const halfLength = stringHalfLength(str);
	const firstHalf = parseInt(stringFirstHalf(str)) - 1;
	return generatePalindrome(firstHalf, evenLength);
};
const arrayMax = arr => arr.sort((a,b) => a > b).pop();


// ================================================================================
//    PREDEFINES
// ================================================================================

const LARGEST_3_DIGIT = 999;
const SMALLEST_3_DIGIT = 100;
const LARGEST_3_DIGIT_PRODUCT = LARGEST_3_DIGIT * LARGEST_3_DIGIT;
const LARGEST_POSSIBLE_PALINDROME = getLargestPossiblePalinDrome(LARGEST_3_DIGIT_PRODUCT);
const LARGEST_POSSIBLE_PALINDROME_FIRST_HALF = stringFirstHalf(LARGEST_POSSIBLE_PALINDROME);
const LARGEST_POSSIBLE_IS_EVEN = stringLengthEven(LARGEST_POSSIBLE_PALINDROME);
const LARGEST_POSSIBLE_LENGTH = `${LARGEST_POSSIBLE_PALINDROME}`.length;

const possiblePalindromeSet = [];

const answer = () => {
	for(var i = LARGEST_3_DIGIT; i > SMALLEST_3_DIGIT; i--) {
		for(var j = LARGEST_3_DIGIT; j > SMALLEST_3_DIGIT; j--) {
			const currentTry = i * j;
			isPalindrome(currentTry) && possiblePalindromeSet.push(parseInt(currentTry));
		}
	}

	return arrayMax(possiblePalindromeSet);
};


console.log(answer());
