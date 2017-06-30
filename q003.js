



// function getPrimeNumbers($limit) {

// 	const __checkPrime = function(primeSet, checkItem) {
// 		if(count(primeSet) < 2) {
// 			return true;
// 		}
// 		foreach(primeSet as $i => $prime) {
// 			if($checkItem % $prime === 0) {
// 				return false;
// 			}
// 		}

// 		return true;
// 	};

// 	$primeNumbers = [];

// 	for($i = PRIME_NUMBER_START;; $i++) {

// 		if(__checkPrime($primeNumbers, $i)) {
// 			$primeNumbers[] = $i;
// 		}


// 		if(count($primeNumbers) == PRIME_NUMBERS_TO_GET) {
// 			return $primeNumbers;
// 		}
// 	}

// }


for(var i = Math.floor(600851475143 / 2); ; i--) {
	console.log(i);
	if(Number.isInteger(600851475143 / i)) {
		console.log(i);
		break;
	}
}
