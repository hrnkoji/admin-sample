import { format } from 'date-fns';
import { ObjectSchema, ValidationErrorItem } from 'joi';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import React from 'react';

export type UseForm<T> = {
  values: FormValues<T>;
  errors?: ValidateErrors<T>;
  onChange: (name: keyof FormValues<T>, value: unknown) => void;
  setInitialValues: (values: FormValues<T>) => void;
  setOptions: (values: UseFormOptions) => void;
  reset: () => void;
  updateValues: (values: Partial<FormValues<T>>) => void;
  validate: () => {
    values: FormValues<T>;
    errors?: ValidateErrors<T>;
  };
  validatedValues: FormValues<T>;
  touched: TouchedFields<T>;
  isDirty: boolean;
  isValid: boolean;
};

export type UseFormOptions = {
  returnErrorsAlways: boolean;
};

export type Props = {
  schema: ObjectSchema;
  options?: UseFormOptions;
};

export type FormField<T> = keyof T;
export type FormFieldError = {
  message: string;
  type: string;
};

export type FormValues<T> = {
  [K in FormField<T>]: T[K];
};

export type ValidatedResult<T> = {
  errors?: ValidateErrors<T>;
  values: FormValues<T>;
};

export type ValidateErrors<T> = { [K in FormField<T>]: FormFieldError } | null;
export type TouchedFields<T> = { [K in FormField<T>]: boolean };

export function useForm<T>({ schema, options = { returnErrorsAlways: false } }: Props): UseForm<T> {
  const delayRef = React.useRef<undefined | boolean>();
  const [formOptions, setFormOptions] = React.useState({
    returnErrorsAlways: options.returnErrorsAlways,
  } as UseFormOptions);
  const [values, setValues] = React.useState<FormValues<T>>({} as FormValues<T>);
  const [touched, setTouched] = React.useState({} as TouchedFields<T>);
  const [initialValues, setInitialValues] = React.useState<FormValues<T>>();
  const [validation, setValidation] = React.useState<{
    values: FormValues<T>;
    errors?: ValidateErrors<T>;
  }>({
    values: {} as FormValues<T>,
    errors: null,
  });

  const execValidation = React.useCallback((): {
    errors?: ValidateErrors<T>;
    values: FormValues<T>;
  } => {
    let validateErrors: ValidateErrors<T> = null;
    const { error, value } = schema.validate(values, {
      abortEarly: false,
      allowUnknown: true,
      convert: true,
    });

    if (error) {
      validateErrors = {} as ValidateErrors<T>;
      error?.details.forEach((err) => {
        // Joiのエラーメッセージフォーマットサンプル
        // {
        //   message: '"顧客名" is not allowed to be empty',
        //   path: ['name'],
        //   type: 'any.empty',
        //   context: {
        //     value: '',
        //     invalids: [''],
        //     key: 'name',
        //     label: '顧客名',
        //   },
        // },
        const isBlank = !value[err?.context?.key || ''];

        const path = err.path[0] as FormField<T>;
        if ((formOptions.returnErrorsAlways || touched[path] === true) && validateErrors) {
          validateErrors[path] = {
            message: isBlank ? `${err.context?.label}は必須です` : getErrorMessage(err),
            type: err.type,
          };
        }
      });
    }

    setValidation({
      values: value,
      errors: validateErrors || null,
    });

    return { errors: validateErrors, values: value };
  }, [values, schema, touched, formOptions.returnErrorsAlways]);

  const validateValuesRef = React.useRef(debounce(execValidation, 500));

  React.useEffect(() => {
    validateValuesRef.current = debounce(execValidation, 500);
  }, [execValidation]);

  React.useEffect(() => {
    if (!schema) {
      return;
    }

    if (delayRef.current === true) {
      validateValuesRef.current();
      return;
    }
    execValidation();
    delayRef.current = true;
  }, [execValidation, schema, values]);

  const setOptions = React.useCallback(
    (newOptions: UseFormOptions) => {
      setFormOptions((formOptions) => ({
        ...formOptions,
        ...newOptions,
      }));
    },
    [setFormOptions],
  );

  const updateValues = React.useCallback((newValues) => {
    delayRef.current = false;
    setValues((values) => {
      return { ...values, ...newValues };
    });
  }, []);

  const reset = React.useCallback(() => {
    delayRef.current = false;
    setTouched({} as TouchedFields<T>);
    setValues(initialValues as FormValues<T>);
  }, [initialValues]);

  const onChange = React.useCallback(
    (name: FormField<T>, value) => {
      setTouched((v) => ({ ...v, [name]: true } as TouchedFields<T>));
      setValues({ ...values, [name]: value });
    },
    [values],
  );

  const setFormInitialValues = (initialValues: FormValues<T>) => {
    delayRef.current = false;
    setInitialValues({ ...initialValues });
    setValues({ ...initialValues });
  };

  const isDirty = React.useMemo(() => {
    if (!initialValues || !values) {
      return false;
    }
    return !isEqual(initialValues, values);
  }, [initialValues, values]);

  const isValid = React.useMemo(() => {
    return !validation.errors;
  }, [validation.errors]);

  return {
    onChange,
    setInitialValues: setFormInitialValues,
    reset,
    updateValues,
    setOptions,
    validate: execValidation,
    values,
    validatedValues: validation.values,
    errors: validation.errors,
    touched,
    isDirty,
    isValid,
  };
}
const getErrorMessage = (err: ValidationErrorItem) => {
  let message;

  const key = err.context?.key || '';

  if (err.type === 'string.regex.base' && (key.startsWith('phone') || key.startsWith('fax'))) {
    return `${err.context?.label}を半角数字で入力してください`;
  }

  switch (err.type) {
    case 'any.empty':
      message = `${err.context?.label}は必須です`;
      break;
    case 'any.required':
      message = `${err.context?.label}は必須です`;
      break;
    case 'string.min':
      message = `${err.context?.label}を${err.context?.limit}文字以上で入力してください`;
      break;
    case 'string.max':
      message = `${err.context?.label}は最大${err.context?.limit}文字まで入力してください`;
      break;
    case 'string.uri':
      message = `${err.context?.label}はURL形式で入力してください`;
      break;
    case 'string.email':
      message = `${err.context?.label}は有効なメールアドレスである必要があります。`;
      break;
    case 'number.base':
      message = `${err.context?.label}は半角数字で入力してください`;
      break;
    case 'number.less':
      message = `${err.context?.label}は半角数字最大値は${err.context?.limit}までで入力してください`;
      break;
    case 'date.min':
      message = `${err.context?.label}は ${format(
        err.context?.limit,
        'yyyy/MM/dd',
      )} より新しい日付を入力してください`;
      break;
    case 'date.max':
      message = `${err.context?.label}は ${format(
        err.context?.limit,
        'yyyy/MM/dd',
      )} までの日付を入力してください`;
      break;
    default:
      message = `${err.context?.label}は必須です`;
      break;
  }
  return message;
};
