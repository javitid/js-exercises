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

module.exports = {
    ARGUMENT_PREFIX,
    DEFAULT_VALUES,
    FILE_ENCODING,
    PARAMETERS,
    REGEX_FLAGS,
    SEARCH_ONLY_EXACT_WORD,
    SLASH
};