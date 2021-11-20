const findKComplementary = require('../kcomplementary');

describe('findKComplementary', () => {
    it('should return the k-complementary element (index and value) for each element in an array', () => {
        const array = [1,2,3,4,5,6,7,8,9,10,-3,0,-20];
        const K = 7;
        const expectedResult = {
            K: 7,
            kcomplementaries: [
                { indexes: '0,5', values: '1,6' },
                { indexes: '1,4', values: '2,5' },
                { indexes: '2,3', values: '3,4' },
                { indexes: '3,2', values: '4,3' },
                { indexes: '4,1', values: '5,2' },
                { indexes: '5,0', values: '6,1' },
                { indexes: '6,11', values: '7,0' },
                { indexes: '9,10', values: '10,-3' },
                { indexes: '10,9', values: '-3,10' },
                { indexes: '11,6', values: '0,7' }
            ]
          };
        expect(findKComplementary(array, K)).toEqual(expectedResult);
    });
});