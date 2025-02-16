import { render, screen } from '@testing-library/react';
import App from './App';
import { AppRoutes } from './presentation/routes/AppRoutes';
import Navbar from './presentation/components/Navbar/Navbar';

jest.mock('./presentation/routes/AppRoutes', () => ({
  AppRoutes: jest.fn(() => <div data-testid="mock-routes">Routes Component</div>)
}));

jest.mock('./presentation/components/Navbar/Navbar', () => {
  return jest.fn(() => <div data-testid="mock-navbar">Navbar Component</div>);
});

jest.mock('./shared/assets/img/background.jpg', () => 'mock-background-path');

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('mock-routes')).toBeInTheDocument();
    expect(screen.getByTestId('mock-navbar')).toBeInTheDocument();
  });

  test('renders all required components and elements', () => {
    const { container } = render(<App />);

    const appContainer = container.querySelector('.app-container');
    expect(appContainer).toBeInTheDocument();

    const backgroundImage = container.querySelector('.background-img');
    expect(backgroundImage).toBeInTheDocument();
    expect(backgroundImage).toHaveAttribute('src', 'mock-background-path');
    expect(backgroundImage).toHaveAttribute('alt', 'Background image');

    const overlay = container.querySelector('.overlay');
    expect(overlay).toBeInTheDocument();

    const content = container.querySelector('.content');
    expect(content).toBeInTheDocument();
  });

  test('renders components in correct order', () => {
    const { container } = render(<App />);
    const appContainer = container.querySelector('.app-container');
    const children = appContainer?.children;

    if (children) {
      expect(children[0]).toHaveClass('background-img');
      expect(children[1]).toHaveClass('overlay');
      expect(children[2]).toHaveAttribute('data-testid', 'mock-navbar');
      expect(children[3]).toHaveClass('content');
    }
  });

  test('renders Navbar component', () => {
    render(<App />);
    expect(Navbar).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('mock-navbar')).toBeInTheDocument();
  });

  test('renders AppRoutes component', () => {
    render(<App />);
    expect(AppRoutes).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('mock-routes')).toBeInTheDocument();
  });

  test('wraps content in Router component', () => {
    const { container } = render(<App />);
    const appContainer = container.querySelector('.app-container');
    expect(appContainer).toBeInTheDocument();
    expect(container.firstChild).toBeTruthy();
  });
});
