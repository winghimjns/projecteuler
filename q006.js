
// ================================================================================
//    FUNCTIONS
// ================================================================================

const squareOfNatural = (min, max) => {
    var sum = 0;
    for(var i = min; i <= max; i++) {
        sum += Math.pow(i, 2);
    }
    return sum;
};

const squareOfSum = (min, max) => {
    var sum = 0;
    for(var i = min; i <= max; i++) {
        sum += i;
    }
    return Math.pow(sum, 2);
}


// ================================================================================
//    ANSWER
// ================================================================================

const MIN = 1;
const MAX = 100;

const answer = () => {
    return (squareOfSum(1, 100) - squareOfNatural(1, 100));
};


console.log(answer());