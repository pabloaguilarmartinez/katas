import {calculate} from '../core/calculator';

describe('String calculator', () => {
    it('allows null and empty string', () => {
        expect(calculate(null)).toBe(0);
        expect(calculate('')).toBe(0);
    });

    it('converts a number from a string type to a number type', () => {
        expect(calculate('1')).toBe(1);
    });

    it('sums the elements separate by commas', () => {
        expect(calculate('1,2,3')).toBe(6);
        expect(calculate('1,2')).toBe(3);
    });

    it('does not count the elements that are not numbers', () => {
        expect(calculate('a')).toBe(0);
        expect(calculate('1,a')).toBe(1);
        expect(calculate('1a,2')).toBe(2);
        expect(calculate('1,a,3')).toBe(4);
    });

    it('sums all the numbers separated by custom separator', () => {
        expect(calculate('//#/3#2')).toBe(5);
        expect(calculate('//#/3,2')).toBe(0);
        expect(calculate('//%/1%2%3')).toBe(6);
    });
});
