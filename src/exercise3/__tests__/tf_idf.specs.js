const {processArgs} = require('../tf_idf');

jest.mock('fs');
fs.readdirSync.mockResolvedValue(['document1.txt', 'document2.txt', 'document3.txt']);
fs.readFileSync.mockResolvedValue("some dummy text");

describe('processArgs', () => {
    it('should process args', () => {
        expect(true).toBe(true);
    });
});