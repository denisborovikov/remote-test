import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Providers } from 'tests/providers';
import { server, rest, BASE_URL } from 'tests/server';
import { People } from '../People';

const people = [
  {
    id: 111,
    name: 'Foo',
    jobTitle: 'JobA',
    country: 'Portugal',
    salary: 1000,
    currency: 'EUR',
    employment: 'employee',
  },
  {
    id: 222,
    name: 'Bar',
    jobTitle: 'JobB',
    country: 'Singapore',
    salary: 1500,
    currency: 'USD',
    employment: 'contractor',
  },
];

describe('People list page', () => {
  it('renders and formats data correctly', async () => {
    render(<People />, {
      wrapper: Providers,
    });

    server.use(
      rest.get(BASE_URL + '/people', async (req, res, ctx) => {
        return res(ctx.json(people));
      })
    );

    // Title rendered
    const title = screen.getByRole('heading', { level: 1, name: 'People' });
    expect(title).toBeInTheDocument();

    // Add member button rendered
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Add member');

    // Search bar rendered
    const search = await screen.findByPlaceholderText(/Search employees/i);
    expect(search).toBeInTheDocument();

    // Records count rendered
    expect(screen.getByText('2 employees')).toBeInTheDocument();

    // Table and content rendered and properly formatted
    const table = screen.getByRole('table');
    const rows = table.querySelector('tbody');
    const links = screen.getAllByRole('link');

    // Exactly two rows rendered
    expect(rows.children).toHaveLength(2);

    // First user data properly displayed
    expect(screen.getByText('Foo')).toBeInTheDocument();
    expect(screen.getByText('JobA (Employee)')).toBeInTheDocument();
    expect(screen.getByText('Portugal')).toBeInTheDocument();
    expect(screen.getByText('€ EUR 1.000')).toBeInTheDocument();

    // Edit link contains correct URL
    expect(links[0]).toHaveAttribute('href', '/edit/111');

    // Second user data properly displayedme
    expect(screen.getByText('Bar')).toBeInTheDocument();
    expect(screen.getByText('JobB (Contractor)')).toBeInTheDocument();
    expect(screen.getByText('Singapore')).toBeInTheDocument();
    expect(screen.getByText('$ USD 1,500')).toBeInTheDocument();

    // Edit link contains correct URL
    expect(links[1]).toHaveAttribute('href', '/edit/222');
  });

  it('search by substring works correctly', async () => {
    render(<People />, {
      wrapper: Providers,
    });

    const BAR_QUERY = 'bar';

    server.use(
      rest.get(BASE_URL + '/people', async (req, res, ctx) => {
        if (req.url.searchParams.get('name_like') === BAR_QUERY) {
          return res(ctx.json([people[1]]));
        }
        return res(ctx.json(people));
      })
    );

    const search = await screen.findByPlaceholderText(/Search employees/i);

    // Initial number of results is 2
    expect(screen.getByText('2 employees')).toBeInTheDocument();
    const rows = screen.getByRole('table').querySelector('tbody');
    expect(rows.children).toHaveLength(2);

    userEvent.type(search, BAR_QUERY);

    // Number of results after seatch is 1
    await waitFor(() => expect(rows.children).toHaveLength(1));
    expect(screen.getByText('1 employee')).toBeInTheDocument();
    expect(screen.getByText('Bar')).toBeInTheDocument();
  });

  it('search by incorrect substring shows empty result', async () => {
    render(<People />, {
      wrapper: Providers,
    });

    const No_RESULTS_QUERY = 'no_results';

    server.use(
      rest.get(BASE_URL + '/people', async (req, res, ctx) => {
        if (req.url.searchParams.get('name_like') === No_RESULTS_QUERY) {
          return res(ctx.json([]));
        }

        return res(ctx.json(people));
      })
    );

    const search = await screen.findByPlaceholderText(/Search employees/i);

    // Initial number of results is 2
    const rows = screen.getByRole('table').querySelector('tbody');
    expect(rows.children).toHaveLength(2);

    userEvent.type(search, No_RESULTS_QUERY);

    // Number of results after seatch is 0
    await waitFor(() => expect(rows.children).toHaveLength(0));
    expect(screen.getByText('0 employees')).toBeInTheDocument();
  });
});
