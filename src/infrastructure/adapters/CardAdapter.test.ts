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

    it('should create a card without a tag', async () => {
      const dataWithoutTag = {
        question: 'Test question',
        answer: 'Test answer'
      };

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ ...mockResponseData, tag: undefined })
      });

      await cardAdapter.createCard(dataWithoutTag);

      expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:3000/cards',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataWithoutTag)
        }
      );
    });

    it('should throw an error when the response is not ok', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request'
      });

      await expect(cardAdapter.createCard(mockCardData))
        .rejects
        .toThrow('Failed to create card');
    });

    it('should throw an error when network fails', async () => {
      fetchMock.mockRejectedValueOnce(new Error('Network error'));

      await expect(cardAdapter.createCard(mockCardData))
        .rejects
        .toThrow('Network error');
    });

    it('should throw an error when JSON parsing fails', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.reject(new Error('Invalid JSON'))
      });

      await expect(cardAdapter.createCard(mockCardData))
        .rejects
        .toThrow('Invalid JSON');
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
});
