import { useRifm } from 'rifm';
import { useField, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import { CURRENCIES, formatNumber, parseNumber } from 'utils/format';
import { Field, Hint, Label } from '../FieldParts';
import { Select } from '../SelectField/styles';
import { Input } from '../TextField/styles';
import { InputSelectContainer } from './styles';

export default function SalaryField({
  inputName,
  selectName,
  defaultSelectValue,
  label,
  helper,
  ...props
}) {
  const { setFieldValue } = useFormikContext();
  const [inputField, { touched, error }] = useField(inputName);
  const [selectField] = useField(selectName);
  const invalidAttr = touched && error ? { 'aria-invalid': true } : {};

  // We use rifm to format salary input on fly
  const rifm = useRifm({
    value: inputField.value,
    onChange: (value) => setFieldValue(inputName, parseNumber(value)),
    format: (value) => formatNumber(value, selectField.value),
  });

  const inputProps = {
    ...props,
    ...invalidAttr,
    ...inputField,
    ...rifm,
  };

  const selectProps = {
    'data-testid': 'currency',
    ...selectField,
  };

  return (
    <Field as="label">
      <Label>{label}</Label>
      <InputSelectContainer>
        <Input {...inputProps} />
        <Select {...selectProps}>
          {CURRENCIES.map((currency) => (
            <option key={currency.name}>{currency.name}</option>
          ))}
        </Select>
      </InputSelectContainer>
      <Hint errorMsg={touched && error ? error : undefined} helper={helper} />
    </Field>
  );
}

SalaryField.propTypes = {
  /** Input field name */
  inputName: PropTypes.string,
  /** Select field name */
  selectName: PropTypes.string,
  /** Field label */
  label: PropTypes.string.isRequired,
  /** Field description message */
  helper: PropTypes.string,
};
