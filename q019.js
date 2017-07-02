
/**
 * 
 * You are given the following information, but you may prefer to do some research for yourself.
 * 
 * 1 Jan 1900 was a Monday.
 * Thirty days has September,
 * April, June and November.
 * All the rest have thirty-one,
 * Saving February alone,
 * Which has twenty-eight, rain or shine.
 * And on leap years, twenty-nine.
 * 
 * A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.
 * How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?
 * 
 */

// ================================================================================
//    CONSTANTS
// ================================================================================

const REFERENCE_DAY = '19000101'; // 1900 01 01
const REFERENCE_WEEKDAY = 1; // Monday

const START = '19010101';
const END = '20001231';
const COUNT_WEEKDAY = 0; // Sunday


// ================================================================================
//    CLASSES
// ================================================================================

class Day {
	constructor(str) {
		const yearStr = str.substr(0,4);
		const monthStr = str.substr(4,2);
		const dayStr = str.substr(6,2);
	}
}


// ================================================================================
//    FUNCTIONS
// ================================================================================

const

const isLeapYear = year => {
	const num = parseInt(year);
	if(num % 4 === 0) {
		if(num % 100) {
			if(num % 400) {
				return true;
			}
			return false;
		}
		return true;
	}
	return false;
};

const daysOfMonth = str {
	
};

// ================================================================================
//    ANSWER
// ================================================================================

const answer = () => {
	
	
	
};
