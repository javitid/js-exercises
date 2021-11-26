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

// A: array of integers
// K: number to find the complementaries
// It creates a Map with values found as key, and value an array with the indexes where there are these values
function findKComplementaryBestEfficience(A, K) {
    let mapPositions = new Map();
    for (let i=0; i<A.length; i++) {
        if (mapPositions.has(A[i])) {
            mapPositions.get(A[i]).push(i);
        } else {
            mapPositions.set(A[i], [i]);
        }
    }

    return mapPositions;
}

module.exports = {findKComplementary, findKComplementaryBestEfficience};