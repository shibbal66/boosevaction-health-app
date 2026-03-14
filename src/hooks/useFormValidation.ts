import { useState } from 'react';

type ValidatorFn<Value> = (value: Value) => string | null;

type ValidatorMap<Values extends Record<string, any>> = {
  [K in keyof Values]?: ValidatorFn<Values[K]>;
};

type ErrorMap<Values extends Record<string, any>> = {
  [K in keyof Values]?: string | null;
};

export const useFormValidation = <Values extends Record<string, any>>(
  initialValues: Values,
  validators: ValidatorMap<Values>,
) => {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<ErrorMap<Values>>({});

  const setFieldValue = <K extends keyof Values>(
    field: K,
    value: Values[K],
  ) => {
    setValues(prev => ({
      ...prev,
      [field]: value,
    }));

    const validator = validators[field];
    if (validator) {
      const error = validator(value);
      setErrors(prev => ({
        ...prev,
        [field]: error,
      }));
    }
  };

  const validateAll = () => {
    let isValid = true;
    const nextErrors: ErrorMap<Values> = {};

    (Object.keys(validators) as (keyof Values)[]).forEach(field => {
      const validator = validators[field];
      if (!validator) return;

      const value = values[field];
      const error = validator(value);

      nextErrors[field] = error;
      if (error) {
        isValid = false;
      }
    });

    setErrors(prev => ({
      ...prev,
      ...nextErrors,
    }));

    return { isValid, errors: nextErrors };
  };

  return {
    values,
    errors,
    setFieldValue,
    setValues,
    setErrors,
    validateAll,
  };
};

export default useFormValidation;
