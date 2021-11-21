#!/usr/bin/env node
const fs = require('fs');
const {
    FILE_ENCODING,
    PREFIX,
    REGEX_EXP_TO_CLEAN_WORDS,
    REGEX_FLAGS,
    SEARCH_ONLY_EXACT_WORD,
    SLASH,
    TOTAL_WORDS
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
            occurrenciesPerFile.set(TOTAL_WORDS, data.replace(REGEX_EXP_TO_CLEAN_WORDS, ' ').split(' ').length);

            // Set occurrencies of each term in the current file
            // Calculate and sert TF (Term Frequency)
            for (let term of terms) {
                occurrenciesPerFile.set(term, getOccurreciesInContent(term, data));
                occurrenciesPerFile.set(PREFIX.TF + term, occurrenciesPerFile.get(term)/occurrenciesPerFile.get(TOTAL_WORDS));
            }

            occurrencies.set(file, occurrenciesPerFile);
        });
    }

    return {numberOfFiles, occurrencies};
}

function getOccurreciesInContent(term, content) {
    if (SEARCH_ONLY_EXACT_WORD) {
        return content
        .replace(REGEX_EXP_TO_CLEAN_WORDS, ' ')
        .split(' ')
        .filter((value) => value === term)
        .length;
    } else {
        const pattern = new RegExp(`${term}`, [REGEX_FLAGS.GLOBAL + REGEX_FLAGS.CASE_INSENSITIVE + REGEX_FLAGS.MULTIPLE_LINES]);
        return (content.match(pattern) || []).length;
    }
}

function calculateTfIdf(occurrencies, terms, numberOfFiles) {
    const tfIdf = new Map();
    // Get number of files with some occurrency of each term
    const filesWithTerm = getFilesWithTerm(occurrencies, terms);

    for (document of occurrencies.keys()) {
        for (term of terms) {
            // Tf-idf = tf * idf
            // TF already set in occurrencies
            // Calculate IDF (Inverse Document Frequency) for each term
            tfIdf.set(
                document + PREFIX.ARGUMENT + term,
                (filesWithTerm[term] != 0) ?
                (occurrencies.get(document).get(PREFIX.TF + term) * Math.log(numberOfFiles/filesWithTerm[term])).toFixed(2):
                Number(0).toFixed(2)
            );
        }
    }

    return tfIdf;
}

function addTfIdf(occurrencies, tfIdf, terms) {
    for (document of occurrencies.keys()) {
        for (term of terms) {
            occurrencies.get(document).set(PREFIX.TF_IDF + term, tfIdf.get(document + PREFIX.ARGUMENT + term));
        }
    }
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
                tfIdf: file[1].get(PREFIX.TF_IDF + term),
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
    const tfIdf = calculateTfIdf(occurrencies, t, numberOfFiles);

    // 3. Add TfIdf to occurrencies Map
    addTfIdf(occurrencies, tfIdf, t);

    // 3. Print results
    printResult(occurrencies, t, n, counter*p);

    // 4. Update the counter
    counter++;
}