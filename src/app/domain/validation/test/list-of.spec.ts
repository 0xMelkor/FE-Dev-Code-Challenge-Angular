import { listOf } from "../decorators/list-of";
import { validate } from "../decorators/validate";

class TestClass {
    @validate
    test(@listOf(Date.name) items: Date[]): boolean {
        return true;
    }
}

class TestNotEmptyClass {
    @validate
    test(@listOf(Date.name, { notEmpty: true }) items: Date[]): boolean {
        return true;
    }
}

class TestNumberClass {
    @validate
    test(@listOf(Number.name) items: number[]): boolean {
        return true;
    }
}

describe('[Domain > Validators > listOf]', () => {

    it('Given listOf validation, when argument is null, then get error', () => {
        const call = () => {
            const test = new TestClass();
            test.test(null);
        };
        expect(call).toThrowError('Validation failed, method \'test\' call aborted: parameter value \'null\' does not match array of Date');
    });

    it('Given listOf validation, when argument is undefined, then get error', () => {
        const call = () => {
            const test = new TestClass();
            test.test(undefined);
        };
        expect(call).toThrowError('Validation failed, method \'test\' call aborted: parameter value \'undefined\' does not match array of Date');
    });


    it('Given listOf validation, when one item of the array is undefined, then get error', () => {
        const call = () => {
            const test = new TestClass();
            test.test([undefined]);
        };
        expect(call).toThrowError('Validation failed, method \'test\' call aborted: parameter value \'\' does not match array of Date');
    });

    it('Given listOf validation with NOT EMPTY option, when one item of the array is empty, then get error', () => {
        const call = () => {
            const test = new TestNotEmptyClass();
            test.test([]);
        };
        expect(call).toThrowError('Validation failed, method \'test\' call aborted: parameter value \'\' does not match NOT EMPTY array of Date');
    });

    it('Given listOf validation, when argument is empty, then ok', () => {
        expect(new TestClass().test([])).toBeTruthy();
    });

    it('Given listOf validation, when all items match class, then ok', () => {
        expect(new TestClass().test([new Date(), new Date()])).toBeTruthy();
    });

    it('Given listOf numbers, when all items match numer type, then ok', () => {
        expect(new TestNumberClass().test([0,1,2])).toBeTruthy();
    });
});
