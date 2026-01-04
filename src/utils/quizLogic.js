import questionsData from '../questions.json';

const WEIGHTS_KEY = 'quiz_weights';

/**
 * Loads weights from localStorage
 * @returns {Record<number, number>}
 */
export const loadWeights = () => {
  try {
    const stored = localStorage.getItem(WEIGHTS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.error("Failed to load weights", e);
    return {};
  }
};

/**
 * Saves weights to localStorage
 * @param {Record<number, number>} weights 
 */
export const saveWeights = (weights) => {
  try {
    localStorage.setItem(WEIGHTS_KEY, JSON.stringify(weights));
  } catch (e) {
    console.error("Failed to save weights", e);
  }
};

export const clearWeights = () => {
  localStorage.removeItem(WEIGHTS_KEY);
};

/**
 * Selects questions based on weighted random selection.
 * @param {number} count Number of questions to select
 * @returns {Array} Selected questions with current weights
 */
export const selectQuestions = (count = 20) => {
  const weights = loadWeights();
  
  // Create a working list of questions with their current derived weights
  let pool = questionsData.map(q => ({
    ...q,
    currentWeight: weights[q.id] || q.weight || 1
  }));

  const selected = [];
  const targetCount = Math.min(count, pool.length);

  for (let i = 0; i < targetCount; i++) {
    // Calculate total weight of current pool
    const totalWeight = pool.reduce((sum, q) => sum + q.currentWeight, 0);
    let randomValue = Math.random() * totalWeight;
    
    // Find the item
    let selectedIndex = -1;
    for (let j = 0; j < pool.length; j++) {
      randomValue -= pool[j].currentWeight;
      if (randomValue <= 0) {
        selectedIndex = j;
        break;
      }
    }
    
    // Fallback/Edge case logic (rounding errors)
    if (selectedIndex === -1) selectedIndex = pool.length - 1;

    // Add to selected and remove from pool to avoid duplicates in this session
    selected.push(pool[selectedIndex]);
    pool.splice(selectedIndex, 1);
  }

  // Shuffle the selected questions to randomise order
  return shuffleArray(selected);
};

/**
 * Fisher-Yates shuffle algorithm
 * @param {Array} array 
 * @returns {Array} Shuffled array
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * Updates the weight for a specific question ID.
 * @param {number} questionId 
 * @param {boolean} isCorrect 
 */
export const updateQuestionWeight = (questionId, isCorrect) => {
  const weights = loadWeights();
  const currentWeight = weights[questionId] || 1;
  
  let newWeight;
  if (isCorrect) {
    newWeight = Math.max(1, currentWeight - 1);
  } else {
    newWeight = currentWeight + 3;
  }

  weights[questionId] = newWeight;
  saveWeights(weights);
  return newWeight;
};
