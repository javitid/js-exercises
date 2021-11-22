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
        - Total tf-idf for several terms is the sum of individual tf-idf for each term divided by the number of terms


COVERAGE
--------------------|---------|----------|---------|---------|---------------------------
File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s         
--------------------|---------|----------|---------|---------|---------------------------
All files           |   83.73 |    90.32 |   73.68 |   83.33 |                           
 exercise1          |     100 |      100 |     100 |     100 |                           
  palindrome.js     |     100 |      100 |     100 |     100 |                           
 exercise2          |     100 |      100 |     100 |     100 |                           
  kcomplementary.js |     100 |      100 |     100 |     100 |                           
 exercise3          |   80.58 |    88.88 |   68.75 |   80.41 |                           
  constants.js      |     100 |      100 |     100 |     100 |                           
  process_args.js   |     100 |      100 |     100 |     100 |                           
  tf_idf.js         |   67.21 |       50 |   61.53 |   67.79 | 22-41,100-105,109,135-146 
--------------------|---------|----------|---------|---------|---------------------------

Test Suites: 4 passed, 4 total
Tests:       26 passed, 26 total
Snapshots:   0 total
Time:        0.955 s, estimated 1 s
Ran all test suites.