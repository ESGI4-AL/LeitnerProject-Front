import { render } from '@testing-library/react';
import AddCardPage from './AddCardPage';
import CreateCardForm from '../../components/Cards/CreateCardForm/CreateCardForm';

jest.mock('../../components/Cards/CreateCardForm/CreateCardForm', () => {
  return jest.fn(() => <div data-testid="mock-create-card-form">Mock Create Card Form</div>);
});

describe('AddCardPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    const { container } = render(<AddCardPage />);
    expect(container).toBeInTheDocument();
  });

  test('renders with correct CSS class', () => {
    const { container } = render(<AddCardPage />);
    const pageElement = container.querySelector('.AddCardPage');
    expect(pageElement).toBeInTheDocument();
  });

  test('includes CreateCardForm component', () => {
    const { getByTestId } = render(<AddCardPage />);
    const formElement = getByTestId('mock-create-card-form');
    expect(formElement).toBeInTheDocument();
  });

  test('renders CreateCardForm exactly once', () => {
    render(<AddCardPage />);
    expect(CreateCardForm).toHaveBeenCalledTimes(1);
  });

  test('has correct component hierarchy', () => {
    const { container } = render(<AddCardPage />);
    const pageElement = container.querySelector('.AddCardPage');
    const formElement = pageElement?.querySelector('[data-testid="mock-create-card-form"]');

    expect(pageElement).toBeInTheDocument();
    expect(formElement).toBeInTheDocument();
  });
});
