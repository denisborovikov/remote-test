import { useField } from 'formik';
import PropTypes from 'prop-types';
import { Field, Hint, Label } from '../FieldParts';
import { Input } from './styles';

export default function TextField({ name, label, helper, ...props }) {
  const [field, { touched, error }] = useField(name);

  const invalidAttr = touched && error ? { 'aria-invalid': true } : {};

  const inputProps = {
    ...props,
    ...invalidAttr,
    ...field,
  };

  return (
    <Field as="label">
      <Label>{label}</Label>
      <Input {...inputProps} />
      <Hint errorMsg={touched && error ? error : undefined} helper={helper} />
    </Field>
  );
}

TextField.defaultProps = {
  type: 'text',
};

TextField.propTypes = {
  /** Field name */
  name: PropTypes.string,
  /** Field type */
  type: PropTypes.string,
  /** Field label */
  label: PropTypes.string.isRequired,
  /** Field description message */
  helper: PropTypes.string,
};
