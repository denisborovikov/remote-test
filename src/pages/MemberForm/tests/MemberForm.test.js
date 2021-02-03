import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Providers, createMemoryHistory } from 'tests/providers';
import { server, rest, BASE_URL } from 'tests/server';
import { MemberForm } from '../MemberForm';

const person = {
  country: 'Canada',
  currency: 'USD',
  employment: 'contractor',
  jobTitle: 'QA',
  name: 'Jane Smith',
  salary: 100000,
};

describe('Member form', () => {
  it('renders and creates a new member correcly', async () => {
    const handleSubmit = jest.fn();

    render(<MemberForm onSubmit={handleSubmit} />, {
      wrapper: Providers,
    });

    // Title rendered
    const title = screen.getByRole('heading', {
      level: 1,
      name: 'Add a new team member',
    });
    expect(title).toBeInTheDocument();

    // Fill name field
    const name = screen.getByLabelText(/name/i);
    userEvent.type(name, person.name);

    // Fill job title field
    const jobTitle = screen.getByLabelText(/job title/i);
    userEvent.type(jobTitle, person.jobTitle);

    // Select a country
    const country = screen.getByLabelText(/country/i);
    userEvent.selectOptions(country, person.country);

    // Fill salary field
    const salary = screen.getByLabelText(/salary/i);
    userEvent.type(salary, String(person.salary));

    // Select salary currency
    const currency = screen.getByTestId(/currency/i);
    userEvent.selectOptions(currency, person.currency);

    // Click contractor box
    userEvent.click(screen.getByText(/pay your contractors/i));

    // Click submit button
    userEvent.click(screen.getByRole('button', { name: /add employee/i }));

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(person, expect.anything())
    );
  });

  it('renders and edit an existing member correctly', async () => {
    const handleSubmit = jest.fn();

    const history = createMemoryHistory();
    history.push('/edit/111');

    render(<MemberForm onSubmit={handleSubmit} />, {
      wrapper: (props) => <Providers history={history} {...props} />,
    });

    server.use(
      rest.get(BASE_URL + '/people/111', async (req, res, ctx) => {
        return res(
          ctx.json({
            id: 111,
            ...person,
          })
        );
      })
    );

    // Title rendered
    const title = screen.getByRole('heading', {
      level: 1,
      name: 'Edit team member',
    });
    expect(title).toBeInTheDocument();

    // Edit name field
    const name = await screen.findByLabelText(/Name/i);
    userEvent.type(name, '{selectall}Jack Daniels');

    // Edit title field
    const jobTitle = screen.getByLabelText(/job title/i);
    userEvent.type(jobTitle, '{selectall}Sales');

    // Select a new country
    const country = screen.getByLabelText(/country/i);
    userEvent.selectOptions(country, 'Portugal');

    // Edit salary field
    const salary = screen.getByLabelText(/salary/i);
    userEvent.type(salary, '{selectall}50000');

    // Select new currency
    const currency = screen.getByTestId(/currency/i);
    userEvent.selectOptions(currency, 'EUR');

    // Click submit button
    userEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          ...person,
          id: 111,
          country: 'Portugal',
          currency: 'EUR',
          employment: 'contractor',
          jobTitle: 'Sales',
          name: 'Jack Daniels',
          salary: 50000,
        },
        expect.anything()
      )
    );
  });

  it('displays errors if trying to submit an empty form', async () => {
    const handleSubmit = jest.fn();

    render(<MemberForm onSubmit={handleSubmit} />, {
      wrapper: Providers,
    });

    userEvent.click(screen.getByRole('button', { name: /add employee/i }));

    // Expect errors for required fields display correctly
    const nameError = await screen.findByText(/Name cannot be empty/i);
    expect(nameError).toBeInTheDocument();
    const jobError = await screen.findByText(/Job title cannot be empty/i);
    expect(jobError).toBeInTheDocument();
    const countryError = await screen.findByText(/Select the country/i);
    expect(countryError).toBeInTheDocument();
    const salaryError = await screen.findByText(/Please enter a valid number/i);
    expect(salaryError).toBeInTheDocument();
  });
});
