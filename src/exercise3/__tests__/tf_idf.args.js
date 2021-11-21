jest.mock('fs');
jest.useFakeTimers();
jest.spyOn(global, 'setInterval');

const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
const {
    getTermOccurrenciesFromFiles,
    getOccurreciesInContent,
    calculateTfIdf,
    getFilesWithTerms,
    addTfIdf
} = require('../tf_idf.js');
const {INDEX} = require('../constants.js');
const { beforeAll } = require('@jest/globals');

const FAKE_FILE_CONTENT_SHORT = 'this is a hello world sentence.';
const FAKE_FILE_CONTENT_LONG = 'this is a hello world sentence. And this is a hello';

describe('tf_idf', () => {
    beforeAll(() => {

    });

    describe('getOccurreciesInContent', () => {
        it('should find the number of occurencies of single term in content', () => {
            const occurrecies = getOccurreciesInContent('hello', FAKE_FILE_CONTENT_LONG);
            expect(occurrecies).toBe(2);
        });

        it('should find the number of occurencies of complex term in content', () => {
            const occurrecies = getOccurreciesInContent('hello world', FAKE_FILE_CONTENT_SHORT);
            expect(occurrecies).toBe(1);
        });

        it('should not be case sensitive', () => {
            const occurrecies = getOccurreciesInContent('Hello', FAKE_FILE_CONTENT_SHORT);
            expect(occurrecies).toBe(1);
        });
    });

    describe('calculateTfIdf', () => {
        it('should set tfIdf Map from occurrencies and numberOfFiles ', () => {
            const occurrencies = new Map();
            const document1 = new Map();
            const document2 = new Map();
            const document3 = new Map();
            const numberOfFiles = 3;

            document1.set(INDEX.TOTAL_WORDS, 38);
            document1.set(INDEX.OCCURRENCIES, 16);
            document1.set(INDEX.TF, 0.42105263157894735);
            document2.set(INDEX.TOTAL_WORDS, 38);
            document2.set(INDEX.OCCURRENCIES, 1);
            document2.set(INDEX.TF, 0.058823529411764705);
            document3.set(INDEX.TOTAL_WORDS, 12);
            document3.set(INDEX.OCCURRENCIES, 0);
            document3.set(INDEX.TF, 0);

            occurrencies.set('document1.txt', document1);
            occurrencies.set('document2.txt', document2);
            occurrencies.set('document3.txt', document3);
            
            const expectedTfIdf = new Map();
            expectedTfIdf.set('document1.txt', 0.17);
            expectedTfIdf.set('document2.txt', 0.02);
            expectedTfIdf.set('document3.txt', 0);

            const tfIdf = calculateTfIdf(occurrencies, numberOfFiles);
            expect(tfIdf).toEqual(expectedTfIdf);
        });
    });

    describe('getFilesWithTerms', () => {
        it('should get the number of files with terms content', () => {
            const occurrencies = new Map();
            const document1 = new Map();
            const document2 = new Map();
            const document3 = new Map();

            document1.set(INDEX.TOTAL_WORDS, 38);
            document1.set(INDEX.OCCURRENCIES, 16);
            document1.set(INDEX.TF, 0.42105263157894735);
            document2.set(INDEX.TOTAL_WORDS, 38);
            document2.set(INDEX.OCCURRENCIES, 1);
            document2.set(INDEX.TF, 0.058823529411764705);
            document3.set(INDEX.TOTAL_WORDS, 12);
            document3.set(INDEX.OCCURRENCIES, 0);
            document3.set(INDEX.TF, 0);

            occurrencies.set('document1.txt', document1);
            occurrencies.set('document2.txt', document2);
            occurrencies.set('document3.txt', document3);
            
            const expectedTfIdf = new Map();
            expectedTfIdf.set('document1.txt', 0.17);
            expectedTfIdf.set('document2.txt', 0.02);
            expectedTfIdf.set('document3.txt', 0);

            const filesWithTerms = getFilesWithTerms(occurrencies);
            expect(filesWithTerms).toBe(2);
        });
    });
});