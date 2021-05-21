import { ArgumentValidators } from "../validation";

/**
 * Method argument decorator
 * @param className The class type each array item of the the method argument should be matched against. 
 * Validation fails is the checked parameters are not of the specified type
 */
export function listOf(className: string, opts?: { notEmpty: boolean }) {
    return (targetClass: any, methodName: string, parameterIndex: number) => {

        const validatorFn = (argValue: any) => {

            opts = opts || { notEmpty: false };

            const isArray = Array.isArray(argValue);
            const isNullOrUndefined = argValue == null || argValue == undefined;

            const items: any[] = argValue || [];
            const allOfType = items.filter(i => {
                return i != null && i != undefined && i.constructor.name === className
            }).length == items.length;

            if (!isArray || isNullOrUndefined || !allOfType) {
                throw new Error(`Validation failed, method '${methodName}' call aborted: parameter value '${argValue}' does not match array of ${className}`);
            }

            if (opts.notEmpty && items.length === 0) {
                throw new Error(`Validation failed, method '${methodName}' call aborted: parameter value '${argValue}' does not match NOT EMPTY array of ${className}`);
            }
        };

        ArgumentValidators.registerValidator(targetClass, methodName, parameterIndex, validatorFn);
    }
}