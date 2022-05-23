import { UseForm, FormField } from 'hooks/useForm';

export type UITypes = 'checkbox' | 'radio' | 'datepicker' | 'text' | 'select' | 'password';

export type PropsBase<T> = {
  form: UseForm<T>;
  name: FormField<T>;
  type?: UITypes;
};

export type OnChangeEvent = React.ChangeEvent<HTMLInputElement> | unknown;

export type RenderProps<T> = Omit<PropsBase<T>, 'form'> & {
  onChange: (e: OnChangeEvent) => void;
  checked?: boolean;
  value?: T[keyof T] | string | null;
  error?: boolean | null;
};

export type Props<T> = PropsBase<T> & {
  render: (props: RenderProps<T>) => JSX.Element;
  value?: T[keyof T];
};

export function FormInputField<T>(props: Props<T>) {
  const { form, name, type, render, value } = props;

  const renderProps: RenderProps<T> = {
    type,
    name,
    value,
    onChange: (inputValue) => {
      form.onChange(name, inputValue);
    },
  };

  if (type === 'checkbox') {
    renderProps.checked = !!form.values[name];
    renderProps.onChange = (event: OnChangeEvent) =>
      form.onChange(name, (event as React.ChangeEvent<HTMLInputElement>).target.checked);
  } else if (type === 'radio') {
    renderProps.checked = form.values[name] === value;
    renderProps.onChange = () => form.onChange(name, value);
  } else if (type === 'datepicker') {
    delete renderProps.type;
    renderProps.value = form.values[name] || null;
    renderProps.onChange = (date) => form.onChange(name, date);
  } else if (type === 'text' || type === 'select' || type === 'password') {
    renderProps.value =
      typeof form.values[name] === 'undefined'
        ? ''
        : form.values[name] === null
        ? ''
        : String(form.values[name]);
    renderProps.onChange = (event: OnChangeEvent) => {
      form.onChange(name, (event as React.ChangeEvent<HTMLInputElement>).target.value);
    };
  } else {
    renderProps.error = form.errors ? !!form.errors[name] : null;
    renderProps.value = form.values[name];
    renderProps.onChange = (inputValue) => {
      form.onChange(name, inputValue);
    };
  }

  return render(renderProps);
}
