import { notEmpty } from "../decorators/not-empty";
import { validate } from "../decorators/validate";

class TestClass {
    @validate
    test(@notEmpty arg: string): boolean {
        return true;
    }
}

describe('[Domain > Validators > notEmpty]', () => {

    it('Given notEmpty string validation, when argument is null, then get error', () => {
        const call = () => {
            const test = new TestClass();
            test.test(null);
        };
        expect(call).toThrowError('Validation failed, method call aborted: \'null\' is not a non empty string');
    });

    it('Given notEmpty string validation, when argument is blank string, then get error', () => {
        const call = () => {
            const test = new TestClass();
            test.test('       ');
        };
        expect(call).toThrowError('Validation failed, method call aborted: \'       \' is not a non empty string');
    });

    it('Given notEmpty string validation, when argument is not a string, then get error', () => {
        const call = () => {
            const test = new TestClass();
            test.test({} as any);
        };
        expect(call).toThrowError('Validation failed, method call aborted: \'[object Object]\' is not a non empty string');
    });

    it('Given notEmpty string validation, when argument is a non empty string, then ok', () => {
        expect(new TestClass().test('foo')).toBeTruthy();
    });

});
