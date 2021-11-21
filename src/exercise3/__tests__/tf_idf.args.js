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

const FAKE_FILE_CONTENT_SHORT = 'this is a hello world sentence.';
const FAKE_FILE_CONTENT_LONG = 'this is a hello world sentence. And this is a hello';

describe('getOccurreciesInContent', () => {
    beforeAll(done => {
        done();
    })

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