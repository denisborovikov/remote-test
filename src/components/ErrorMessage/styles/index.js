import styled from 'styled-components';
import { Spinner } from 'components/Spinner';

export const ErrorMessageStyled = styled.div`
  font-weight: 400;
  font-size: 1rem;
  background: #fff6f6;
  border: 2px solid #fbabb2;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 26px 28px;
  margin: 32px 0;
  display: flex;
  align-items: center;
  color: var(--colors-bayoux);

  ${Spinner} {
    --size: 22px;
    --color-primary: var(--colors-irisBlue);
    --color-secondary: var(--colors-moonraker);
    flex-shrink: 0;
  }

  SVG {
    width: 22px;
    fill: var(--colors-redPink);
    flex-shrink: 0;
  }
`;

export const ErrorMessageContent = styled.div`
  flex-grow: 1;
  margin-left: 16px;
`;

export const Code = styled.div`
  font-style: italic;
  margin-top: 12px;
`;

export const ErrorAction = styled.span`
  cursor: pointer;
  text-decoration: underline;
  color: var(--colors-royalBlue);
`;
