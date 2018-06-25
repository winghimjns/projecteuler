/** 
 * The decimal number, 585 = 10010010012 (binary), is palindromic in both bases.
 * 
 * Find the sum of all numbers, less than one million, which are palindromic in base 10 and base 2.
 * 
 * (Please note that the palindromic number, in either base, may not include leading zeros.)
 * 
 */

// ================================================================================
//    CONSTANTS
// ================================================================================

const MAXIMUM_NUMBER = 1e6;


// ================================================================================
//    ADDONS
// ================================================================================

String.prototype.isPalindromic = function() {
	let left = 0, right = this.length - 1;
	for(;;) {
		if (left >= right) { return true; }
		else if (this[left] !== this[right]) { return false; }
		left++;
		right--;
	}
};


// ================================================================================
//    MODELS
// ================================================================================

class PalindromicBinaryNumber {
	
	//binarySequence;
	
	static *generator() {
		
		yield PalindromicBinaryNumber.initialize([], false);
		yield PalindromicBinaryNumber.initialize([], true);
		
		const binarySequenceBase = [];
		
		for(;;) {
			
			yield PalindromicBinaryNumber.initialize([false, ...binarySequenceBase], false);
			yield PalindromicBinaryNumber.initialize([true, ...binarySequenceBase], false);
			
			yield PalindromicBinaryNumber.initialize([false, ...binarySequenceBase], true);
			yield PalindromicBinaryNumber.initialize([true, ...binarySequenceBase], true);
			
			for(let pointer = binarySequenceBase.length - 1;; pointer--) {
				
				if (pointer === -1) {
					binarySequenceBase.unshift(false);
					break;
				}
				
				else if(!binarySequenceBase[pointer]) {
					binarySequenceBase[pointer] = true;
					break;
				}
				
				else {
					binarySequenceBase[pointer] = false;
				}
				
			}
			
		}
		
	}
	
	static initialize(binarySequence, repeatingMiddle) {
		binarySequence.unshift(true);
		const lastIndex = repeatingMiddle ? binarySequence.length - 1 : binarySequence.length - 2;
		for(let i = lastIndex; i >= 0; i--) {
			binarySequence.push(binarySequence[i]);
		}
		return new PalindromicBinaryNumber(binarySequence);
	}
	
	constructor(binarySequence) {
		this.binarySequence = binarySequence;
	}
	
	toDecimal() {
		return parseInt(this.toString(), 2);
	}
	
	isDecimalPalindromic() {
		return `${this.toDecimal()}`.isPalindromic();
	}
	
	toString() {
		return this.binarySequence.map(bool => bool ? '1' : '0').join('');
	}
}

// ================================================================================
//    ANSWER
// ================================================================================

const answer = () => {
	const iterator = PalindromicBinaryNumber.generator();
	let sum = 0;

	for(let i = 0;; i++) {
		const value = iterator.next().value;
		const num = value.toDecimal();
		
		if (num > MAXIMUM_NUMBER) {
			return sum;
		}
		
		if (`${num}`.isPalindromic()) {
			sum += num;
		}
	}
};

console.log(answer());

