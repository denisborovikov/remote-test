import styled from 'styled-components';
import { Field } from 'components/Form/FieldParts';

export const RadioFieldStyled = styled.div`
  ${Field} + & {
    margin-top: 32px;
  }
`;

export const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const Label = styled.div`
  font-size: 1.125rem;
  font-weight: 400;
  margin-bottom: 16px;
`;

export const Input = styled.input`
  outline: none;
`;

export const Option = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  flex: 0 0 calc(50% - 10px);
  padding: 16px 20px;
  border: 2px solid #cbd3dc;
  border-radius: 12px;

  :focus-within {
    border-color: #b7b8eb;
    background: var(--colors-linkWater);
  }
`;

export const OptionLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
`;

export const OptionContent = styled.div`
  margin-right: 16px;
  flex-grow: 1;
`;

export const Hint = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--colors-lynch);
`;
