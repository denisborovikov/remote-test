import PropTypes from 'prop-types';
import { useFormikContext, useField } from 'formik';
import {
  Hint,
  Input,
  Label,
  Option,
  Options,
  OptionLabel,
  OptionContent,
  RadioFieldStyled,
} from './styles';

export function RadioField({ name, label, options }) {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [{ value: fieldValue }] = useField(name);

  const inputProps = {
    type: 'radio',
    name,
    onChange: (event) => {
      const value = event.target.value;
      setFieldTouched(name);
      setFieldValue(name, value);
    },
  };

  return (
    <RadioFieldStyled>
      <Label>{label}</Label>
      <Options>
        {options.map((option) => (
          <Option key={option.value}>
            <OptionContent>
              <OptionLabel>{option.label}</OptionLabel>
              <Hint>{option.hint}</Hint>
            </OptionContent>
            <Input
              value={option.value}
              checked={option.value === fieldValue}
              {...inputProps}
            />
          </Option>
        ))}
      </Options>
    </RadioFieldStyled>
  );
}

const OptionType = PropTypes.shape({
  /** Option label */
  label: PropTypes.string.isRequired,
  /** Option value */
  value: PropTypes.string.isRequired,
  /** Option description */
  hint: PropTypes.string,
});

RadioField.propTypes = {
  /** Field name */
  name: PropTypes.string,
  /** Field label */
  label: PropTypes.string.isRequired,
  /** Field options, array of { label, value, hint } */
  options: PropTypes.arrayOf(OptionType),
};
