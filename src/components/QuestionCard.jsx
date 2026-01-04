import React from 'react';

const QuestionCard = ({ question, answerState, onAnswer, onNext, isLast }) => {
  if (!question) return null;

  return (
    <div className="card question-card">
      <h2 className="question-text">{question.question}</h2>
      
      <div className="options-grid">
        {question.options.map((option, index) => {
          let className = "option-btn";
          
          if (answerState) {
            if (index === question.correctIndex) {
              className += " correct";
            } else if (index === answerState.selectedIndex) {
              className += " incorrect";
            } else {
              className += " disabled";
            }
          }

          return (
            <button
              key={index}
              className={className}
              onClick={() => onAnswer(index)}
              disabled={!!answerState}
            >
              {option}
            </button>
          );
        })}
      </div>

      {answerState && (
        <div className="footer-actions">
          <div className={`feedback ${answerState.isCorrect ? 'text-success' : 'text-error'}`}>
            {answerState.isCorrect ? '¡Correcto!' : 'Incorrecto'}
          </div>
          <button className="primary-btn" onClick={onNext} autoFocus>
            {isLast ? 'Finalizar Quiz' : 'Siguiente Pregunta'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
