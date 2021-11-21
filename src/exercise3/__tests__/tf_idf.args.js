jest.useFakeTimers();
jest.spyOn(global, 'setInterval');

jest.mock('fs');
jest.spyOn(process, 'exit').mockImplementation(() => {});
const {
    getOccurreciesInContent,
    calculateTfIdf,
    getFilesWithTerms,
    addTfIdf
} = require('../tf_idf.js');
const {INDEX} = require('../constants.js');

const FAKE_FILE_CONTENT_SHORT = 'this is a hello world sentence.';
const FAKE_FILE_CONTENT_LONG = 'this is a hello world sentence. And this is a hello';

describe('tf_idf', () => {
    const occurrencies = new Map();
    const directory = 'documents';
    const numberOfFiles = 3;

    beforeEach(() => {
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
            const filesWithTerms = getFilesWithTerms(occurrencies);
            expect(filesWithTerms).toBe(2);
        });
    });

    describe('addTfIdf', () => {
        it('should add TfIdf to occurrencies Map', () => {
            const tfIdf = new Map();
            tfIdf.set('document1.txt', 0.17);
            tfIdf.set('document2.txt', 0.02);
            tfIdf.set('document3.txt', 0);

            addTfIdf(occurrencies, tfIdf);
            expect(occurrencies.get('document1.txt').get(INDEX.TF_IDF)).toBe(0.17);
            expect(occurrencies.get('document2.txt').get(INDEX.TF_IDF)).toBe(0.02);
            expect(occurrencies.get('document3.txt').get(INDEX.TF_IDF)).toBe(0);
        });
    });
});