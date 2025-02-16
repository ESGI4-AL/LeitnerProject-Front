import { render, screen } from '@testing-library/react';
import ViewCardPage from './ViewCardsPage';
import { useCardList } from '../../../application/cards/ViewCard';

jest.mock('../../../application/cards/ViewCard', () => ({
  useCardList: jest.fn(),
}));

describe('ViewCard Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('displays a loading message when loading is true', () => {
    (useCardList as jest.Mock).mockReturnValue({ cards: [], loading: true, error: null });

    render(<ViewCardPage />);

    expect(screen.getByText(/Loading cards.../i)).toBeInTheDocument();
  });

  test('displays an error message when there is an error', () => {
    (useCardList as jest.Mock).mockReturnValue({ cards: [], loading: false, error: 'Error loading' });

    render(<ViewCardPage />);

    expect(screen.getByText(/Error loading/i)).toBeInTheDocument();
  });

  test('displays a message indicating no cards are available', () => {
    (useCardList as jest.Mock).mockReturnValue({ cards: [], loading: false, error: null });

    render(<ViewCardPage />);

    expect(screen.getByText(/No cards found. Try creating some new cards!/i)).toBeInTheDocument();
  });

  test('displays cards correctly when they are available', () => {
    (useCardList as jest.Mock).mockReturnValue({
      cards: [
        { id: 1, question: 'What is React?', answer: 'A JavaScript library', tag: 'JS', category: 'Frontend' },
        { id: 2, question: 'What is TDD?', answer: 'Test Driven Development', category: 'Development' }
      ],
      loading: false,
      error: null
    });

    render(<ViewCardPage />);

    expect(screen.getByText(/What is React?/i)).toBeInTheDocument();
    expect(screen.getByText(/A JavaScript library/i)).toBeInTheDocument();
    expect(screen.getByText(/JS/i)).toBeInTheDocument();
    expect(screen.getByText(/Frontend/i)).toBeInTheDocument();

    expect(screen.getByText(/What is TDD?/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Driven Development/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Development/i).some(el => el.classList.contains('category-badge'))).toBeTruthy();
  });

  test('optional tags do not appear if they are missing', () => {
    (useCardList as jest.Mock).mockReturnValue({
      cards: [
        { id: 1, question: 'What is React?', answer: 'A JavaScript library', category: 'Frontend' }
      ],
      loading: false,
      error: null
    });

    render(<ViewCardPage />);

    expect(screen.queryByText(/Tag:/i)).not.toBeInTheDocument();
  });
});