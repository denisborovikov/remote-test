import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { ErrorMessage } from 'components/ErrorMessage';

export function FormError() {
  const { status } = useFormikContext();

  const isVisible = status instanceof Error;

  return (
    isVisible && (
      <ErrorMessage>{status?.message || 'Uknown error'}</ErrorMessage>
    )
  );
}

FormError.propTypes = {
  /** Error text content */
  children: PropTypes.node,
};
