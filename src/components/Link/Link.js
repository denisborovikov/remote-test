import { Link as LinkRouter } from 'react-router-dom';
import styled from 'styled-components';

export const Link = styled(LinkRouter)`
  color: var(--colors-irisBlue);
  text-decoration: none;

  &:hover {
    color: var(--colors-royalBlue);
    text-decoration: underline;
  }
`;
