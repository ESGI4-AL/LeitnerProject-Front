import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Button from './Button';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      {ui}
    </MemoryRouter>
  );
};

describe('Button Component', () => {
  test('renders button with default props', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass('button');
  });

  test('applies custom className', () => {
    render(<Button className="custom-class">Click me</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('button', 'custom-class');
  });

  test.each([
    ['submit', 'submit'],
    ['reset', 'reset'],
    ['button', 'button'],
  ])('renders button with type %s', (type, expected) => {
    render(<Button type={type as 'submit' | 'reset' | 'button'}>Click me</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', expected);
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders Link with custom className', () => {
    const path = '/some-path';
    const { container } = renderWithRouter(
      <Button to={path} className="custom-class">
        Navigate
      </Button>
    );

    const linkElement = container.querySelector('a');
    expect(linkElement).toHaveClass('base-button');
    expect(linkElement).toHaveClass('custom-class');
  });

  test('renders children correctly', () => {
    render(
      <Button>
        <span>Child Element</span>
      </Button>
    );

    const childElement = screen.getByText('Child Element');
    expect(childElement).toBeInTheDocument();
    expect(childElement.tagName).toBe('SPAN');
  });
});
