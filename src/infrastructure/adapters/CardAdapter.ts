import { Card } from "../../domain/models/Card";
import { CardPort } from "../../domain/ports/CardPort";

export class CardAdapter implements CardPort {
  private baseUrl = 'http://localhost:3000'; // à changer en 8080

  async createCard(data: { question: string; answer: string; tag?: string }): Promise<Card> {
    const response = await fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Failed to create card');
    return response.json();
  }
}
