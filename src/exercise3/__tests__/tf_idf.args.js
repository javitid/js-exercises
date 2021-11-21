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

describe('getOccurreciesInContent', () => {
    it('should return the number of occurencies of single term in content', () => {
        const occurrecies = getOccurreciesInContent('hello', 'this is a hello world sentence. And this is a hello')
        expect(occurrecies).toBe(2);
    });

    it('should return the number of occurencies of complex term in content', () => {
        const occurrecies = getOccurreciesInContent('hello world', 'this is a hello world sentence')
        expect(occurrecies).toBe(1);
    });
});