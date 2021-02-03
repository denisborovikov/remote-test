import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';

const animationSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const variantPrimary = css`
  --color-primary: var(--colors-blank);
  --color-secondary: rgba(255, 255, 255, 0.3);
`;

const variantSecondary = css`
  --color-primary: var(--colors-irisBlue);
  --color-secondary: var(--colors-moonraker);
`;

export const Spinner = styled.div`
  --size: 16px;
  --border: 2px;
  ${(p) => p.variant === 'primary' && variantPrimary};
  ${(p) => p.variant === 'secondary' && variantSecondary};
  border-radius: 50%;
  width: var(--size);
  height: var(--size);

  margin: 0 auto;
  position: relative;
  text-indent: -9999em;
  border-top: var(--border) solid var(--color-secondary);
  border-right: var(--border) solid var(--color-secondary);
  border-bottom: var(--border) solid var(--color-secondary);
  border-left: var(--border) solid var(--color-primary);
  transform: translateZ(0);
  animation: ${animationSpin} 1s linear infinite;
`;

Spinner.defaultProps = {
  variant: 'primary',
};

Spinner.propTypes = {
  /** The color style of the spinner */
  variant: PropTypes.oneOf(['primary', 'secondary']),
};
