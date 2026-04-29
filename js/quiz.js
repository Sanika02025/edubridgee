const questions = [
  {
    question: "What is 2 + 3?",
    options: ["3", "4", "5"],
    correctIndex: 2
  },
  {
    question: "What is 6 - 2?",
    options: ["2", "3", "4"],
    correctIndex: 2
  },
  {
    question: "Choose the correct spelling:",
    options: ["Aplle", "Apple", "Aple"],
    correctIndex: 1
  },
  {
    question: "Opposite of 'big' is:",
    options: ["short", "small", "tall"],
    correctIndex: 1
  },
  {
    question: "How many days in a week?",
    options: ["5", "6", "7"],
    correctIndex: 2
  }
];

let currentIndex = 0;
let score = 0;
let answered = false;

const qText = document.getElementById("question-text");
const optionsDiv = document.getElementById("options");
const feedback = document.getElementById("feedback");
const progress = document.getElementById("progress");
const quizArea = document.getElementById("quiz-area");
const resultArea = document.getElementById("result-area");
const finalScore = document.getElementById("final-score");

function startQuiz() {
  currentIndex = 0;
  score = 0;
  answered = false;
  resultArea.style.display = "none";
  quizArea.style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  const q = questions[currentIndex];
  qText.textContent = (currentIndex + 1) + ") " + q.question;
  feedback.textContent = "";
  answered = false;

  let html = "";
  q.options.forEach((opt, i) => {
    html += `
      <button class="btn-primary" onclick="selectOption(${i})">
        ${String.fromCharCode(65 + i)}. ${opt}
      </button><br><br>
    `;
  });
  optionsDiv.innerHTML = html;

  progress.textContent = "Question " + (currentIndex + 1) + " of " + questions.length;
}

function selectOption(chosenIndex) {
  if (answered) return;
  answered = true;

  const q = questions[currentIndex];
  if (chosenIndex === q.correctIndex) {
    score++;
    feedback.textContent = "Correct! 🎉";
  } else {
    const correctLetter = String.fromCharCode(65 + q.correctIndex);
    feedback.textContent = "Incorrect. Correct answer is " + correctLetter + ".";
  }
}

function nextQuestion() {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  quizArea.style.display = "none";
  resultArea.style.display = "block";
  finalScore.textContent = "Class Score: " + score + " / " + questions.length;

  if (score >= Math.ceil(questions.length * 0.7)) {
    finalScore.textContent += " – Great job! ⭐";
  }
}
function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-IN";
  window.speechSynthesis.speak(speech);
}