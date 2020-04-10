import { IValidatorParam } from '~interfaces/validator.interface';

export const stringValue = (expected: string) => (
  validator: IValidatorParam,
) => {
  validator.errorArray = validator.errorArray || [];
  if (typeof validator.value !== 'string' || validator.value !== expected) {
    return {
      value: validator.value,
      errorArray: [
        ...validator.errorArray,
        `Validator (stringValue) failed: expected ${expected} for '${validator.value}'`,
      ],
    };
  }
  return {
    value: validator.value,
    errorArray: validator.errorArray,
  };
};

export const stringInclude = (expected: string[]) => (
  validator: IValidatorParam,
) => {
  validator.errorArray = validator.errorArray || [];
  if (
    typeof validator.value !== 'string' ||
    !expected.includes(validator.value)
  ) {
    return {
      value: validator.value,
      errorArray: [
        ...validator.errorArray,
        `Validator (stringInclude) failed: expected ${JSON.stringify(
          expected,
        )} for '${validator.value}'`,
      ],
    } as IValidatorParam;
  }
  return {
    value: validator.value,
    errorArray: validator.errorArray,
  } as IValidatorParam;
};
