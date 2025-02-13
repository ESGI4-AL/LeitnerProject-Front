import React from 'react';
import './CreateCardForm.css';
import { useCardCreation } from '../../../../application/cards/useCardCreation';
import Button from '../../shared/Button/Button';

const CreateCardForm: React.FC = () => {
  const {
    formData,
    error,
    success,
    handleChange,
    createCard,
  } = useCardCreation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCard();
  };

  return (
    <div className="card-form-container">
      <div className="card-form-card">
        <h2 className="card-form-title">Create New Card</h2>

        <form onSubmit={handleSubmit} className="card-form">
          <div className="form-group">
            <label htmlFor="question">Question *</label>
            <textarea
              id="question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              placeholder="Enter your question"
              required
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="answer">Answer *</label>
            <textarea
              id="answer"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              placeholder="Enter the answer"
              required
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tag">Tag (Optional)</label>
            <input
              type="text"
              id="tag"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              placeholder="Enter a tag for categorization"
              className="form-input"
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {success && (
            <div className="success-message">
              Card created successfully!
            </div>
          )}
          <Button type='submit' className='submit-button'>
            Create Card
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateCardForm;