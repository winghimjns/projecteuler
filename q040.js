/**
 * An irrational decimal fraction is created by concatenating the positive integers:
 * 
 * 0.123456789101112131415161718192021...
 * 
 * It can be seen that the 12th digit of the fractional part is 1.
 * 
 * If dn represents the nth digit of the fractional part, find the value of the following expression.
 * 
 * d1 × d10 × d100 × d1000 × d10000 × d100000 × d1000000
 * 
 */

// ================================================================================
//    ANALYSIS
// ================================================================================

/**

First of all, for integers with 1 digit, there are 9 of them (1, 2, 3, 4, 5, 6, 7, 8, 9). For easier explanation, I call this zone 1.

And for the integers with 2 digits, there are 99 - 9 = 90 of them (1 to 99 minus 1 to 9, so 10 - 99, there are 90 of them). I call this zone 2.

3 digits > 900 of them. Zone 3.

And so on...


Secondly, if I am about to pick a random digit in the fractions and let say d100.

d100 should be within the zone 2 because:

1 * 9 + 2 * 90 = 189 (9 digits in zone 1 and 180 digits in zone 2)


The digit I am picking, is the 91st digit of zone 2 because: 

100 - 9 = 91


And in zone 2, there is one thing really interesting. If you are picking an odd numbers digit (like we are picking the 91st digit). We are actually picking the ten place's digit (e.g. for number 91, 9 is the ten place)

So:

if (n % 2 === 1) >>> ten's place
else >>> one's place

For zone 3:
if (n % 3 === 2) >>> hundred's placee
else if (n % 3 === 1) >>> ten's place
else >>> one's place


After we defined which position that is, we just simple check which position that is to check what digit is that.

e.g.:

For the 100th digit, it's 100 - 9 = 91, 91st number


**/


// ================================================================================
//    SOLUTION
// ================================================================================


// --------------------------------------------------------------------------------
//    CONSTANTS
// --------------------------------------------------------------------------------

const PICKED_D = [1, 10, 100, 1e3, 1e4, 1e5, 1e6];








// --------------------------------------------------------------------------------
//    FUNCTIONS
// --------------------------------------------------------------------------------

const getZoneSkipDigits = zone => {
	let skipDigits = 0;
	for(let i = 1; i < zone; i++) {
		skipDigits += (Math.pow(10, i) - Math.pow(10, i - 1)) * i;
	}
	return skipDigits;
};

const inZone = n => {
	let zone = 1;
	while (n > getZoneSkipDigits(zone + 1)) {
		zone++;
	}
	return zone;
};

const e = e => eval(`1e${e}`);


const d = n => {
	
	// zone 1
	if (n < 10) { return parseInt(n); }
	
	const zone = inZone(n);
	const zoneSkipDigits = getZoneSkipDigits(zone);
	const positionInZone = n - zoneSkipDigits;
	const digitPlace = positionInZone % zone;
	const eZone = e(zone);
	
	const numInZone = eZone / 10 + Math.ceil(positionInZone / zone) - 1;
	
	const preOutputString = `${numInZone}`;
	
	const pos = (digitPlace - 1 + zone) % zone;
	
	return parseInt(preOutputString[pos]);
	
};


// --------------------------------------------------------------------------------
//    ANSWER
// --------------------------------------------------------------------------------

const answer = () => {
	
	let product = 1;
	const output = [];
	for(let n of PICKED_D) {
		product *= d(n);
	}
	return product;
};

console.log(answer());
