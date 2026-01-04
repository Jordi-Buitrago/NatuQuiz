import React from 'react';
import { useQuiz } from './hooks/useQuiz';
import QuestionCard from './components/QuestionCard';
import Results from './components/Results';
import './App.css';

function App() {
  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    isFinished,
    score,
    answers,
    loading,
    handleAnswer,
    nextQuestion,
    restartQuiz,
    resetLearningProgress
  } = useQuiz();

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>NATU QUIZ</h1>
      </header>
      
      <main className="main-content">
        {!isFinished ? (
          <>
            <div className="progress-bar-container">
              <div className="progress-info">
                <span>Pregunta {currentIndex + 1} de {totalQuestions}</span>
                <span>Puntos: {score}</span>
              </div>
              <div className="progress-track">
                <div 
                  className="progress-fill" 
                  style={{ width: `${((currentIndex) / totalQuestions) * 100}%` }}
                ></div>
              </div>
            </div>

            <QuestionCard
              question={currentQuestion}
              answerState={currentQuestion ? answers[currentQuestion.id] : null}
              onAnswer={handleAnswer}
              onNext={nextQuestion}
              isLast={currentIndex === totalQuestions - 1}
            />
          </>
        ) : (
          <Results 
            score={score} 
            total={totalQuestions} 
            onRestart={restartQuiz}
            onResetWeights={resetLearningProgress}
          />
        )}
      </main>
    </div>
  );
}

export default App;
