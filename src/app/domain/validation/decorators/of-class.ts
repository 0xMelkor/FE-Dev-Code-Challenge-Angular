import { ArgumentValidators } from "../validation";

/**
 * Method argument decorator
 * @param className The class type the method argument should be matched against. 
 * Validation fails is the checked parameters is not of the specified type
 */
export function ofClass(className: string) {
    return (targetClass: any, methodName: string, parameterIndex: number) => {

        const validatorFn = (argValue: any) => {

            const isNullOrUndefined = argValue == null || argValue == undefined;
            const isOfType = isNullOrUndefined || argValue.constructor.name === className;
            
            if (!isOfType) {
                throw new Error(`Validation failed, method '${methodName}' call aborted: parameter value '${argValue}' does not match constructor ${className}`);
            }
        };

        ArgumentValidators.registerValidator(targetClass, methodName, parameterIndex, validatorFn);
    }
}