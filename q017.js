

/**
 * 
 * If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.
 * 
 * If all the numbers from 1 to 1000 (one thousand) inclusive were written out in words, how many letters would be used?
 * 
 * 
 * NOTE: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains 23 letters and 115 (one hundred and fifteen) contains 20 letters. The use of "and" when writing out numbers is in compliance with British usage.
 * 
 */
  

// ================================================================================
//    DATA
// ================================================================================

const FIRST = 1;
//const LAST = 122;
const LAST = 1000;


// ================================================================================
//    CONSTANTS
// ================================================================================

const SINGLE_DIGIT_WORD = [
	'', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'
];

const TEN_DIGIT_WORD = [
	'', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

// p.s. I don't want to spend my time to think about these constants' names
const DIGIT_WORDS_FROM_E3 = [
	'hundred',
	'thousand'
];

const AND = 'and';

const SPECIAL_SET = {
	'0' : 'zero',
	'11': 'eleven',
	'12': 'twelve',
	'13': 'thirteen',
	'14': 'fourteen',
	'15': 'fifteen',
	'16': 'sixteen',
	'17': 'seventeen',
	'18': 'eighteen',
	'19': 'nineteen',
	'1000': 'one thousand' // just don't want to spend my time for a four digit number
};


// ================================================================================
//    FUNCTION
// ================================================================================

const countCharacters = str => str.match(/\w+/g).join('').length;
const numberWord = num => {
	
	const wordArr = [];
	
	// make the number to be string
	const str = `${num}`;
	
	// step 1 : check if the number is in the special set
	if(typeof SPECIAL_SET[str] != 'undefined') {
		return SPECIAL_SET[str]
	}
	
	// step 2 : find the word by dynamic code
	
	const arr = str.split('');
	var requireAnd = false;
	
	// TODO : use a looping instead of the syntax like this. if we want to handle numbers with more digits
	// step 2.1 : hundred digit
	if(arr.length == 3) {
		const hundredDigit = parseInt(arr.shift());
		wordArr.push(SINGLE_DIGIT_WORD[hundredDigit]);
		wordArr.push(DIGIT_WORDS_FROM_E3[0]);
		requireAnd = true;
	}
	
	// step 2.2 : ten digit
	if(arr.length == 2) {
		const currentNum = arr.join('');
		
		if(typeof SPECIAL_SET[currentNum] != 'undefined') {
			if(requireAnd) {
				wordArr.push(AND);
			}
			wordArr.push(SPECIAL_SET[currentNum]);
		}else {
			const tenDigit = arr.shift();
			
			// skip if zero
			if(tenDigit != '0') {
				if(requireAnd) {
					wordArr.push(AND);
					requireAnd = false;
				}
				wordArr.push(TEN_DIGIT_WORD[tenDigit]);
			}
			
		}
	}
	
	// step 2.3 : single digit
	if(arr.length == 1) {
		const singleDigit = arr.shift();
		
		if(singleDigit != '0') {
			if(requireAnd) {
				wordArr.push(AND);
				requireAnd = false;
			}
		}
		
		wordArr.push(SINGLE_DIGIT_WORD[singleDigit]);
	}
	
	// step 3 : return LOL
	return wordArr.join(' ');
	
};


// ================================================================================
//    ANSWER
// ================================================================================

const answer = () => {
	
	var sum = 0;
	
	for(var i = FIRST; i <= LAST; i++) {
		sum += countCharacters(numberWord(i));
	}
	
	return sum;
	
};

console.log(answer());
