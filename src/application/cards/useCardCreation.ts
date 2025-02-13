import { useEffect, useState } from "react";
import { CardFormData } from "../../domain/ports/CardPort";
import { CardAdapter } from "../../infrastructure/adapters/CardAdapter";

interface CardCreationState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export const useCardCreation = () => {
  const [formData, setFormData] = useState<CardFormData>({
    question: '',
    answer: '',
    tag: ''
  });

  const [state, setState] = useState<CardCreationState>({
    loading: false,
    error: null,
    success: false
  });

  const cardAdapter = new CardAdapter();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (state.error || state.success) {
      timer = setTimeout(() => {
        setState(prev => ({
          ...prev,
          error: null,
          success: false
        }));
      }, 5000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [state.error, state.success]);

  const createCard = async () => {
    setState({ loading: true, error: null, success: false });
    try {
      await cardAdapter.createCard(formData);
      setState({ loading: false, error: null, success: true });
      setFormData({ question: '', answer: '', tag: '' });
    } catch (error) {
      setState({
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
        success: false
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return {
    formData,
    ...state,
    handleChange,
    createCard
  };
};
