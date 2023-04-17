const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const timerElement = document.getElementById('timer');

let shuffledQuestions, currentQuestionIndex, timeLeft, timerIntervalId;

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startQuiz() {
  startButton.textContent = "Next";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove('hide');
  timeLeft = 50; // Set the total time for the quiz (in seconds)
  timerIntervalId = setInterval(updateTimer, 1000); // Update the timer every second
  setNextQuestion();
}


function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}
  
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('answer-button');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}
  
  function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide');
    } else {
      startButton.innerText = 'Restart';
      startButton.classList.remove('hide');
    }
  }
  
  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong');
    }
  }

  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }

  function endQuiz() {
    clearInterval(timerIntervalId);
    // Display the final score or any other end-of-quiz information
  }

  function updateTimer() {
    timeLeft--;
    if (timeLeft < 0) {
      // If time is up, end the quiz
      clearInterval(timerIntervalId);
      endQuiz();
    } else {
      timerElement.innerText = `Time left: ${timeLeft}s`;
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }

  
  const questions = [
  {
    question: 'What is the largest ocean in the world?',
    answers: [
      { text: 'Atlantic Ocean', correct: false },
      { text: 'Indian Ocean', correct: false },
      { text: 'Pacific Ocean', correct: true },
      { text: 'Arctic Ocean', correct: false }
    ]
  },
  {
    question: 'What is the smallest country in the world?',
    answers: [
      { text: 'Monaco', correct: false },
      { text: 'Vatican City', correct: true },
      { text: 'Liechtenstein', correct: false },
      { text: 'San Marino', correct: false }
    ]
  },
  {
    question: 'What is the boiling point of water in degrees Celsius?',
    answers: [
      { text: '0', correct: false },
      { text: '100', correct: true },
      { text: '50', correct: false },
      { text: '200', correct: false }
    ]
  },
  {
    question: 'What is the capital city of Australia?',
    answers: [
      { text: 'Sydney', correct: false },
      { text: 'Melbourne', correct: false },
      { text: 'Canberra', correct: true },
      { text: 'Brisbane', correct: false }
    ]
  },
  {
    question: 'What is the highest mountain in the world?',
    answers: [
      { text: 'Mount Everest', correct: true },
      { text: 'Mount Kilimanjaro', correct: false },
      { text: 'Mount Fuji', correct: false },
      { text: 'Mount Denali', correct: false }
    ]
  },
  {
    question: 'What is the largest country by land area?',
    answers: [
      { text: 'Russia', correct: true },
      { text: 'Canada', correct: false },
      { text: 'China', correct: false },
      { text: 'United States', correct: false }
    ]
  },
  {
    question: 'Who is the current CEO of Microsoft?',
    answers: [
      { text: 'Steve Jobs', correct: false },
      { text: 'Mark Zuckerberg', correct: false },
      { text: 'Tim Cook', correct: false },
      { text: 'Satya Nadella', correct: true }
    ]
  },
  {
    question: 'What is the chemical symbol for oxygen?',
    answers: [
      { text: 'O', correct: true },
      { text: 'H', correct: false },
      { text: 'C', correct: false },
      { text: 'N', correct: false }
    ]
  },
  {
    question: 'Who wrote the novel "To Kill a Mockingbird"?',
    answers: [
      { text: 'Harper Lee', correct: true },
      { text: 'F. Scott Fitzgerald', correct: false },
      { text: 'Ernest Hemingway', correct: false },
      { text: 'William Faulkner', correct: false }
    ]
  },
  {
    question: 'What is the smallest continent in the world?',
    answers: [
      { text: 'Africa', correct: false },
      { text: 'South America', correct: false },
      { text: 'Europe', correct: false },
      { text: 'Australia', correct: true }
    ]
  }
];
  