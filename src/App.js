import React from 'react';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { theme, GlobalStyles } from './theme';

import Header from './components/Header';
import { People } from 'pages/People';
import { MemberForm } from 'pages/MemberForm';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Set stale time to 1 sec so different components
      // using the same query within this peroid of time won't trigger
      // a new API request.
      staleTime: 1000,
      // Disable refetching all queries on window refocus.
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <People />
            </Route>
            <Route path="/add">
              <MemberForm />
            </Route>
            <Route path="/edit/:id">
              <MemberForm />
            </Route>
          </Switch>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
