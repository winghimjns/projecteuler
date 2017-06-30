
var evenNumbers = [];
var last = [0, 1];
var total = 4000000;
var fib = last[0] + last[1];

while (fib < total) {
	fib = last[0] + last[1];

	if (fib % 2 === 0) {
		evenNumbers.push(fib);
	}

	last[0] = last[1];
	last[1] = fib;
}

var sum = 0;
for (i = 0; i < evenNumbers.length; i++) {
	sum += evenNumbers[i];
}

console.log(sum);
