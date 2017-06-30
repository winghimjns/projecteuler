

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
const findFacters = num => {
	var integer = num,
	primeArray = [],
	isPrime;

	//find divisors starting with 2

	for(i = 2; i <= integer; i++){
	if (integer % i==0) {

	//check if divisor is prime
	for(var j = 2; j <= i/2; j++) {
	if(i % j == 0) {
	isPrime = false;
	} else {
	isPrime = true;
	}
	}

	//if divisor is prime

	if (isPrime == true) {
	//divide integer by prime factor & factor store in array primeArray
	integer /= i
	primeArray.push(i);
	}
	}   
	}

	return primeArray.filter(item => item != 1);
};


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

const answer = () => {
	for(var i = LARGEST_POSSIBLE_LENGTH; i > 0; i--) {
		const isEven = i % 2 === 0;

		for(var j = LARGEST_POSSIBLE_PALINDROME_FIRST_HALF; j >= SMALLEST_3_DIGIT; j--) {
			const palindrome = parseInt(generatePalindrome(j, isEven));
			const facters = findFacters(palindrome);
			console.log(palindrome, !!facters, facters ? facters.join('|') : '');
			// has facters, done
			if(facters && isThreeDigitIntegerArray(facters)) {
				return palindrome;
			}
		}

	}
};


console.log(answer());
