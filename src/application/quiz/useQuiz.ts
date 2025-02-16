import { useState, useEffect } from 'react';
import { Card } from '../../domain/models/Card';
import { CardAdapter } from '../../infrastructure/adapters/CardAdapter';

export const useQuiz = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [hasCards, setHasCards] = useState(false);

  const cardAdapter = new CardAdapter();

  useEffect(() => {
    fetchTodayCards();
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (error || success) {
      timer = setTimeout(() => {
        setError(null);
        setSuccess(false);
      }, 5000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [error, success]);

  const fetchTodayCards = async () => {
    try {
      const fetchedCards = await cardAdapter.getTodayCards();
      setCards(fetchedCards);
      setHasCards(fetchedCards.length > 0);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      setHasCards(false);
    }
  };

  const submitAnswer = async (isValid: boolean) => {
    const currentCard = cards[currentCardIndex];
    setError(null);

    try {
      await cardAdapter.submitAnswer(currentCard.id!, isValid);
      if (currentCardIndex < cards.length - 1) {
        setCurrentCardIndex(prev => prev + 1);
        setShowAnswer(false);
        setUserAnswer('');
      }
      setSuccess(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const toggleAnswer = () => {
    if (userAnswer.trim()) {
      setShowAnswer(true);
    } else {
      setError('Please enter your answer first');
    }
  };

  const finishQuiz = () => {
    setIsQuizFinished(true);
  };

  return {
    currentCard: cards[currentCardIndex],
    showAnswer,
    userAnswer,
    error,
    success,
    isLastCard: currentCardIndex === cards.length - 1,
    isQuizFinished,
    hasCards,
    progress: {
      current: currentCardIndex + 1,
      total: cards.length,
    },
    actions: {
      toggleAnswer,
      submitAnswer,
      setUserAnswer,
      finishQuiz,
    },
  };
};
