const SPACE_REGEX = /\s/g;
const EMPTY_STRING = '';

// Option 1, shorter code O(n^2)
// Remove spaces, convert in lowercase O(n) + O(n)
// Convert to array, reverse it, convert to string and compare with the given string
function isPalindrome(value) {
    value = value.replace(SPACE_REGEX, EMPTY_STRING).toLowerCase();
    return value === value.split(EMPTY_STRING).reverse().join(EMPTY_STRING);
}

// Option 2, more performance O(n/2)
// Remove spaces, convert in lowercase O(n) + O(n)
// Compare each char with the opposite, only needs to iterate 1/2 of the string and it can response when some compared chars don't match
function isPalindromeEfficient(value) {
    value = value.replace(SPACE_REGEX, EMPTY_STRING).toLowerCase();
    for (let i=0; i<value.length/2; i++) {
        if (value[i] !== value[value.length - i - 1]) {
            return false;
        }
    }
    return true;
}

module.exports = {isPalindrome, isPalindromeEfficient};