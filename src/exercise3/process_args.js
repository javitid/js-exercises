const {
    DEFAULT_VALUES,
    INDEX,
    PARAMETERS
} = require('./constants.js');

// Set parameters to an object with the input data
function processArgs(args) {
    var d='', t='', n='', p='';
    // Discard 2 first arguments because they are paths
    // Set parameters to uppercase, keep the values as they are in the input
    var args = args || process.argv.slice(2);
    args = args.map(argument => (argument[0] === INDEX.ARGUMENT) ? argument.toUpperCase() : argument);
    
    args.forEach((argument, index) => {
        const isOption = argument[0] === INDEX.ARGUMENT;

        if (isOption) {
            const next = args[index+1];
            switch (argument) {
                case PARAMETERS.DIRECTORY:
                    d = next;
                    break;
                case PARAMETERS.TERMS:
                    t = next;
                    break;
                case PARAMETERS.NUMBER_TOP:
                    n = next;
                    break;
                case PARAMETERS.PERIOD:
                    p = next;
                    break;
                default:
                    console.log('Wrong parameter: ' + args[index]);
                    break;
            }
        }
    });

    // Default values
    d = (d === '') ? DEFAULT_VALUES.DIRECTORY : d;
    n = (n === '') ? DEFAULT_VALUES.NUMBERS_TOP : n;
    p = (p === '') ? DEFAULT_VALUES.PERIOD : p;

    // Validations
    if (typeof(n) != 'number') {
        console.log('Number of top elements "n" should be a number.');
        process.exit();
    }
    if (typeof(p) != 'number') {
        console.log('Period "p" should be a number.');
        process.exit();
    }
    if (t === '') {
        console.log('Parameter "t" is mandatory. Terms to be analyzed.');
        console.log('Example of execution: ./td-idf.js -d dir -n 5 -p 1000 -t "term1 term2 ..."');
        process.exit();
    }

    // Set n and p as int values
    n = parseInt(n);
    p = parseInt(p);

    return {d, t, n, p};
}

module.exports = {processArgs};