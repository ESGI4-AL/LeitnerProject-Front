import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import HomePage from '../pages/HomePage/HomePage';
import AddCardPage from '../pages/AddCardPage/AddCardPage';
import ViewCardsPage from '../pages/ViewCardsPage/ViewCardsPage';
import QuizPage from '../pages/QuizPage/QuizPage';

jest.mock('../pages/HomePage/HomePage', () => {
  return jest.fn(() => <div data-testid="home-page">Home Page</div>);
});

jest.mock('../pages/AddCardPage/AddCardPage', () => {
  return jest.fn(() => <div data-testid="add-card-page">Add Card Page</div>);
});

jest.mock('../pages/ViewCardsPage/ViewCardsPage', () => {
  return jest.fn(() => <div data-testid="view-cards-page">View Cards Page</div>);
});

jest.mock('../pages/QuizPage/QuizPage', () => {
  return jest.fn(() => <div data-testid="quiz-page">Quiz Page</div>);
});

const renderWithRouter = (initialEntry = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <AppRoutes />
    </MemoryRouter>
  );
};

describe('AppRoutes Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders HomePage for / route', () => {
    renderWithRouter('/');
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
    expect(HomePage).toHaveBeenCalled();
  });

  test('renders AddCardPage for /add-card route', () => {
    renderWithRouter('/add-card');
    expect(screen.getByTestId('add-card-page')).toBeInTheDocument();
    expect(AddCardPage).toHaveBeenCalled();
  });

  test('renders ViewCardsPage for /view-cards route', () => {
    renderWithRouter('/view-cards');
    expect(screen.getByTestId('view-cards-page')).toBeInTheDocument();
    expect(ViewCardsPage).toHaveBeenCalled();
  });

  test('renders QuizPage for /quiz route', () => {
    renderWithRouter('/quiz');
    expect(screen.getByTestId('quiz-page')).toBeInTheDocument();
    expect(QuizPage).toHaveBeenCalled();
  });

  test('renders each component exactly once for their respective routes', () => {
    renderWithRouter('/');
    expect(HomePage).toHaveBeenCalledTimes(1);
    expect(AddCardPage).not.toHaveBeenCalled();
    expect(ViewCardsPage).not.toHaveBeenCalled();
    expect(QuizPage).not.toHaveBeenCalled();
  });
});
