import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Hello</Button>);

    const button = screen.getByRole('button');

    expect(button.getAttribute('type')).toBe('button');
    expect(button).toHaveTextContent('Hello');
  });

  it('spreads custom attributes', () => {
    const clickFn = jest.fn();
    render(
      <Button data-foo="12" onClick={clickFn}>
        Hello
      </Button>
    );

    const button = screen.getByRole('button');

    expect(button.getAttribute('data-foo')).toBe('12');

    fireEvent.click(button);
    expect(clickFn).toHaveBeenCalledTimes(1);
  });

  it('displays icon', () => {
    render(<Button icon="user">Hello</Button>);

    const button = screen.getByRole('button');
    const icon = screen.getByTestId('icon');

    expect(button).toContainElement(icon);
  });

  it('displays loading status', () => {
    render(<Button isLoading>Hello</Button>);

    expect(screen.getByText('Hello')).not.toBeVisible();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });
});
