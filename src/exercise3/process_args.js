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
                    t = next.split(' ');
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
    if (isNaN(n)) {
        console.log('Number of top elements "n" should be a number.');
        process.exit();
    }
    if (isNaN(p)) {
        console.log('Period "p" should be a number.');
        process.exit();
    }

    return {d, t, n, p};
}

module.exports = {processArgs};