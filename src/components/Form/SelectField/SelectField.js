import { useField } from 'formik';
import PropTypes from 'prop-types';
import { Field, Label, Hint } from '../FieldParts';
import { Select } from './styles';

export default function SelectField({
  name,
  children,
  label,
  helper,
  ...props
}) {
  const [field, { touched, error }] = useField(name);
  const invalidAttr = touched && error ? { 'aria-invalid': true } : {};

  const selectProps = {
    ...props,
    ...invalidAttr,
    ...field,
  };

  return (
    <Field as="label">
      <Label>{label}</Label>
      <Select {...selectProps}>{children}</Select>
      <Hint errorMsg={touched && error ? error : undefined} helper={helper} />
    </Field>
  );
}

SelectField.propTypes = {
  /** Field name */
  name: PropTypes.string,
  /** Field label */
  label: PropTypes.string.isRequired,
  /** Field description message */
  helper: PropTypes.string,
};
