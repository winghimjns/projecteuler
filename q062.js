/**
 *
 * Cubic permutations
 * Problem 62
 * The cube, 41063625 (3453), can be permuted to produce two other cubes: 56623104 (3843) and 66430125 (4053). In fact, 41063625 is the smallest cube which has exactly three permutations of its digits which are also cube.
 *
 * Find the smallest cube for which exactly five permutations of its digits are cube.
 *
 */

// i solved this easily but would like to see if there's any other better solutions for it

const currentDigitCount = 1;
const digitList = {};

const answer = () => {
  for(let i = 3;; i++) {
    const cube = i * i * i;
    const cubeStr = cube.toString();
    const sorted = [...cubeStr].sort().join('');
    digitList.hasOwnProperty(sorted) ? digitList[sorted].count++ : (digitList[sorted] = { smallest: cube, count: 1 });
    if (digitList[sorted].count === 5) {
      return digitList[sorted].smallest;
    }
  }
};

console.log(answer());
