import styled from 'styled-components';
import { Spinner } from 'components/Spinner';

export const SearchStyled = styled.div`
  display: flex;
  align-items: center;
  min-height: 40px;
  padding: 0 16px;
  border-radius: 20px;
  border: 1px solid transparent;

  SVG,
  ${Spinner} {
    width: 16px;
    margin-right: 12px;
  }

  SVG {
    fill: var(--colors-lynch);
    flex-shrink: 0;
  }

  :hover {
    border-color: #e7effc;
    background: #fdfeff;
  }

  :focus-within {
    border-color: #e7effc;
    background: #fdfeff;
    box-shadow: inset 1px 2px 3px #c6d6ef;
  }
`;

export const SearchInput = styled.input`
  display: block;
  min-width: 200px;
  background: none;
  border: none;
  color: var(--colors-darkBlue);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.2;
  padding: 0;
  outline: none;
`;

export const Searchbar = styled.div`
  display: flex;
  margin-bottom: 16px;
`;
