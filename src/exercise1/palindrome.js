const SPACE_REGEX = /\s/g;
const SPACE = ' ';
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

// Option 3, best performance with only an iteration O(n)
// 2 pointers from the start and from the end, compare value of both pointers.
// If a space is found in the start pointer then move forward the end pointer to repeat it in the next iteration.
// If a space is found in the end pointer then move backward the start pointer to repeat it in the next iteration.
function isPalindromeBestEfficience(value) {
    for (let i=0,j=value.length-1; i<j; i++,j--) {
        if (value[i] === SPACE) {
            j++;
        } else if (value[j] === SPACE) {
            i--;
        } else if (value[i].toLowerCase() !== value[j].toLowerCase()) {
            return false;
        }
    }
    return true;
}

module.exports = {isPalindrome, isPalindromeEfficient, isPalindromeBestEfficience};