const DEFAULT_VALUES = {
    DIRECTORY: './',
    PERIOD: 1000,
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
const INDEX = {
    ARGUMENT: '-',
    OCCURRENCIES: 'occurrencies',
    TF: 'tf',
    TF_IDF: 'tfIdf',
    TOTAL_WORDS: 'totalWords'
}
const FILE_ENCODING = 'utf8';
const REGEX_EXP_TO_CLEAN_WORDS = new RegExp(/(\r\n|\n|\r|\,|\.|\;|\:|\ |\(|\)|\{|\})/gm);
const REGEX_FLAGS = {
    CASE_INSENSITIVE: 'i',
    GLOBAL: 'g',
    MULTIPLE_LINES: 'm'
};
const SLASH = '/';

module.exports = {
    DEFAULT_VALUES,
    FILE_ENCODING,
    INDEX,
    PARAMETERS,
    REGEX_EXP_TO_CLEAN_WORDS,
    REGEX_FLAGS,
    SLASH
};