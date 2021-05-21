import { ArgumentValidators } from "../validation";

export function notNull(targetClass: any, methodName: string, parameterIndex: number) {

    const validatorFn = (argValue: any) => {
        if (argValue == null || argValue == undefined) {
            throw new Error(`Validation failed, method call aborted in class '${targetClass.constructor.name}': method '${methodName}' argument at index ${parameterIndex} cannot be ${argValue}`);
        }
    };

    ArgumentValidators.registerValidator(targetClass, methodName, parameterIndex, validatorFn);
}