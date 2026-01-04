import React from 'react';

const Results = ({ score, total, onRestart, onResetWeights }) => {
  const percentage = Math.round((score / total) * 100);
  
  return (
    <div className="card results-card">
      <h1>¡Quiz Completado!</h1>
      
      <div className="score-display">
        <div className="score-circle">
          <span>{percentage}%</span>
        </div>
        <p>Has acertado {score} de {total}</p>
      </div>

      <div className="actions-stack">
        <button className="primary-btn" onClick={onRestart}>
          Volver a empezar
        </button>
        
        <button className="text-btn danger" onClick={() => {
          if(confirm('¿Esto borrará tu progreso de aprendizaje y los pesos de las preguntas. ¿Continuar?')) {
            onResetWeights();
          }
        }}>
          Reiniciar Progreso de Aprendizaje
        </button>
      </div>
    </div>
  );
};

export default Results;
