import { useEffect, useState } from "react";
import { Card } from "../../domain/models/Card";
import { CardAdapter } from "../../infrastructure/adapters/CardAdapter";

interface CardListState {
  loading: boolean;
  error: string | null;
  cards: Card[];
}

export const useCardList = () => {
  const [state, setState] = useState<CardListState>({
    loading: false,
    error: null,
    cards: [],
  });

  const cardAdapter = new CardAdapter();

  useEffect(() => {
    const fetchCards = async () => {
      setState({ loading: true, error: null, cards: [] });
      try {
        const cards = await cardAdapter.getAllCards();
        setState({ loading: false, error: null, cards });
      } catch (error) {
        setState({
          loading: false,
          error: error instanceof Error ? error.message : "An error occurred",
          cards: [],
        });
      }
    };

    fetchCards();
  }, []);

  return state;
};
