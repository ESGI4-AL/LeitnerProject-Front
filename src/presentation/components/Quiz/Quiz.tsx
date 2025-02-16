import React from 'react';
import Button from '../shared/Button/Button';
import './Quiz.css';
import { useQuiz } from '../../../application/quiz/useQuiz';
import { useNavigate } from 'react-router-dom';

export const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentCard,
    showAnswer,
    userAnswer,
    error,
    success,
    isLastCard,
    isQuizFinished,
    hasCards,
    progress,
    actions: { toggleAnswer, submitAnswer, setUserAnswer, finishQuiz },
  } = useQuiz();

  if (!hasCards) {
    return (
      <div className="quiz-container">
        <div className="quiz-no-card">
          <h2 className="no-cards">No cards available for today.</h2>
          <p className="no-cards-message">
            You need to create some cards first before taking a quiz.
          </p>
          <Button className="create-card-btn" onClick={() => navigate("/add-card")}>
            Create New Cards
          </Button>
        </div>
      </div>
    );
  }

  if (isQuizFinished) {
    return (
      <div className="quiz-container">
        <div className="quiz-finished">
          <h2 className="completed">Quiz Completed !</h2>
          <p className="quiz-summary">
            You've completed today's quiz. Come back tomorrow for new cards.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h2 className='quiz-title'>Today's Quiz</h2>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(progress.current / progress.total) * 100}%` }}
          />
          <span className="progress-text">
            {progress.current} / {progress.total}
          </span>
        </div>

        <div className="card-content">
          <div className="category-badge">{currentCard.category}</div>
          {currentCard.tag && (
            <div className="tag-badge">{currentCard.tag}</div>
          )}

          <div className="question">{currentCard.question}</div>

          <div className="form-group">
            <label htmlFor="answer">Your Answer :</label>
            <textarea
              id="answer"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="answer-input"
              placeholder="Type your answer here..."
              rows={3}
              disabled={showAnswer}
            />
          </div>

          {!showAnswer ? (
            <div className="button-group">
              <Button
                type="button"
                onClick={toggleAnswer}
                className="show-answer-button"
                disabled={!userAnswer.trim()}
              >
                Show Correct Answer
              </Button>
            </div>
          ) : (
            <>
              <div className="answer">
                <strong>Correct answer:</strong><br /><br />
                {currentCard.answer}
              </div>
              <div className="button-group">
                <Button
                  onClick={() => submitAnswer(false)}
                  className="incorrect-button"
                >
                  Decline answer
                </Button>
                <Button
                  onClick={() => submitAnswer(true)}
                  className="correct-button"
                >
                  Accept answer
                </Button>
              </div>
            </>
          )}

          {isLastCard && showAnswer && (
            <Button
              onClick={finishQuiz}
              className="finish-quiz-button"
            >
              Finish Quiz
            </Button>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          {success && (
            <div className="success-message">
              Answer submitted successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
