import { renderHook, waitFor } from '@testing-library/react';
import { useCardList } from './ViewCard';
import { CardAdapter } from '../../infrastructure/adapters/CardAdapter';
import { Card, Category } from '../../domain/models/Card';

jest.mock('../../infrastructure/adapters/CardAdapter');
const MockedCardAdapter = CardAdapter as jest.MockedClass<typeof CardAdapter>;

describe('useCardList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with loading state', async () => {
    const { result } = renderHook(() => useCardList());

    expect(result.current).toEqual({
      loading: true,
      error: null,
      cards: [],
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it('should fetch cards successfully', async () => {
    const mockCards: Card[] = [
      { 
        id: '1',
        question: 'What is the first question?',
        answer: 'This is the first answer',
        tag: 'mathematics',
        category: Category.FIRST
      },
      { 
        id: '2',
        question: 'What is the second question?',
        answer: 'This is the second answer',
        tag: 'history',
        category: Category.SECOND
      },
    ];

    MockedCardAdapter.prototype.getAllCards.mockResolvedValueOnce(mockCards);

    const { result } = renderHook(() => useCardList());

    expect(result.current.loading).toBe(true);
    expect(result.current.cards).toEqual([]);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current).toEqual({
      loading: false,
      error: null,
      cards: mockCards,
    });

    expect(MockedCardAdapter.prototype.getAllCards).toHaveBeenCalledTimes(1);
  });

  it('should handle errors during fetch', async () => {
    const errorMessage = 'Failed to fetch cards';
    
    MockedCardAdapter.prototype.getAllCards.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useCardList());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current).toEqual({
      loading: false,
      error: errorMessage,
      cards: [],
    });

    expect(MockedCardAdapter.prototype.getAllCards).toHaveBeenCalledTimes(1);
  });
});