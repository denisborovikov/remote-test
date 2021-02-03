import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

export { createMemoryHistory };

export function Providers({ children, history }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router history={history || createMemoryHistory()}>{children}</Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
