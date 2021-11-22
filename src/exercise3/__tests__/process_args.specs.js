const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
const {processArgs} = require('../process_args.js');
const {DEFAULT_VALUES} = require('../constants.js');

describe('processArgs', () => {
    describe('should retrieve input parameters', () => {
        it('directory d', () => {
            const args = '-d directory';

            const {d} = processArgs(args.split(' '));
            expect(d).toBe('directory');
        });

        it('period p', () => {
            const args = '-p 1000';

            const {p} = processArgs(args.split(' '));
            expect(p).toBe(1000);
        });

        it('numbers top n', () => {
            const args = '-n 3';

            const {n} = processArgs(args.split(' '));
            expect(n).toBe(3);
        });

        it('terms t', () => {
            const args = '-t "term1 term2"';

            const {t} = processArgs(['-t', 'term1 term2']);
            expect(t).toEqual(['term1', 'term2']);
        });

        it('several terms in the same line', () => {
            const args = ['-d', 'directory', '-p', 1000, '-n', 3, '-t', 'term1'];

            const {d, t, n, p} = processArgs(args);
            expect(d).toBe('directory');
            expect(p).toBe(1000);
            expect(n).toBe(3);
            expect(t).toEqual(['term1']);
        });

        it('and support capitol letters', () => {
            const args = ['-D', 'directory', '-P', 1000, '-N', 3, '-T', 'term1'];

            const {d, t, n, p} = processArgs(args);
            expect(d).toBe('directory');
            expect(p).toBe(1000);
            expect(n).toBe(3);
            expect(t).toEqual(['term1']);
        });
    });

    describe('should set default values if there are not in the input', () => {
        it('directory d', () => {
            const {d} = processArgs([]);
            expect(d).toBe(DEFAULT_VALUES.DIRECTORY);
        });

        it('period p', () => {
            const {p} = processArgs([]);
            expect(p).toBe(DEFAULT_VALUES.PERIOD);
        });

        it('numbers top n', () => {
            const {n} = processArgs([]);
            expect(n).toBe(DEFAULT_VALUES.NUMBERS_TOP);
        });
    });

    describe('should exit', () => {
        it('when numbers top n is not a number', () => {
            const args = '-n text';

            processArgs(args.split(' '));
            expect(mockExit).toHaveBeenCalled();
        });

        it('when period p is not a number', () => {
            const args = '-p text';

            processArgs(args.split(' '));
            expect(mockExit).toHaveBeenCalled();
        });
    });
});