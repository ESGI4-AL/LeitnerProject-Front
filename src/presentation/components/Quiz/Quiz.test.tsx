import { render, screen, fireEvent } from '@testing-library/react';
import { Quiz } from './Quiz';
import { useQuiz } from '../../../application/quiz/useQuiz';
import { useNavigate } from 'react-router-dom';
import { Category } from '../../../domain/models/Card';

jest.mock('../../../application/quiz/useQuiz');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Quiz', () => {
  const mockNavigate = jest.fn();
  const mockToggleAnswer = jest.fn();
  const mockSubmitAnswer = jest.fn();
  const mockSetUserAnswer = jest.fn();
  const mockFinishQuiz = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  const mockUseQuiz = (overrides = {}) => {
    const defaultValues = {
      currentCard: {
        id: '1',
        question: 'Test Question',
        answer: 'Test Answer',
        category: Category.FIRST,
        tag: 'test-tag'
      },
      showAnswer: false,
      userAnswer: '',
      error: null,
      success: false,
      isLastCard: false,
      isQuizFinished: false,
      hasCards: true,
      progress: { current: 1, total: 3 },
      actions: {
        toggleAnswer: mockToggleAnswer,
        submitAnswer: mockSubmitAnswer,
        setUserAnswer: mockSetUserAnswer,
        finishQuiz: mockFinishQuiz,
      },
    };

    (useQuiz as jest.Mock).mockReturnValue({ ...defaultValues, ...overrides });
  };

  describe('No Cards State', () => {
    it('should show no cards message and create button when hasCards is false', () => {
      mockUseQuiz({ hasCards: false });

      render(<Quiz />);

      expect(screen.getByText('No cards available for today.')).toBeInTheDocument();
      expect(screen.getByText('You need to create some cards first before taking a quiz.')).toBeInTheDocument();

      const createButton = screen.getByText('Create New Cards');
      fireEvent.click(createButton);
      expect(mockNavigate).toHaveBeenCalledWith('/add-card');
    });
  });

  describe('Quiz Finished State', () => {
    it('should show completion message when quiz is finished', () => {
      mockUseQuiz({ isQuizFinished: true });

      render(<Quiz />);

      expect(screen.getByText('Quiz Completed !')).toBeInTheDocument();
      expect(screen.getByText("You've completed today's quiz. Come back tomorrow for new cards.")).toBeInTheDocument();
    });
  });

  describe('Active Quiz State', () => {
    beforeEach(() => {
      mockUseQuiz();
    });

    it('should render quiz title and progress bar', () => {
      render(<Quiz />);

      expect(screen.getByText("Today's Quiz")).toBeInTheDocument();
      expect(screen.getByText('1 / 3')).toBeInTheDocument();
    });

    it('should display current card information', () => {
      render(<Quiz />);

      expect(screen.getByText('Test Question')).toBeInTheDocument();
      expect(screen.getByText('test-tag')).toBeInTheDocument();
      expect(screen.getByText(Category.FIRST)).toBeInTheDocument();
    });

    it('should handle user answer input', () => {
      render(<Quiz />);

      const textarea = screen.getByPlaceholderText('Type your answer here...') as HTMLTextAreaElement;
      fireEvent.change(textarea, { target: { value: 'My answer' } });

      expect(mockSetUserAnswer).toHaveBeenCalledWith('My answer');
    });

    it('should handle show answer button click', () => {
      mockUseQuiz({ userAnswer: 'test answer' });

      render(<Quiz />);

      const showAnswerButton = screen.getByText('Show Correct Answer');
      fireEvent.click(showAnswerButton);

      expect(mockToggleAnswer).toHaveBeenCalled();
    });

    it('should display answer and evaluation buttons when showAnswer is true', () => {
      mockUseQuiz({ showAnswer: true });

      render(<Quiz />);

      expect(screen.getByText('Test Answer')).toBeInTheDocument();
      expect(screen.getByText('Accept answer')).toBeInTheDocument();
      expect(screen.getByText('Decline answer')).toBeInTheDocument();
    });

    it('should handle answer submission', () => {
      mockUseQuiz({ showAnswer: true });

      render(<Quiz />);

      const acceptButton = screen.getByText('Accept answer');
      fireEvent.click(acceptButton);
      expect(mockSubmitAnswer).toHaveBeenCalledWith(true);

      const declineButton = screen.getByText('Decline answer');
      fireEvent.click(declineButton);
      expect(mockSubmitAnswer).toHaveBeenCalledWith(false);
    });

    it('should show finish quiz button on last card', () => {
      mockUseQuiz({ isLastCard: true, showAnswer: true });

      render(<Quiz />);

      const finishButton = screen.getByText('Finish Quiz');
      fireEvent.click(finishButton);
      expect(mockFinishQuiz).toHaveBeenCalled();
    });

    it('should display error message when present', () => {
      mockUseQuiz({ error: 'Test error message' });

      render(<Quiz />);

      expect(screen.getByText('Test error message')).toBeInTheDocument();
    });

    it('should display success message when present', () => {
      mockUseQuiz({ success: true });

      render(<Quiz />);

      expect(screen.getByText('Answer submitted successfully!')).toBeInTheDocument();
    });

    it('should disable textarea when showing answer', () => {
      mockUseQuiz({ showAnswer: true });

      render(<Quiz />);

      const textarea = screen.getByPlaceholderText('Type your answer here...') as HTMLTextAreaElement;
      expect(textarea).toBeDisabled();
    });

    it('should disable show answer button when user answer is empty', () => {
      mockUseQuiz({ userAnswer: '' });

      render(<Quiz />);

      const showAnswerButton = screen.getByText('Show Correct Answer');
      expect(showAnswerButton).toHaveAttribute('disabled');
      expect(showAnswerButton).toHaveClass('show-answer-button');
    });
  });
});
