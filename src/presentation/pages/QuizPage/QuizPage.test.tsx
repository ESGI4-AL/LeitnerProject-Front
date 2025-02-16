import { render, screen } from '@testing-library/react';
import QuizPage from './QuizPage';
import { Quiz } from '../../components/Quiz/Quiz';

jest.mock('../../components/Quiz/Quiz', () => ({
  Quiz: jest.fn(() => <div data-testid="mock-quiz">Quiz Component</div>)
}));

describe('QuizPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<QuizPage />);
    expect(screen.getByTestId('mock-quiz')).toBeInTheDocument();
  });

  it('should render with correct className', () => {
    const { container } = render(<QuizPage />);
    expect(container.firstChild).toHaveClass('QuizPage');
  });

  it('should render the Quiz component', () => {
    render(<QuizPage />);
    expect(Quiz).toHaveBeenCalled();
  });

  it('should render Quiz component exactly once', () => {
    render(<QuizPage />);
    expect(Quiz).toHaveBeenCalledTimes(1);
  });
});
