/**
 * 
 * The number, 1406357289, is a 0 to 9 pandigital number because it is made up of each of the digits 0 to 9 in some order, but it also has a rather interesting sub-string divisibility property.
 * 
 * Let d1 be the 1st digit, d2 be the 2nd digit, and so on. In this way, we note the following:
 * 
 * d2d3d4=406 is divisible by 2
 * d3d4d5=063 is divisible by 3
 * d4d5d6=635 is divisible by 5
 * d5d6d7=357 is divisible by 7
 * d6d7d8=572 is divisible by 11
 * d7d8d9=728 is divisible by 13
 * d8d9d10=289 is divisible by 17
 * Find the sum of all 0 to 9 pandigital numbers with this property.
 * 
 */

// ================================================================================
//    ANALYZING
// ================================================================================

/*

Firstly, it's not matter for the 1st and the 2nd digits. It just can't be zero. So what does really matter is the 3rd to the 10th digit.

Secondly, check conditions.

- d2d3d4 should be divisible by 2, so d4 must be an even number
- d4d5d6 should be divisible by 5, so d6 must be either 0 or 5

During the number is being built, it should be checked every time a number is appended

Once all number are filled, should check and ensure the first digit is not zero.

*/

// ================================================================================
//    VARIABLES
// ================================================================================

const pickedDigits = [!1,!1,!1,!1,!1,!1,!1,!1,!1,!1]; // 10 of false


// ================================================================================
//    FUNCTIONS
// ================================================================================

const e = (num, e) => eval(`%{num}e${e}`);


// ================================================================================
//    ANSWER
// ================================================================================

const answer = () => {
	let sum = 0;
	dLoop: for(let d = 0; d <= 8; d += 2) { // d means the 4th digit, d4, always is an even number
		fLoop: for(let f = 0; f <= 5; f += 5) { // f is 5th, always 0 or 5
			cLoop: for(let c = 0; c <= 9; c++) { // c is the 3 digit
				if (c === d || c === f) { continue; } // quick skip
				eLoop: for(let e = 0; e <= 9; e++) { // 5th digit
					if (e === c || e === d || e === f) { continue; }
					else if ((c*100 + d*10 + e) % 3) { continue; }
					gLoop: for(let g = 0; g <= 9; g++) { // 7th digit
						if (g === c || g === d || g === e || g === f) { continue; }
						else if ((e*100 + f*10 + g) % 7) { continue; }
						hLoop: for(let h = 0; h <= 9; h++) { // 8th digit
							if (h === c || h === d || h === e || h === f || h === g) { continue; }
							else if ((f*100 + g*10 + h) % 11) { continue; }
							iLoop: for(let i = 0; i <= 9; i++) { // 9th digit
								if (i === c || i === d || i === e || i === f || i === g || i === h) { continue; }
								else if ((g*100 + h*10 + i) % 13) { continue; }
								jLoop: for(let j = 0; j <= 9; j++) { // 10th digit
									if (j === c || j === d || j === e || j === f || j === g || j === h || j === i) { continue; }
									else if ((h*100 + i*10 + j) % 17) { continue; }
									
									// ok! at this point, I will just need to fill up the 1st and 2nd digit, no matter what that is, just check it
									aLoop: for(let a = 1; a <= 9; a++) { // 1st digit, note that it should never be zero
										if (a === c || a === d || a === e || a === f || a === g || a === h || a === i || a === j) { continue; }
										bLoop: for(let b = 0; b　<= 9; b++) {
											if (b === c || b === d || b === e || b === f || b === g || b === h || b === i || b === j || b === a) { continue; }
											sum += a*1000000000 + b*100000000 + c*10000000 + d*1000000 + e*100000 + f*10000 + g*1000 + h*100 + i*10 + j;
										} // bLoop
									} // aLoop
								} // jLoop
							} // iLoop
						} // hLoop
					} // gLoop
				} // eLoop
			} // cLoop
		} // fLoop
	} // dLoop
	return sum;
};

console.log(answer());
