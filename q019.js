
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

// --------------------------------------------------------------------------------
//    WEEKDAYS
// --------------------------------------------------------------------------------

const SUNDAY = 0;
const MONDAY = 1;
const TUESDAY = 2;
const WEDNESDAY = 3;
const THURSDAY = 4;
const FRIDAY = 5;
const SATURDAY = 6;


// ================================================================================
//    DATA
// ================================================================================

const REFERENCE_DAY = '19000101'; // 1900 01 01
const REFERENCE_WEEKDAY = MONDAY; // Monday

const START = '19010101';
const END = '20001201';
const COUNT_WEEKDAY = SUNDAY; // Sunday


// ================================================================================
//    CLASSES
// ================================================================================

class Day {
	constructor(str, weekday) {
		const yearStr = str.substr(0,4);
		const monthStr = str.substr(4,2);
		const dayStr = str.substr(6,2);
		
		this.year = parseInt(yearStr);
		this.month = parseInt(monthStr);
		this.day = parseInt(dayStr);
		this.weekday = weekday;
		this.input = [...arguments];
	}
	
	daysInMonth() {
		return daysOfMonth(this);
	}
	
	passMonth() {
		var {year, day} = this;
		var month = this.month + 1;
		if(month >= 13) {
			month = 1;
			year++;
		}
		const yearStr = leadingZeros(year, 4);
		const monthStr = leadingZeros(month);
		const dayStr = leadingZeros(day);
		
		const {weekday} = this;
		
		return new Day(`${yearStr}${monthStr}${dayStr}`, passWeekDays(weekday, daysOfMonth(this)));
	}
	
	equals(day) {
		if(day instanceof Day) {
			return this.toString() == day.toString();
		}
		return this.toString() == day;
	}
	
	laterThanOrEquals(day) {
		const thisInt = parseInt(this.toString());
		if(day instanceof Day) {
			return thisInt >= parseInt(day.toString());
		}
		return thisInt >= parseInt(day);
	}
	
	toString() {
		const {year, month, day} = this;
		const yearStr = leadingZeros(year, 4);
		const monthStr = leadingZeros(month);
		const dayStr = leadingZeros(day);
		return `${yearStr}${monthStr}${dayStr}`;
	}

}


// ================================================================================
//    FUNCTIONS
// ================================================================================

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

const passWeekDays = (weekday, days) => {
	
	// make sure the weekday's param is between 0 and 7
	while((weekday += 7) % 7 < 0);
	weekday %= 7;
	
	return (weekday + days) % 7;
	
};

const daysOfMonth = day => {
	if(!(day instanceof Day)) {
		day = new Day(day);
	}
	
	if([4, 6, 9, 11].indexOf(day.month)) {
		return 31;
	}
	
	else if (day.month == 2) {
		return isLeapYear(day.year) ? 29 : 28;
	}
	
	else {
		return 31;
	}
};

const leadingZeros = (num, digits = 2) => {
	return `${'0'.repeat(digits)}${num}`.substr(-digits);
};

// ================================================================================
//    ANSWER
// ================================================================================

const answer = () => {
	
	const referenceDay = new Day(REFERENCE_DAY, REFERENCE_WEEKDAY);
	var currentDay = referenceDay;
	var sum = 0;
	
	while(!(currentDay = currentDay.passMonth()).laterThanOrEquals(START));
	
	while(!(currentDay = currentDay.passMonth()).laterThanOrEquals(END)) {
		currentDay.weekday == COUNT_WEEKDAY && sum++;
	} // end while
	return sum;
};

console.log(answer());
