import { renderHook, act } from '@testing-library/react';
import { useCardCreation } from './useCardCreation';
import { CardAdapter } from '../../infrastructure/adapters/CardAdapter';

// Mock the CardAdapter
jest.mock('../../infrastructure/adapters/CardAdapter');

describe('useCardCreation', () => {
  let mockCreateCard: jest.Mock;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Setup the mock implementation for CardAdapter
    mockCreateCard = jest.fn();
    (CardAdapter as jest.Mock).mockImplementation(() => ({
      createCard: mockCreateCard
    }));
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCardCreation());

    expect(result.current.formData).toEqual({
      question: '',
      answer: '',
      tag: ''
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.success).toBe(false);
  });

  it('should update form data when handleChange is called', () => {
    const { result } = renderHook(() => useCardCreation());

    act(() => {
      result.current.handleChange({
        target: { name: 'question', value: 'Test Question' }
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.formData.question).toBe('Test Question');
  });

  it('should successfully create a card', async () => {
    mockCreateCard.mockResolvedValueOnce({});
    const { result } = renderHook(() => useCardCreation());

    // Set some form data
    act(() => {
      result.current.handleChange({
        target: { name: 'question', value: 'Test Question' }
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // Call createCard
    await act(async () => {
      await result.current.createCard();
    });

    expect(mockCreateCard).toHaveBeenCalledWith({
      question: 'Test Question',
      answer: '',
      tag: ''
    });
    expect(result.current.success).toBe(true);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.formData).toEqual({
      question: '',
      answer: '',
      tag: ''
    });
  });

  it('should handle errors when creating a card fails', async () => {
    const errorMessage = 'Failed to create card';
    mockCreateCard.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useCardCreation());

    await act(async () => {
      await result.current.createCard();
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.loading).toBe(false);
    expect(result.current.success).toBe(false);
  });

  it('should clear error and success states after 5 seconds', async () => {
    jest.useFakeTimers();
    mockCreateCard.mockRejectedValueOnce(new Error('Test error'));

    const { result } = renderHook(() => useCardCreation());

    // Trigger an error
    await act(async () => {
      await result.current.createCard();
    });

    expect(result.current.error).toBe('Test error');

    // Fast-forward 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.success).toBe(false);

    jest.useRealTimers();
  });
});
