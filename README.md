- Install: `npm install`
- Tests: `npm run tests`
- Coverage: `npm run coverage`

Exercise 3 notes:
- tf.idf.js file should have permission to execution: `chmod +x tf.idf.js`
- There is a parameter SEARCH_ONLY_EXACT_WORD set to true by default to search only exact words. It could be disabled:
    - true: "word" doesn't match in "Text of some words".
    - false: "word" matchs in "Text of some words".
- Example of execution: `./td-idf.js -d dir -n 5 -p 1000 -t "term1 term2 ..."`