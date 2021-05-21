import { ArgumentValidators } from "../validation";

export function notEmpty(targetClass: any, methodName: string, parameterIndex: number) {

    const validatorFn = (argValue: any) => {
        if (!argValue || typeof argValue !== 'string' || (typeof argValue === 'string' && (argValue as string).trim() === '')) {
            throw new Error(`Validation failed, method call aborted: '${argValue}' is not a non empty string`);
        }
    };

    ArgumentValidators.registerValidator(targetClass, methodName, parameterIndex, validatorFn);
}