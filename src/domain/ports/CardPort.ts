import { Card } from "../models/Card";

export type CardFormData = {
  question: string;
  answer: string;
  tag?: string;
}

export interface CardPort {
  createCard(data: CardFormData): Promise<Card>;
}
