import { createElement } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as IconSearch } from 'theme/icons/search.svg';
import { ReactComponent as IconUser } from 'theme/icons/user.svg';
import { ReactComponent as IconTimesCircle } from 'theme/icons/times-circle.svg';
import { Spinner } from '../Spinner';

import { ButtonStyled, VisuallyHidden } from './styles';

const ICONS = {
  user: IconUser,
  search: IconSearch,
  timesCircle: IconTimesCircle,
};

export default function Button({ children, icon, isLoading, ...props }) {
  const hasIcon = ICONS[icon] != null;

  const buttonProps = {
    type: 'button',
    disabled: isLoading,
    ...props,
    hasIcon,
  };

  const iconElement = hasIcon
    ? createElement(ICONS[icon], {
        width: 24,
        'aria-hidden': true,
        'data-testid': 'icon',
      })
    : null;

  const spinnerProps = {
    'data-testid': 'spinner',
    variant: props.variant,
  };

  return (
    <ButtonStyled {...buttonProps}>
      {isLoading ? (
        <>
          <VisuallyHidden>
            {iconElement}
            {children}
          </VisuallyHidden>
          <Spinner {...spinnerProps} />
        </>
      ) : (
        <>
          {iconElement}
          {children}
        </>
      )}
    </ButtonStyled>
  );
}

Button.defaultProps = {
  isLoading: false,
  variant: 'primary',
};

Button.propTypes = {
  /** Button text content */
  children: PropTypes.node,
  /** If true Button will have a shadow */
  hasShadow: PropTypes.bool,
  /** Icon to display before the Button's content, Icon inherits the color of the text content. */
  icon: PropTypes.oneOf(['user', 'search', 'timesCircle']),
  /** Is Button in loading state */
  isLoading: PropTypes.bool,
  /** The style of the button */
  variant: PropTypes.oneOf(['primary', 'secondary']),
};
