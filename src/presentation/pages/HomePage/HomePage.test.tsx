import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import HomePage from './HomePage';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

describe('HomePage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the homepage with title', () => {
    render(<HomePage />);

    const titleElement = screen.getByText('Leitner Quiz');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe('H1');
  });

  test('renders quiz button', () => {
    render(<HomePage />);

    const quizButton = screen.getByText("Today's Quiz");
    expect(quizButton).toBeInTheDocument();
  });

  test('navigates to quiz page when button is clicked', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(<HomePage />);

    const quizButton = screen.getByText("Today's Quiz");
    fireEvent.click(quizButton);

    expect(mockNavigate).toHaveBeenCalledWith('/quiz');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  test('renders with correct CSS classes', () => {
    const { container } = render(<HomePage />);

    const homeContainer = container.querySelector('.home-container');
    expect(homeContainer).toBeInTheDocument();

    const titleContainer = container.querySelector('.title-container');
    expect(titleContainer).toBeInTheDocument();

    const title = container.querySelector('.title');
    expect(title).toBeInTheDocument();

    const quizContainer = container.querySelector('.quiz-container');
    expect(quizContainer).toBeInTheDocument();
  });

  test('renders with correct component hierarchy', () => {
    const { container } = render(<HomePage />);

    const homeContainer = container.querySelector('.home-container');
    expect(homeContainer).toBeInTheDocument();

    const titleContainer = homeContainer?.querySelector('.title-container');
    expect(titleContainer).toBeInTheDocument();

    const quizContainer = homeContainer?.querySelector('.quiz-container');
    expect(quizContainer).toBeInTheDocument();

    const title = titleContainer?.querySelector('.title');
    expect(title).toBeInTheDocument();
    expect(title?.textContent).toBe('Leitner Quiz');
  });
});
