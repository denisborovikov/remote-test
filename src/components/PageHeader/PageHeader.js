import styled from 'styled-components';

export const PageHeader = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: baseline;
  margin-bottom: 32px;
`;

export const PageHeaderTitle = styled.h1`
  ${({ theme }) => theme.typography.h2}
`;

export const PageHeaderHelpText = styled.div`
  ${({ theme }) => theme.typography.body}
  color: var(--colors-lynch);
  margin-left: 8px;
`;

export const PageHeaderControl = styled.div`
  flex-shrink: 0;
  margin-left: auto;
`;
