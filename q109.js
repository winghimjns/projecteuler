/**
 * Problem 109
 *
 * In the game of darts a player throws three darts at a target board which is split into twenty equal sized sections numbered one to twenty.
 *
 *
 *  The score of a dart is determined by the number of the region that the dart lands in. A dart landing outside the red/green outer ring scores zero. The black and cream regions inside this ring represent single scores. However, the red/green outer ring and middle ring score double and treble scores respectively.
 *
 *  At the centre of the board are two concentric circles called the bull region, or bulls-eye. The outer bull is worth 25 points and the inner bull is a double, worth 50 points.
 *
 *  There are many variations of rules but in the most popular game the players will begin with a score 301 or 501 and the first player to reduce their running total to zero is a winner. However, it is normal to play a "doubles out" system, which means that the player must land a double (including the double bulls-eye at the centre of the board) on their final dart to win; any other dart that would reduce their running total to one or lower means the score for that set of three darts is "bust".
 *
 *  When a player is able to finish on their current score it is called a "checkout" and the highest checkout is 170: T20 T20 D25 (two treble 20s and double bull).
 *
 *  There are exactly eleven distinct ways to checkout on a score of 6:
 *
 *
 *  D3
 *
 *
 *  D1	D2
 *  S2	D2
 *  D2	D1
 *  S4	D1
 *  S1	S1	D2
 *  S1	T1	D1
 *  S1	S3	D1
 *  D1	D1	D1
 *  D1	S2	D1
 *  S2	S2	D1
 *  Note that D1 D2 is considered different to D2 D1 as they finish on different doubles. However, the combination S1 T1 D1 is considered the same as T1 S1 D1.
 *
 *  In addition we shall not include misses in considering combinations; for example, D3 is the same as 0 D3 and 0 0 D3.
 *
 *  Incredibly there are 42336 distinct ways of checking out in total.
 *
 *  How many distinct ways can a player checkout with a score less than 100?
 *
 */

/**
 *
 * my first approach:
 *
 * To brute force it, I can do 100 minus the last dart (double 1...20 and 25), and generate all the combinations to
 * get the rest
 *
 * e.g. 100 - D25 = 100 - 50 = 50
 * So we should find out all the combinations which can reach 50 with 2, 1 or 0 dart(s) (order is not important)
 *
 * So we should make a loop which tries the number from 100 to 2 (surely descending), then minus the double value,
 * declare it as "r" here (means "rest of")
 *
 *
 */
const R = require("ramda");

// ================================================================================
//    FUNCTION
// ================================================================================

const single = R.identity;
const double = R.multiply(R.__, 2);
const treble = R.multiply(R.__, 3);

const fromSingle = R.identity;
const fromDouble = R.divide(R.__, 2);
const fromTreble = R.divide(R.__, 3);

const isPositive = R.lt(0);
const isValidPoint = R.both(isPositive, Number.isInteger);


// ================================================================================
//    CONSTANTS
// ================================================================================

// const MAX = 100;
const MAX = 10;
const MIN = 2;

const bullsEye = 25;
const singlable = [...R.range(1, 20), bullsEye];
const doublable = [...R.range(1, 20), bullsEye];
const treblable = R.range(1, 20);

const singled = R.map(single, singlable);
const doubled = R.map(double, doublable);
const trebled = R.map(treble, treblable);

// all combinations
const all = R.pipe(
    R.uniq,
    R.sort(R.subtract)
)([].concat(singled, doubled, trebled));


// ================================================================================
//    CLASSES
// ================================================================================

class Combinations extends Array {
    constructor(...props) {
        super(...props);
    }

    addUnique(checkout) {
        return (!this.hasCheckout(checkout)) && this.push(checkout);
    }

    hasCheckout(checkout) {
        return this.some(item => item.equals(checkout));
    }

    toString() {
        return this.join("\n");
    }
}


class Checkout {
    constructor(...all) {
        const final = all.pop();
        const darts = all;
        this.final = final;
        this.darts = darts;
    }

    pushDart(dart) { this.darts.push(dart); }
    setFinal(final) { this.final = final; };
    hasUsualDart(dartTry) { return this.darts.some(dart => {
        dart.equals(dartTry);
    }); }

    equals(checkout) {
        return this.darts.every(dart => checkout.hasUsualDart(dart)) && this.final === checkout.final;
    }

    toString() {
        const darts = [...this.darts, this.final];
        const sum = darts.reduce((acc, current) => current.getPoint() + acc, 0);
        return `[${darts.join(', ')}] >>> ${sum}`;
    }
}

class Dart {

    static allCombinations(point) {
        return [
            isValidPoint(fromSingle(point)) && (new Dart(fromSingle(point), Dart.SINGLE)),
            isValidPoint(fromDouble(point)) && (new Dart(fromDouble(point), Dart.DOUBLE)),
            isValidPoint(fromTreble(point)) && (new Dart(fromTreble(point), Dart.TREBLE)),
        ].filter(R.identity);
    }

    constructor(base, alt) {
        this.base = base;
        this.alt = alt;
    }

    equals(dart) {
        return this.base === dart.base && this.alt === dart.alt;
    }

    getPoint() {
        switch(this.alt) {
            case Dart.DOUBLE: return double(this.base);
            case Dart.TREBLE: return treble(this.base);
            case Dart.SINGLE:
            default: return single(this.base);
        }
    }

    toString() {
        return ('0' + this.base).substring(-2) + this.alt[0];
    }
}
Dart.SINGLE = 'SINGLE';
Dart.DOUBLE = 'DOUBLE';
Dart.TREBLE = 'TREBLE';


// ================================================================================
//    ANSWER
// ================================================================================

const answer = function() {

    const combinations = new Combinations();

    R.range(MIN, R.inc(MAX)).reverse().forEach(totalPoint => {

        // final dart (needs to be double)
        doubled.forEach(finalDartPoint => {
            const r = totalPoint - finalDartPoint;
            const finalDart = new Dart(fromDouble(finalDartPoint), Dart.DOUBLE);

            // condition, skip this try if the current point is already lower than zero
            if (r < 0) { return; }

            // finish if the point is zero
            if (r === 0) {
                combinations.addUnique(new Checkout(finalDart));
                return;
            }

            // 1 of the 2 darts (or one of the only dart)
            all.forEach(dart1 => {
                const r1 = r - dart1;
                const dart1Combinations = Dart.allCombinations(dart1);

                // same checking
                if (r1 < 0) { return; }

                // check if finish...again
                if (r1 === 0) {
                    dart1Combinations.forEach(dart => combinations.addUnique(new Checkout(dart, finalDart)));
                    return;
                }

                // the ony dart left
                all.forEach(dart2 => {
                    const r2 = r1 - dart2;
                    const dart2Combinations = Dart.allCombinations(dart2);

                    if (r2 === 0) {
                        dart1Combinations.forEach(dart1 => {
                            dart2Combinations.forEach(dart2 => {
                                combinations.addUnique(new Checkout(dart1, dart2, finalDart));
                            });
                        });
                    }

                });

            });

        })
    });

    return combinations;
};

console.log(answer().toString());
