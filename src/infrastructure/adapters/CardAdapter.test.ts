import { CardAdapter } from './CardAdapter';
import { Card, Category } from '../../domain/models/Card';

describe('CardAdapter', () => {
  let cardAdapter: CardAdapter;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock;
    cardAdapter = new CardAdapter();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createCard', () => {
    const mockCardData = {
      question: 'Test question',
      answer: 'Test answer',
      tag: 'test-tag'
    };

    const mockResponseData: Card = {
      id: '123',
      question: 'Test question',
      answer: 'Test answer',
      tag: 'test-tag',
      category: Category.FIRST
    };

    it('should successfully create a card', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponseData)
      });

      const result = await cardAdapter.createCard(mockCardData);

      expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:3000/cards',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mockCardData)
        }
      );

      expect(result).toEqual(mockResponseData);
    });

    it('should use the correct base URL', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponseData)
      });

      await cardAdapter.createCard(mockCardData);

      const fetchCall = fetchMock.mock.calls[0][0];
      expect(fetchCall).toMatch(/^http:\/\/localhost:3000/);
    });
  });

  describe('getAllCards', () => {
    const mockCards: Card[] = [
      { id: '1', question: 'Q1', answer: 'A1', tag: 'tag1', category: Category.FIRST },
      { id: '2', question: 'Q2', answer: 'A2', tag: 'tag2', category: Category.SECOND }
    ];

    it('should fetch all cards successfully', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCards)
      });

      const result = await cardAdapter.getAllCards();

      expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:3000/cards',
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }
      );

      expect(result).toEqual(mockCards);
    });

    it('should throw an error when fetching cards fails', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      await expect(cardAdapter.getAllCards()).rejects.toThrow('Failed to fetch cards');
    });
  });
});
