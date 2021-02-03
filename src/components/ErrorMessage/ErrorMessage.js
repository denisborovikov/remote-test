import PropTypes from 'prop-types';
import { ReactComponent as IconTimesCircle } from 'theme/icons/times-circle.svg';
import { Spinner } from 'components/Spinner';
import { ErrorMessageStyled,ErrorMessageContent,  Code } from './styles';

export function ErrorMessage({ children, code, isLoading = false, ...props }) {
  return (
    <ErrorMessageStyled {...props}>
      {isLoading ? <Spinner /> : <IconTimesCircle />}
      <ErrorMessageContent>
        {children}
        {code != null && <Code>{code}</Code>}
      </ErrorMessageContent>
    </ErrorMessageStyled>
  );
}

ErrorMessage.propTypes = {
  /** Error text content */
  children: PropTypes.node,
  /** Technical details */
  code: PropTypes.node,
  /** Is in loading state */
  isLoading: PropTypes.bool,
};
