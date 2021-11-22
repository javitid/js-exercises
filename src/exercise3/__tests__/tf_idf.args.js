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
        document1.set(INDEX.OCCURRENCIES + '-term1', 16);
        document1.set(INDEX.OCCURRENCIES + '-term2', 1);
        document1.set(INDEX.TF + '-term1', 0.21);
        document1.set(INDEX.TF + '-term2', 0.12);
        document1.set(INDEX.TF_IDF + '-term1', 0.10);
        document1.set(INDEX.TF_IDF + '-term2', 0.05);
        document1.set(INDEX.TF_IDF, 0.15);
        document2.set(INDEX.TOTAL_WORDS, 38);
        document2.set(INDEX.OCCURRENCIES + '-term1', 1);
        document2.set(INDEX.OCCURRENCIES + '-term2', 1)
        document2.set(INDEX.TF + '-term1', 0.42);
        document2.set(INDEX.TF + '-term2', 0.23);
        document2.set(INDEX.TF_IDF + '-term1', 0.05);
        document2.set(INDEX.TF_IDF + '-term2', 0);
        document2.set(INDEX.TF_IDF, 0.05);
        document3.set(INDEX.TOTAL_WORDS, 12);
        document3.set(INDEX.OCCURRENCIES + '-term1', 0);
        document3.set(INDEX.OCCURRENCIES + '-term2', 0);
        document3.set(INDEX.TF + '-term1', 0);
        document3.set(INDEX.TF + '-term2', 0);
        document3.set(INDEX.TF_IDF + '-term1', 0);
        document3.set(INDEX.TF_IDF + '-term2', 0);
        document3.set(INDEX.TF_IDF, 0);

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
            const terms = ['term1', 'term2'];
            const expectedTfIdfPerFile1 = new Map();
            const expectedTfIdfPerFile2 = new Map();
            const expectedTfIdfPerFile3 = new Map();
            const expectedTfIdf = new Map();

            expectedTfIdfPerFile1.set('term1', 0.09);
            expectedTfIdfPerFile1.set('term2', 0.05);
            expectedTfIdfPerFile1.set(INDEX.TF_IDF, 0.07);
            expectedTfIdfPerFile2.set('term1', 0.17);
            expectedTfIdfPerFile2.set('term2', 0.09);
            expectedTfIdfPerFile2.set(INDEX.TF_IDF, 0.13);
            expectedTfIdfPerFile3.set('term1', 0);
            expectedTfIdfPerFile3.set('term2', 0);
            expectedTfIdfPerFile3.set(INDEX.TF_IDF, 0.00);
            
            expectedTfIdf.set('document1.txt', expectedTfIdfPerFile1);
            expectedTfIdf.set('document2.txt', expectedTfIdfPerFile2);
            expectedTfIdf.set('document3.txt', expectedTfIdfPerFile3);

            const tfIdf = calculateTfIdf(occurrencies, numberOfFiles, terms);
            expect(tfIdf).toEqual(expectedTfIdf);
        });
    });

    describe('getFilesWithTerms', () => {
        it('should get the number of files with terms content', () => {
            const filesWithTerms = getFilesWithTerms(occurrencies, 'term1');
            expect(filesWithTerms).toBe(2);
        });
    });

    describe('addTfIdf', () => {
        it('should add TfIdf to occurrencies Map', () => {
            const terms = ['term1', 'term2'];
            const tfIdf = new Map();
            const tfIdfPerFile1 = new Map();
            const tfIdfPerFile2 = new Map();
            const tfIdfPerFile3 = new Map();

            tfIdfPerFile1.set('term1', 0.09);
            tfIdfPerFile1.set('term2', 0.05);
            tfIdfPerFile1.set(INDEX.TF_IDF, 0.07);
            tfIdfPerFile2.set('term1', 0.17);
            tfIdfPerFile2.set('term2', 0.09);
            tfIdfPerFile2.set(INDEX.TF_IDF, 0.13);
            tfIdfPerFile3.set('term1', 0);
            tfIdfPerFile3.set('term2', 0);
            tfIdfPerFile3.set(INDEX.TF_IDF, 0.00);
            
            tfIdf.set('document1.txt', tfIdfPerFile1);
            tfIdf.set('document2.txt', tfIdfPerFile2);
            tfIdf.set('document3.txt', tfIdfPerFile3);

            addTfIdf(occurrencies, tfIdf, terms);
            expect(occurrencies.get('document1.txt').get(INDEX.TF_IDF)).toBe(0.07);
            expect(occurrencies.get('document1.txt').get(INDEX.TF_IDF + '-term1')).toBe(0.09);
            expect(occurrencies.get('document1.txt').get(INDEX.TF_IDF + '-term2')).toBe(0.05);
            expect(occurrencies.get('document2.txt').get(INDEX.TF_IDF)).toBe(0.13);
            expect(occurrencies.get('document2.txt').get(INDEX.TF_IDF + '-term1')).toBe(0.17);
            expect(occurrencies.get('document2.txt').get(INDEX.TF_IDF + '-term2')).toBe(0.09);
            expect(occurrencies.get('document3.txt').get(INDEX.TF_IDF)).toBe(0);
            expect(occurrencies.get('document3.txt').get(INDEX.TF_IDF + '-term1')).toBe(0);
            expect(occurrencies.get('document3.txt').get(INDEX.TF_IDF + '-term2')).toBe(0);
        });
    });
});