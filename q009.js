

const SUM = 1000;
const MAX_A = SUM >> 1; // triangle theory
const MAX_C = SUM >> 1; // triangle theory
const MIN_A = 1;
const MIN_B = 1;
const MIN_C = 1;


const answer = () => {
    for(var i = 1; i < MAX_C; i++) {
        const cTry = i; // just for naming
        const cSqTry = cTry * cTry;

        for(var j = 1; j < MAX_A; j++) {
            const aTry = j;
            const aSqTry = aTry * aTry;

            const bSqTry = cSqTry - aSqTry;
            const bTry = Math.sqrt(bSqTry);

            if(Number.isInteger((bTry)) && aTry + bTry + cTry == SUM) {
                return aTry * bTry * cTry;
            }

        }
    }
};

console.log(answer());
