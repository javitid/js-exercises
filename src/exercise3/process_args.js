const {
    DEFAULT_VALUES,
    PARAMETERS,
    PREFIX
} = require('./constants.js');

// Set parameters to an object with the input data
function processArgs() {
    var d='', t=[], n='', p='';
    // Discard 2 first arguments because they are paths
    // Set parameters to uppercase, keep the values as they are in the input
    var args = process.argv.slice(2).map(argument => (argument[0] === PREFIX.ARGUMENT) ? argument.toUpperCase() : argument);
    
    args.forEach((argument, index) => {
        const isOption = argument[0] === PREFIX.ARGUMENT;

        if (isOption) {
            const next = args[index+1];
            switch (argument) {
                case PARAMETERS.DIRECTORY:
                    d = next;
                    break;
                case PARAMETERS.TERMS:
                    t = Array.from(next.split(' '));
                    break;
                case PARAMETERS.NUMBER_TOP:
                    n = parseInt(next);
                    break;
                case PARAMETERS.PERIOD:
                    p = parseInt(next);
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
    }
    if (typeof(p) != 'number') {
        console.log('Period "p" should be a number.');
    }
    if (t === '') {
        console.log('Parameter "t" is mandatory. Terms to be analyzed.');
        console.log('Example of execution: ./td-idf.js -d dir -n 5 -p 1000 -t "term1 term2 ..."');
    }

    return {d, t, n, p};
}

module.exports = {processArgs};