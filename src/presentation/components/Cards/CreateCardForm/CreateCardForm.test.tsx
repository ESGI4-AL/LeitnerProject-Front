import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateCardForm from './CreateCardForm';
import { useCardCreation } from '../../../../application/cards/useCardCreation';

jest.mock('../../../../application/cards/useCardCreation');

describe('CreateCardForm', () => {
  const mockCreateCard = jest.fn();
  const mockHandleChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useCardCreation as jest.Mock).mockReturnValue({
      formData: {
        question: '',
        answer: '',
        tag: ''
      },
      error: null,
      success: false,
      handleChange: mockHandleChange,
      createCard: mockCreateCard
    });
  });

  it('renders all form elements correctly', () => {
    render(<CreateCardForm />);

    expect(screen.getByText('Create New Card')).toBeInTheDocument();

    expect(screen.getByLabelText(/question \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/answer \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tag \(optional\)/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /create card/i })).toBeInTheDocument();
  });

  it('handles form submission correctly', async () => {
    render(<CreateCardForm />);

    const questionInput = screen.getByLabelText(/question \*/i);
    const answerInput = screen.getByLabelText(/answer \*/i);
    const submitButton = screen.getByRole('button', { name: /create card/i });

    await userEvent.type(questionInput, 'Test Question');
    await userEvent.type(answerInput, 'Test Answer');

    fireEvent.submit(submitButton.closest('form')!);

    expect(mockCreateCard).toHaveBeenCalledTimes(1);
  });

  it('displays error message when submission fails', () => {
    (useCardCreation as jest.Mock).mockReturnValue({
      formData: { question: '', answer: '', tag: '' },
      error: 'Failed to create card',
      success: false,
      handleChange: mockHandleChange,
      createCard: mockCreateCard
    });

    render(<CreateCardForm />);

    expect(screen.getByText('Failed to create card')).toBeInTheDocument();
  });

  it('displays success message when card is created', () => {
    (useCardCreation as jest.Mock).mockReturnValue({
      formData: { question: '', answer: '', tag: '' },
      error: null,
      success: true,
      handleChange: mockHandleChange,
      createCard: mockCreateCard
    });

    render(<CreateCardForm />);

    expect(screen.getByText('Card created successfully!')).toBeInTheDocument();
  });

  it('calls handleChange when form inputs change', async () => {
    render(<CreateCardForm />);

    const questionInput = screen.getByLabelText(/question \*/i);
    const answerInput = screen.getByLabelText(/answer \*/i);
    const tagInput = screen.getByLabelText(/tag \(optional\)/i);

    await userEvent.type(questionInput, 'Test Question');
    expect(mockHandleChange).toHaveBeenCalled();

    await userEvent.type(answerInput, 'Test Answer');
    expect(mockHandleChange).toHaveBeenCalled();

    await userEvent.type(tagInput, 'Test Tag');
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('prevents default form submission behavior', async () => {
    const mockFormData = {
      question: 'Test Question',
      answer: 'Test Answer',
      tag: ''
    };

    (useCardCreation as jest.Mock).mockReturnValue({
      formData: mockFormData,
      error: null,
      success: false,
      handleChange: mockHandleChange,
      createCard: mockCreateCard
    });

    render(<CreateCardForm />);

    const submitButton = screen.getByRole('button', { name: /create card/i });
    const form = submitButton.closest('form')!;

    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    Object.defineProperty(submitEvent, 'preventDefault', { value: jest.fn() });

    fireEvent(form, submitEvent);

    expect(submitEvent.preventDefault).toHaveBeenCalled();
    expect(mockCreateCard).toHaveBeenCalled();
  });

  it('requires question and answer fields', () => {
    render(<CreateCardForm />);

    const questionInput = screen.getByLabelText(/question \*/i);
    const answerInput = screen.getByLabelText(/answer \*/i);

    expect(questionInput).toHaveAttribute('required');
    expect(answerInput).toHaveAttribute('required');
  });

  it('allows submission with valid required fields', async () => {
    const mockFormData = {
      question: 'Test Question',
      answer: 'Test Answer',
      tag: ''
    };

    (useCardCreation as jest.Mock).mockReturnValue({
      formData: mockFormData,
      error: null,
      success: false,
      handleChange: mockHandleChange,
      createCard: mockCreateCard
    });

    render(<CreateCardForm />);

    const submitButton = screen.getByRole('button', { name: /create card/i });
    fireEvent.submit(submitButton.closest('form')!);

    expect(mockCreateCard).toHaveBeenCalledTimes(1);
  });
});
