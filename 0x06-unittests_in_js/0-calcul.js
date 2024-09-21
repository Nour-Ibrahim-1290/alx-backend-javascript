// this function returns the sum of 2 numbers

function calculateNumber(a, b) {
    if (isNaN(a) || isNaN(b)) {
        throw TypeError;
    } else if (a < 0 && b < 0) {
        return Math.round(a + b);
    } else {
        return Math.ceil(a + b);
    }
}
  
module.exports = calculateNumber;
