import React from 'react';
import './ViewCard.css';
import { useCardList } from '../../../../application/cards/ViewCard';

const ViewCard: React.FC = () => {
  const { cards, loading, error } = useCardList();

  if (loading) {
    return (
      <div className="card-view-container">
        <div className="loading-message">Loading cards...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card-view-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="card-view-container">
      <h2 className="card-view-title">Your Cards</h2>
      <div className="cards-grid">
        {cards.map((card) => (
          <div key={card.id} className="card-view-card">
            <div className="card-content">
              <div className="card-group">
                <label>Question:</label>
                <p className="card-text">{card.question}</p>
              </div>

              <div className="card-group">
                <label>Answer:</label>
                <p className="card-text">{card.answer}</p>
              </div>

              {card.tag && (
                <div className="card-group">
                  <label>Tag:</label>
                  <p className="card-text">{card.tag}</p>
                </div>
              )}

              <div className="card-group">
                <label>Category:</label>
                <p className="card-text category-badge">{card.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {cards.length === 0 && (
        <div className="no-cards-message">
          No cards found. Try creating some new cards!
        </div>
      )}
    </div>
  );
};

export default ViewCard;