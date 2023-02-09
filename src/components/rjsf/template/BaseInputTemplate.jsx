import { getInputProps } from "@rjsf/utils";

const BaseInputTemplate = (props) => {
  const {
    schema,
    id,
    options,
    label,
    type,
    value,
    autofocus,
    readonly,
    onChange = () => {},
    onBlur = () => {},
    onFocus = () => {},
    rawErrors,
    hideError,
    uiSchema,
    registry,
    formContext,
    ...rest
  } = props;
  const onTextChange = ({ target: { value: val } }) => onChange(val === '' ? options.emptyValue || '' : val);
  const onTextBlur = ({ target: { value: val } }) => onBlur(id, val);
  const onTextFocus = ({ target: { value: val } }) => onFocus(id, val);

  const hasError = rawErrors && rawErrors.length > 0 && !hideError;
  const inputProps = { 
    ...getInputProps(schema, type, options),
    ...rest,
    id,
    value: value || options.emptyValue || '',
    autoFocus: autofocus,
    readOnly: readonly,
    'aria-invalid': hasError,
    onChange: onTextChange,
    onBlur: onTextBlur,
    onFocus: onTextFocus
  };

  return (<input {...inputProps} />);
};

export default BaseInputTemplate;