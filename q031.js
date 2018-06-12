/**
 * 
 * In England the currency is made up of pound, £, and pence, p, and there are eight coins in general circulation:
 * 
 * 1p, 2p, 5p, 10p, 20p, 50p, £1 (100p) and £2 (200p).
 * It is possible to make £2 in the following way:
 * 
 * 1×£1 + 1×50p + 2×20p + 1×5p + 1×2p + 3×1p
 * How many different ways can £2 be made using any number of coins?
 * 
 */

// ================================================================================
//    CONSTANTS
// ================================================================================

const COINS = Object.freeze([1, 2, 5, 10, 20, 50, 100, 200]);
const answerCoin = COINS[COINS.length - 1];


// ================================================================================
//    VALUES STORE
// ================================================================================

const coinSetWithMaxCache = {}


// ================================================================================
//    FUNCTIONS
// ================================================================================

const coinSetWithMax = max => coinSetWithMaxCache.hasOwnProperty(max) ? coinSetWithMaxCache[max] : coinSetWithMaxCache[max] = Object.freeze(COINS.filter(item => item <= max));

const calculateCoinsCombinations = (target, set = COINS) => {
	let combinations = 0;
	for(let i = set.length - 1; i >= 0; i--) {
		const coin = set[i];
		if (coin === target) { combinations++; }
		else if (target - coin > 0) {
			combinations += calculateCoinsCombinations(target - coin, coinSetWithMax(coin));
		}
	}
	return combinations;
};


const solution = () => calculateCoinsCombinations(answerCoin);

console.log(solution());
