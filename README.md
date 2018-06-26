# Project Euler 歐拉計劃

https://projecteuler.net

> "Project Euler exists to encourage, challenge, and develop the skills and enjoyment of anyone with an interest in the fascinating world of mathematics."

加入咗歐拉計劃之後，我首先完成咗大概二十幾條問題，之後丟低咗。而加又開始返做，因為最近離咗職，去緊旅行嘅時候坐火車有時間，就攞返啲問題出嚟做。一來消磨吓時間，二來因為呢個都算係一個遊戲同娛樂。自己平時又會唔為意喺日常都會思考啲問題點解決。

自己本身比較做開前端嘅development，只不過大專時讀過　Data Structure & Algorithms ，或者會有少少幫助。

好多時前端嘅工作未必需要太多 algorithms ，除咗好少時候要砌某些比較複雜嘅圖形。亦都因為同樣理由，有時同其他人合作做 web development 嘅時候都會發覺仍哋未必可以解決到比較複雜嘅task。

而喺呢度一直做唔同嘅問題，就可以一直保持返自己思考，畀自己保持返一個最好狀態去諗啲日常工作鮮有嘅問題。

不過最緊要係可以消磨到時間同埋都幾好玩。

---------------------------------------------------------

另外，好多問題都會需要用到一個質數 generator，以下呢個係我嘅做法：

```javascript
const primeNumberGenerator = function* () {
	
	// possible prime factors; these prime numbers are going to divide / test the numbers which are possible to be primes. It's basically just all prime numbers except 2
	const primeFactors = [];
	
	const checkPrime = num => {
		for(let i = 0; i < primeFactors.length; i++) {
			
			const prime = primeFactors[i];
			
			// !!! see this, I divide it instead of mod it. Because the second check it does with this quotient may reduce part of this iteration
			const quotient = num / prime;
			
			// if this number is dividable
			if (Number.isInteger(quotient)) { return false; }
			
			// if the quotient is lesser than the divisor, it's pointless to check anymore.
			else if (quotient < prime) {
				return true;
			}
		}
		
		return true;
	};
	
	// first prime number is 2
	yield 2;
	
	for(let i = 3;; i += 2) {
		if (checkPrime(i)) {
			primeFactors.push(i);
			yield i;
		}
	}
};

// generate the first 100 prime numbers
let count = 0;

for(let primeNumber of primeNumberGenerator()) {
	console.log(primeNumber);
	count++;
	if (count >= 100) { break; }
}

```

2018-06-26
