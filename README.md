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


COVERAGE
--------------------|---------|----------|---------|---------|-------------------
File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------|---------|----------|---------|---------|-------------------
All files           |    91.5 |    90.32 |   83.33 |   90.81 |                   
 exercise1          |     100 |      100 |     100 |     100 |                   
  palindrome.js     |     100 |      100 |     100 |     100 |                   
 exercise2          |     100 |      100 |     100 |     100 |                   
  kcomplementary.js |     100 |      100 |     100 |     100 |                   
 exercise3          |   89.53 |    88.88 |      80 |   88.88 |                   
  constants.js      |     100 |      100 |     100 |     100 |                   
  process_args.js   |     100 |      100 |     100 |     100 |                   
  tf_idf.js         |   79.54 |       50 |      75 |   79.06 | 24-37,88-93,97    
--------------------|---------|----------|---------|---------|-------------------

Test Suites: 4 passed, 4 total
Tests:       26 passed, 26 total
Snapshots:   0 total
Time:        1.011 s
Ran all test suites.