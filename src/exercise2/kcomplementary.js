// A: array of integers
// K: number to find the complementaries
function findKComplementary(A, K) {
    let kcomplementaries = [];
    for (let i=0; i<A.length; i++) {
        for (let j=0; j<A.length; j++) {
            if (A[i] + A[j] === K) {
                kcomplementaries.push({
                    indexes: i + ',' + j,
                    values: A[i] + ',' + A[j],
                });
            }
        }
    }
    return {K, kcomplementaries};
}

module.exports = findKComplementary;