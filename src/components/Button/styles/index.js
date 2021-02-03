import styled, { css } from 'styled-components';
import { Spinner } from 'components/Spinner';

const shadow = css`
  box-shadow: 0 6px 12px rgba(98, 77, 227, 0.3);
`;

const variantPrimary = css`
  background: var(--colors-irisBlue);
  border-color: var(--colors-irisBlue);
  color: var(--colors-blank);

  &:hover:not([disabled]) {
    background: var(--colors-royalBlue);
    border-color: var(--colors-royalBlue);
  }

  &:focus {
    box-shadow: 0 0 0 3px var(--colors-moonraker);
  }
`;

const variantSecondary = css`
  background: var(--colors-blank);
  color: var(--colors-irisBlue);
  border-color: var(--colors-moonraker);

  &:hover:not([disabled]) {
    background: var(--shades-selago);
  }

  &:focus {
    box-shadow: 0 0 0 1px var(--shades-spindle);
    border-color: var(--shades-spindle);
  }
`;

export const ButtonStyled = styled.button`
  display: inline-flex;
  align-items: center;
  position: relative;
  border: 2px solid transparent;
  border-radius: 24px;

  font-size: 1rem;
  font-weight: 500;
  line-height: 1;
  min-height: 44px;
  padding: ${(p) => (p.hasIcon ? 8 : 12)}px 24px;

  &:focus {
    outline: none;
  }

  ${(p) => p.variant === 'primary' && variantPrimary}
  ${(p) => p.variant === 'secondary' && variantSecondary}
  ${(p) => p.hasShadow && shadow}
  
  SVG {
    fill: currentColor;
    margin-right: 10px;
  }

  ${Spinner} {
    position: absolute;
    left: 50%;
    margin-left: -8px;
  }
`;

export const VisuallyHidden = styled.div`
  visibility: hidden;
`;
