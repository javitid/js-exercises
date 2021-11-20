#!/usr/bin/env node
const fs = require('fs');
const {
    FILE_ENCODING,
    REGEX_FLAGS,
    SEARCH_ONLY_EXACT_WORD,
    SLASH,
} = require('./constants.js');
const {processArgs} = require('./process_args.js');

function getTermOccurrenciesFromFiles(directory, terms) {
    var occurrencies = new Map();

    // Read file names in directory
    const files = fs.readdirSync(directory);
    const numberOfFiles = files.length;
    
    if (files) {
        files.forEach(file => {
            var occurrenciesPerFile = new Map();

            // Read file content
            const data = fs.readFileSync(directory + SLASH + file, FILE_ENCODING);

            // Set total number of words
            occurrenciesPerFile.set('totalWords', data.split(' ').length);

            // Set occurrencies of each term in the current file
            // Calculate and sert TF (Term Frequency)
            for (let term of terms) {
                occurrenciesPerFile.set(term, getOccurreciesInContent(term, data));
                occurrenciesPerFile.set('tf-' + term, occurrenciesPerFile.get(term)/occurrenciesPerFile.get('totalWords'));
            }

            occurrencies.set(file, occurrenciesPerFile);
        });
    }

    return {numberOfFiles, occurrencies};
}

function getOccurreciesInContent(term, content) {
    if (SEARCH_ONLY_EXACT_WORD) {
        return content.split(' ').filter((value) => value === term).length;
    } else {
        const pattern = new RegExp(`${term}`, [REGEX_FLAGS.GLOBAL + REGEX_FLAGS.CASE_INSENSITIVE]);
        return (content.match(pattern) || []).length;
    }
}

function calculateTfIdf(occurrencies, terms, numberOfFiles) {
    // Get number of files with any occurrency of each term
    const filesWithTerm = getFilesWithTerm(occurrencies, terms);

    var idf = new Map();
    // Calculate IDF (Inverse Document Frequency) for each term
    for (term of terms) {
        // Tf-idf = idf * tf
        idf.set(term, Math.log10(numberOfFiles/filesWithTerm[term]));
    }

    for (document of occurrencies.keys()) {
        for (term of terms) {
            // Tf-idf = idf * tf
            occurrencies.get(document).set('tfIdf-' + term, idf.get(term)*occurrencies.get(document).get('tf-' + term));
        }
    }

    return occurrencies;
}

// Get number of files with occurrencies for each term
function getFilesWithTerm(occurrencies, terms) {
    var totalCount = [];
    for (let term of terms) {
        totalCount[term] = Array.from(occurrencies.values()).filter(value => value.get(term) !== 0).length;
    }
    return totalCount;
}

function printResult(occurrencies, terms, numberTop, counter) {
    console.log(`\n===== (time ${counter}) =====`);
    for (let term of terms) {
        console.log('Term: ' + term);
        const result = Array.from(occurrencies)
        .map((file) => {
            return {
                name: file[0],
                tfIdf: file[1].get('tfIdf-' + term),
            }
        })
        .sort((a, b) => b.tfIdf - a.tfIdf)
        .slice(0, numberTop);
        for (item of result) {
            console.log(item.name + ' ' + item.tfIdf);
        }
        
    }
}


// ** GET PARAMETERS **
const {d, t, n, p} = processArgs();

// ** INIT FLOW **
var counter = 0;
flow(d, t, n, p);
setInterval(flow, p, d, t, n, p);

function flow(d, t, n, p) {
    // 1. Read directory files and get the number of occurrencies of each term in all the files of the directory
    const {numberOfFiles, occurrencies} = getTermOccurrenciesFromFiles(d, t);

    // 2. Calculate idf
    calculateTfIdf(occurrencies, t, numberOfFiles);

    // 3. Print results
    printResult(occurrencies, t, n, counter*p);

    // 4. Update the counter
    counter++;
}
