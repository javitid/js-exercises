- Install: `npm install`
- Tests: `npm run tests`
- Coverage: `npm run coverage`

Exercise 1 - Palindrome:
    - isPalindrome -> O(n^2)
    - isPalindromeEfficient -> O(n/2)
    Note: it was not in the spaces but I added in both methods a way to "Remove spaces O(n) and convert in lowercase O(n)" that are adding extra complexity

Exercise 2 - K-complementary:
    - findKComplementary -> O(n^2)

Exercise 3:
    - processArgs -> O(n)
    - getFiles -> O(1)
    - getTermOccurrenciesFromFiles -> O(n)
    - getOccurreciesInContent -> O(n)
    - calculateTfIdf -> O(n)
    - getFilesWithTerms -> O(n)
    - addTfIdf -> O(1)
    - printResult -> O(n)

    Notes:
        - tf_idf.js is the main file and it should have permission to execution: `chmod +x tf.idf.js`
        - Example of execution: `./td_idf.js -d dir -n 5 -p 1000 -t "term1 term2 ..."`