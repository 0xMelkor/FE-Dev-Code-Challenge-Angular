import { ofClass } from "../decorators/of-class";
import { validate } from "../decorators/validate";

class TestClass {
    @validate
    test(@ofClass(Date.name) arg: Date): boolean {
        return true;
    }
}

describe('[Domain > Validators > ofClass]', () => {

    it('Given class type validation, when argument is null, then get ok', () => {
        const test = new TestClass();
        expect(test.test(null)).toBeTruthy();
    });

    it('Given class type validation, when argument is undefined, then get ok', () => {
        const test = new TestClass();
        expect(test.test(undefined)).toBeTruthy();
    });

    it('Given class type validation, when argument is of the specified class, then get ok', () => {
        const test = new TestClass();
        expect(test.test(new Date())).toBeTruthy();
    });

    it('Given class type validation, when argument is not of the specified class, then get error', () => {
        const test = new TestClass();
        const call = () => {
            const arg: any = 12;
            test.test(arg);
        }
        expect(call).toThrowError(`Validation failed, method 'test' call aborted: parameter value '12' does not match constructor Date`);
    });

});
