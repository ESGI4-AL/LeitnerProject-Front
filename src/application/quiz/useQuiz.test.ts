import { renderHook, act } from '@testing-library/react';
import { useQuiz } from './useQuiz';
import { CardAdapter } from '../../infrastructure/adapters/CardAdapter';
import { Card, Category } from '../../domain/models/Card';

jest.mock('../../infrastructure/adapters/CardAdapter');

describe('useQuiz', () => {
  let mockGetTodayCards: jest.Mock;
  let mockSubmitAnswer: jest.Mock;
  const mockCards: Card[] = [
    {
      id: '1',
      question: 'Test Question 1',
      answer: 'Test Answer 1',
      category: Category.FIRST
    },
    {
      id: '2',
      question: 'Test Question 2',
      answer: 'Test Answer 2',
      category: Category.FIRST
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetTodayCards = jest.fn();
    mockSubmitAnswer = jest.fn();
    (CardAdapter as jest.Mock).mockImplementation(() => ({
      getTodayCards: mockGetTodayCards,
      submitAnswer: mockSubmitAnswer,
    }));
  });

  it('should initialize with default values', async () => {
    mockGetTodayCards.mockResolvedValueOnce([]);

    const { result } = renderHook(() => useQuiz());

    await act(async () => {
      await mockGetTodayCards();
    });

    expect(result.current.currentCard).toBeUndefined();
    expect(result.current.showAnswer).toBe(false);
    expect(result.current.userAnswer).toBe('');
    expect(result.current.error).toBeNull();
    expect(result.current.success).toBe(false);
    expect(result.current.isLastCard).toBe(false);
    expect(result.current.isQuizFinished).toBe(false);
    expect(result.current.hasCards).toBe(false);
    expect(result.current.progress).toEqual({ current: 1, total: 0 });
  });

  it('should fetch cards on mount', async () => {
    mockGetTodayCards.mockResolvedValueOnce(mockCards);

    const { result } = renderHook(() => useQuiz());

    await act(async () => {
      await mockGetTodayCards();
    });

    expect(mockGetTodayCards).toHaveBeenCalled();
    expect(result.current.currentCard).toEqual(mockCards[0]);
    expect(result.current.hasCards).toBe(true);
    expect(result.current.progress).toEqual({ current: 1, total: 2 });
  });

  it('should handle fetch cards error', async () => {
    const errorMessage = 'Failed to fetch cards';
    mockGetTodayCards.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useQuiz());

    await act(async () => {
      try {
        await mockGetTodayCards();
      } catch (error) {}
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.hasCards).toBe(false);
  });

  it('should toggle answer only when user answer is provided', async () => {
    jest.useFakeTimers();
    mockGetTodayCards.mockResolvedValueOnce(mockCards);
    const { result } = renderHook(() => useQuiz());

    await act(async () => {
      await mockGetTodayCards();
    });

    await act(async () => {
      result.current.actions.toggleAnswer();
    });

    expect(result.current.error).toBe('Please enter your answer first');
    expect(result.current.showAnswer).toBe(false);

    await act(async () => {
      result.current.actions.setUserAnswer('test answer');
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await act(async () => {
      result.current.actions.toggleAnswer();
    });

    expect(result.current.showAnswer).toBe(true);
    expect(result.current.error).toBeNull();

    jest.useRealTimers();
  });

  it('should submit answer and move to next card', async () => {
    mockGetTodayCards.mockResolvedValueOnce(mockCards);
    mockSubmitAnswer.mockResolvedValueOnce({});

    const { result } = renderHook(() => useQuiz());

    await act(async () => {
      await mockGetTodayCards();
    });

    await act(async () => {
      await result.current.actions.submitAnswer(true);
    });

    expect(mockSubmitAnswer).toHaveBeenCalledWith('1', true);
    expect(result.current.currentCard).toEqual(mockCards[1]);
    expect(result.current.showAnswer).toBe(false);
    expect(result.current.userAnswer).toBe('');
    expect(result.current.success).toBe(true);
  });

  it('should handle submit answer error', async () => {
    mockGetTodayCards.mockResolvedValueOnce(mockCards);
    const errorMessage = 'Failed to submit answer';
    mockSubmitAnswer.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useQuiz());

    await act(async () => {
      await mockGetTodayCards();
    });

    await act(async () => {
      try {
        await result.current.actions.submitAnswer(true);
      } catch (error) {}
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.success).toBe(false);
  });

  it('should clear error and success states after 5 seconds', async () => {
    jest.useFakeTimers();
    mockGetTodayCards.mockResolvedValueOnce(mockCards);
    mockSubmitAnswer.mockRejectedValueOnce(new Error('Test error'));

    const { result } = renderHook(() => useQuiz());

    await act(async () => {
      await mockGetTodayCards();
    });

    await act(async () => {
      try {
        await result.current.actions.submitAnswer(true);
      } catch (error) {}
    });

    expect(result.current.error).toBe('Test error');

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.success).toBe(false);

    jest.useRealTimers();
  }, 10000);

  it('should finish quiz when finishQuiz is called', async () => {
    mockGetTodayCards.mockResolvedValueOnce(mockCards);
    const { result } = renderHook(() => useQuiz());

    await act(async () => {
      await mockGetTodayCards();
    });

    await act(async () => {
      result.current.actions.finishQuiz();
    });

    expect(result.current.isQuizFinished).toBe(true);
  });

  it('should identify last card correctly', async () => {
    mockGetTodayCards.mockResolvedValueOnce(mockCards);

    const { result } = renderHook(() => useQuiz());

    await act(async () => {
      await mockGetTodayCards();
    });

    expect(result.current.isLastCard).toBe(false);

    await act(async () => {
      await result.current.actions.submitAnswer(true);
    });

    expect(result.current.isLastCard).toBe(true);
  }, 10000);
});
