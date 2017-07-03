/**
 * 
 * Using names.txt (right click and 'Save Link/Target As...'), a 46K text file containing over five-thousand first names, begin by sorting it into alphabetical order. Then working out the alphabetical value for each name, multiply this value by its alphabetical position in the list to obtain a name score.
 * 
 * For example, when the list is sorted into alphabetical order, COLIN, which is worth 3 + 15 + 12 + 9 + 14 = 53, is the 938th name in the list. So, COLIN would obtain a score of 938 × 53 = 49714.
 * 
 * What is the total of all the name scores in the file?
 * 
 */
 

const fs = require('fs');
const Big = require('big.js');

// ================================================================================
//    DATA
// ================================================================================

const filePath = './res/p022_names.txt';

const arraySum = arr => {
	var sum = 0;
	for(var i = 0; i < arr.length; i++) {
		sum += arr[i];
	}
	return sum;
};

const bigSum = arr => {
	var sum = new Big(0);
	for(var i = 0; i < arr.length; i++) {
		sum = sum.plus(arr[i]);
	}
	return sum;
}

const nameValue = name => arraySum(name.split('').map(ch => ch.charCodeAt(0) - 64));


const answer = () => {
	const fileContent = fs.readFileSync(filePath);
	const names = JSON.parse(`[${fileContent}]`);
	const scores = names.map(name => nameValue(name));
	scores.sort((a, b) => a > b);
	
	return bigSum(scores.map((score, index) => {
		return score * (index + 1);
	})).toFixed();
};

console.log(answer());
