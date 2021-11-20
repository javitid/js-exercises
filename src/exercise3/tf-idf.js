#!/usr/bin/env node
const fs = require('fs');
const { endianness } = require('os');
const { exit } = require('process');

// Enable search for exact words. Ex:
// (true: "word" doesn't match in "Text of some words")
// (false: "word" matchs in "Text of some words")
const SEARCH_ONLY_EXACT_WORD = true;

const DEFAULT_VALUES = {
    DIRECTORY: './',
    PERIOD: 5000,
    NUMBERS_TOP: 3,
};

// D: The directory D from which documents will be read.
// T: The terms T to be analyzed.
// N: The count N of top results to show.
// P: The period P (milliseconds) to report the top N.
const PARAMETERS = {
    'DIRECTORY': '-D',
    'TERMS': '-T',
    'NUMBER_TOP': '-N',
    'PERIOD': '-P'
};
const ARGUMENT_PREFIX = '-';
const FILE_ENCODING = 'utf8';
const REGEX_FLAGS = {
    CASE_INSENSITIVE: 'i',
    GLOBAL: 'g',
};
const SLASH = '/';

// Set parameters to an object with the input data
function processArgs() {
    var d='', t=[], n='', p='';
    // Discard 2 first arguments because they are paths
    // Set parameters to uppercase, keep the values as they are in the input
    var args = process.argv.slice(2).map(argument => (argument[0] === ARGUMENT_PREFIX) ? argument.toUpperCase() : argument);
    
    args.forEach((argument, index) => {
        const isOption = argument[0] === ARGUMENT_PREFIX;

        if (isOption) {
            const next = args[index+1];
            switch (argument) {
                case PARAMETERS.DIRECTORY:
                    d = next;
                    break;
                case PARAMETERS.TERMS:
                    t = Array.from(next.split(' '));
                    break;
                case PARAMETERS.NUMBER_TOP:
                    n = next;
                    break;
                case PARAMETERS.PERIOD:
                    p = next;
                    break;
                default:
                    console.log('Wrong parameter: ' + args[index]);
                    break;
            }
        }
    });

    // Default values
    d = (d === '') ? DEFAULT_VALUES.DIRECTORY : d;
    n = (n === '') ? DEFAULT_VALUES.NUMBERS_TOP : n;
    p = (p === '') ? DEFAULT_VALUES.PERIOD : p;
    if (t === '') {
        console.log('Parameter "t" is mandatory. Terms to be analyzed.');
        console.log('Example of execution: ./td-idf.js -d dir -n 5 -p 1000 -t "term1 term2 ..."');
    }

    return {d, t, n, p};
}

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
