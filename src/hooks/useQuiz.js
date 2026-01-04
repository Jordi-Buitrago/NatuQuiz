import { useState, useEffect, useCallback } from 'react';
import { selectQuestions, updateQuestionWeight, clearWeights } from '../utils/quizLogic';

export const useQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answers, setAnswers] = useState({}); // { questionId: { selectedIndex, isCorrect } }
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Initialize quiz
  const startQuiz = useCallback(() => {
    setLoading(true);
    const selected = selectQuestions(20);
    setQuestions(selected);
    setCurrentIndex(0);
    setIsFinished(false);
    setAnswers({});
    setScore(0);
    setLoading(false);
  }, []);

  useEffect(() => {
    startQuiz();
  }, [startQuiz]);

  const handleAnswer = (selectedIndex) => {
    const currentQuestion = questions[currentIndex];
    if (!currentQuestion) return;

    // Prevent answering twice if already answered
    if (answers[currentQuestion.id]) return;

    const isCorrect = selectedIndex === currentQuestion.correctIndex;
    
    // Update weight based on correctness
    updateQuestionWeight(currentQuestion.id, isCorrect);

    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: { selectedIndex, isCorrect }
    }));

    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const resetLearningProgress = () => {
    clearWeights();
    startQuiz();
  };

  return {
    questions,
    currentQuestion: questions[currentIndex],
    currentIndex,
    totalQuestions: questions.length,
    isFinished,
    score,
    answers,
    loading,
    handleAnswer,
    nextQuestion,
    restartQuiz: startQuiz,
    resetLearningProgress
  };
};
