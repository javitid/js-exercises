const {isPalindrome, isPalindromeEfficient} = require('../palindrome');

describe('isPalindrome', () => {
    it('should returns false when the word is not a palindrome', () => {
        expect(isPalindrome('abc')).toBe(false);
    });

    describe('should returns true when the word is a palindrome', () => {
        it('and there is an odd number of chars', () => {
            expect(isPalindrome('palindromemordnilap')).toBe(true);
        });

        it('and there is an even number of chars', () => {
            expect(isPalindrome('arra')).toBe(true);
        });

        it('and there are spaces and/or capitols', () => {
            expect(isPalindrome('Dabale arroz a la zorra el abad')).toBe(true);
        });
    });
});

describe('isPalindromeEfficient', () => {
    it('should returns false when the word is not a palindrome', () => {
        expect(isPalindromeEfficient('abc')).toBe(false);
    });

    describe('should returns true when the word is a palindrome', () => {
        it('and there is an odd number of chars', () => {
            expect(isPalindromeEfficient('palindromemordnilap')).toBe(true);
        });

        it('and there is an even number of chars', () => {
            expect(isPalindromeEfficient('arra')).toBe(true);
        });

        it('and there are spaces and/or capitols', () => {
            expect(isPalindromeEfficient('Dabale arroz a la zorra el abad')).toBe(true);
        });
    });
});