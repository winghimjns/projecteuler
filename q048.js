/**
*
 * Self powers
 * Problem 48
 *
 * The series, 11 + 22 + 33 + ... + 1010 = 10405071317.
 *
 * Find the last ten digits of the series, 11 + 22 + 33 + ... + 10001000.
 *
 */

/**
 * honestly I didn't see any difficulties here, as there is only 2 level's of
 * looping for a thousand times. It's achievable with an easy solution.
 */

const LIMIT = 1000;
const DIGITS = 10;

const lastDigitsOfSelfPower = function(num, digits) {
  let output = 1;
  let mod = 10 ** (digits);
  for(let i = 1; i <= num; i++) {
    output = (output * num) % mod;
  }
  return output;
};

const selfPowerGenerator = function*(limit, digits) {
  let current = 1;
  while(current <= limit) { yield lastDigitsOfSelfPower(current++, digits); }
};

const sum = arr => arr.reduce((acc, cur) => acc + cur, 0);

const answer = () => {
  const selfPower = selfPowerGenerator(LIMIT, DIGITS);
  return sum([...selfPower]) % (10 ** DIGITS);
};

console.log(answer());
