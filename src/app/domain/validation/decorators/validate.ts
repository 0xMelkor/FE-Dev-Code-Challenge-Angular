import { ArgumentValidators } from '../validation';
/**
 * Method decorator
 * @param targetClass The class the decorated method belongs
 * @param methodName The decorated method name
 * @param descriptor A reference to the decorated method
 */
export function validate(targetClass: any, methodName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    // Wrapping the original method
    descriptor.value = function (...args: any[]) { // Wrapper function
        ArgumentValidators.performValidation(targetClass, methodName, args); // Throws error on validation failure
        const result = method.apply(this, args);
        return result;
    }
}