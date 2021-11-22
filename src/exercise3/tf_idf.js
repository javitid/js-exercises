#!/usr/bin/env node
const fs = require('fs');
const {
    INDEX,
    FILE_ENCODING,
    REGEX_EXP_TO_CLEAN_WORDS,
    REGEX_FLAGS,
    SLASH
} = require('./constants.js');
const {processArgs} = require('./process_args.js');

// Read file names in directory
function getFiles(directory) {
    const files = fs.readdirSync(directory);
    const numberOfFiles = files.length;
    
    return {files, numberOfFiles};
};

// Get term ocurrencies
function getTermOccurrenciesFromFiles(directory, terms, files) {
    var occurrencies = new Map();
    files.forEach(file => {
        var occurrenciesPerFile = new Map();

        // Read file content
        const data = fs.readFileSync(directory + SLASH + file, FILE_ENCODING);

        // Set total number of words
        occurrenciesPerFile.set(INDEX.TOTAL_WORDS, data.replace(REGEX_EXP_TO_CLEAN_WORDS, ' ').split(' ').length);

        // Set occurrencies of term in the current file
        // Calculate and set TF (Term Frequency)
        occurrenciesPerFile.set(INDEX.OCCURRENCIES, getOccurreciesInContent(terms, data));
        occurrenciesPerFile.set(INDEX.TF, occurrenciesPerFile.get(INDEX.OCCURRENCIES)/occurrenciesPerFile.get(INDEX.TOTAL_WORDS));

        occurrencies.set(file, occurrenciesPerFile);
    });

    return occurrencies;
}

// Get number of occurrencies of terms in the content 
function getOccurreciesInContent(terms, content) {
    const pattern = new RegExp(`${terms}`, [REGEX_FLAGS.GLOBAL + REGEX_FLAGS.CASE_INSENSITIVE + REGEX_FLAGS.MULTIPLE_LINES]);
    return (content.match(pattern) || []).length;
}

// Calculate Tf-idf
function calculateTfIdf(occurrencies, numberOfFiles) {
    const tfIdf = new Map();
    // Get number of files with some occurrency of each term
    const filesWithTerm = getFilesWithTerms(occurrencies);

    for (document of occurrencies.keys()) {
        // Tf-idf = tf * idf
        // TF already set in occurrencies
        // Calculate IDF (Inverse Document Frequency)
        tfIdf.set(
            document,
            (filesWithTerm != 0) ?
            Number((occurrencies.get(document).get(INDEX.TF) * Math.log(numberOfFiles/filesWithTerm)).toFixed(2)):
            Number(Number(0).toFixed(2))
        );
    }

    return tfIdf;
}

// Get number of files with occurrencies for terms
function getFilesWithTerms(occurrencies) {
    return Array.from(occurrencies.values()).filter(value => value.get(INDEX.OCCURRENCIES) !== 0).length;
}

// Add tf-idf to occurrencies Map
function addTfIdf(occurrencies, tfIdf) {
    for (document of occurrencies.keys()) {
        occurrencies.get(document).set(INDEX.TF_IDF, tfIdf.get(document));
    }
}

// Show result in the console
function printResult(occurrencies, numberTop, counter) {
    console.log(`\n===== (time ${counter} seconds) =====`);

    const result = Array.from(occurrencies)
    .map((file) => {
        return {
            name: file[0],
            tfIdf: file[1].get(INDEX.TF_IDF),
        }
    })
    .sort((a, b) => b.tfIdf - a.tfIdf)
    .slice(0, numberTop);

    for (item of result) {
        console.log(item.name + ' ' + item.tfIdf);
    }
}


// ** GET PARAMETERS **
const {d, t, n, p} = processArgs();

// ** INIT FLOW **
var counter = 0;
var initialNumberOfFiles = 0;
var filesAlreadyAnalised = [];
var occurrencies = new Map();
flow(d, t, n, p);
setInterval(flow, p, d, t, n, p);

function flow(d, t, n, p) {
    // 1a. Get filenames and number of files
    var {files, numberOfFiles} = getFiles(d);

    // 1b. Remove file names already analised from the list
    files  = files.filter(a => !filesAlreadyAnalised.includes(a))

    // Since the files only can be added but no removed nor overwritten
    if (numberOfFiles > initialNumberOfFiles) {
        // 2. Read directory files and get the number of occurrencies of each term in all the files of the directory
        occurrencies = new Map([...occurrencies, ...getTermOccurrenciesFromFiles(d, t, files)]);

        // 3. Calculate tfIdf
        const tfIdf = calculateTfIdf(occurrencies, numberOfFiles);

        // 4. Add TfIdf to occurrencies Map
        addTfIdf(occurrencies, tfIdf);

        // 5. Save current number of files and filenames already analised
        initialNumberOfFiles = numberOfFiles;
        filesAlreadyAnalised = [...filesAlreadyAnalised, ...files];
    }

    // 5. Print results
    printResult(occurrencies, n, counter*p/1000);

    // 6. Update the counter
    counter++;
}

module.exports = {
    getFiles,
    getTermOccurrenciesFromFiles,
    getOccurreciesInContent,
    calculateTfIdf,
    getFilesWithTerms,
    addTfIdf
};