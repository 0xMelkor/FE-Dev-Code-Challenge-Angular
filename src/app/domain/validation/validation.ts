
export class Validator {

    constructor(
        public parentClass: any,
        public methodName: string,
        public paramIndex: number,
        private validatorFn: (argValue: any) => void
    ) { }

    validate(argValue: any) {
        this.validatorFn(argValue);
    }
}

export class ArgumentValidators {

    private static validators: Validator[];

    static registerValidator(targetClass: any, methodName: string, paramIndex: number, validatorFn: (argValue: any) => void) {
        this.validators = this.validators || [];
        const v = new Validator(targetClass, methodName, paramIndex, validatorFn);
        this.validators.push(v);
    }

    static performValidation(targetClass: any, methodName: string, paramValues: any[]): boolean {

        const methodArgsValidators = this.validators
            .filter(p => p.parentClass == targetClass)
            .filter(p => p.methodName === methodName);

        if (methodArgsValidators.length == 0) {
            return true;
        }

        for (const [index, paramValue] of paramValues.entries()) {
            const validatorsForParamIndex = methodArgsValidators.filter(v => v.paramIndex == index);
            validatorsForParamIndex.forEach(validator => {
                validator.validate(paramValue);
            })
        }
    }
}