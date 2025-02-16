import { render, screen } from '@testing-library/react';
import ViewCard from './ViewCard';
import { useCardList } from '../../../../application/cards/ViewCard';

jest.mock('../../../../application/cards/ViewCard');

describe('ViewCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    (useCardList as jest.Mock).mockReturnValue({
      cards: [],
      loading: true,
      error: null
    });

    render(<ViewCard />);
    expect(screen.getByText('Loading cards...')).toBeInTheDocument();
  });

  it('renders error message correctly', () => {
    (useCardList as jest.Mock).mockReturnValue({
      cards: [],
      loading: false,
      error: 'Failed to fetch cards'
    });

    render(<ViewCard />);
    expect(screen.getByText('Failed to fetch cards')).toBeInTheDocument();
  });

  it('renders card list correctly', () => {
    (useCardList as jest.Mock).mockReturnValue({
      cards: [
        {
          id: '1',
          question: 'What is React?',
          answer: 'A JavaScript library for building user interfaces',
          tag: 'Frontend',
          category: 'Web Development'
        },
        {
          id: '2',
          question: 'What is Jest?',
          answer: 'A JavaScript testing framework',
          tag: '',
          category: 'Testing'
        }
      ],
      loading: false,
      error: null
    });

    render(<ViewCard />);

    expect(screen.getByText('Your Cards')).toBeInTheDocument();
    expect(screen.getByText('What is React?')).toBeInTheDocument();
    expect(screen.getByText('A JavaScript library for building user interfaces')).toBeInTheDocument();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Web Development')).toBeInTheDocument();

    expect(screen.getByText('What is Jest?')).toBeInTheDocument();
    expect(screen.getByText('A JavaScript testing framework')).toBeInTheDocument();
    expect(screen.getByText('Testing')).toBeInTheDocument();
  });

  it('renders message when no cards are found', () => {
    (useCardList as jest.Mock).mockReturnValue({
      cards: [],
      loading: false,
      error: null
    });

    render(<ViewCard />);
    expect(screen.getByText('No cards found. Try creating some new cards!')).toBeInTheDocument();
  });
});
