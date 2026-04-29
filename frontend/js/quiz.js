// ========== quiz.js ==========
// Handles question generation, logic, and scoring entirely on the frontend

// ===== QUIZ DATA =====
const quizData = {
  maths: {
    "Class 1": [
      { q: "What comes after 9?", o: ["8", "10", "11"], a: 1 },
      { q: "5 + 3 = ?", o: ["7", "8", "9"], a: 1 },
      { q: "How many legs does a dog have?", o: ["2", "4", "6"], a: 1 },
      { q: "10 - 2 = ?", o: ["8", "9", "10"], a: 0 },
      { q: "Which number is bigger: 12 or 20?", o: ["12", "20", "Both equal"], a: 1 }
    ],
    "Class 2": [
      { q: "15 + 10 = ?", o: ["20", "25", "30"], a: 1 },
      { q: "24 - 10 = ?", o: ["14", "12", "16"], a: 0 },
      { q: "What is 2 multiplied by 3? (2 x 3)", o: ["5", "6", "8"], a: 1 },
      { q: "How many months in a year?", o: ["10", "11", "12"], a: 2 },
      { q: "Which shape has 4 equal sides?", o: ["Triangle", "Square", "Circle"], a: 1 }
    ],
    "Class 3": [
      { q: "What is 4 x 5?", o: ["15", "20", "25"], a: 1 },
      { q: "10 divided by 2 is?", o: ["4", "5", "6"], a: 1 },
      { q: "30 + 45 = ?", o: ["75", "85", "65"], a: 0 },
      { q: "How many sides does a pentagon have?", o: ["4", "5", "6"], a: 1 },
      { q: "100 - 25 = ?", o: ["55", "75", "85"], a: 1 }
    ],
    "Class 4": [
      { q: "What is the fraction for half?", o: ["1/3", "1/4", "1/2"], a: 2 },
      { q: "What is 8 x 7?", o: ["54", "56", "64"], a: 1 },
      { q: "Calculate: 150 + 200", o: ["350", "450", "250"], a: 0 },
      { q: "What is a 90 degree angle called?", o: ["Acute angle", "Right angle", "Obtuse angle"], a: 1 },
      { q: "1000 - 350 = ?", o: ["650", "550", "750"], a: 0 }
    ],
    "Class 5": [
      { q: "What is 0.5 as a fraction?", o: ["1/4", "1/2", "1/5"], a: 1 },
      { q: "If 1 kg = 1000g, how many grams in 2.5 kg?", o: ["250g", "2500g", "2050g"], a: 1 },
      { q: "What is 12 x 12?", o: ["124", "144", "164"], a: 1 },
      { q: "Solve: 45 / 5", o: ["8", "9", "10"], a: 1 },
      { q: "What is 50% of 200?", o: ["50", "100", "150"], a: 1 }
    ]
  },
  english: {
    "Class 1": [
      { q: "What letter comes after 'C'?", o: ["B", "D", "E"], a: 1 },
      { q: "Identify the vowel:", o: ["B", "C", "A"], a: 2 },
      { q: "The plural of 'Cat' is?", o: ["Cates", "Cats", "Catties"], a: 1 },
      { q: "Choose the correct spelling:", o: ["Aplle", "Apple", "Aple"], a: 1 },
      { q: "What colour is the Sun?", o: ["Yellow", "Green", "Purple"], a: 0 }
    ],
    "Class 2": [
      { q: "A naming word is called a...", o: ["Verb", "Noun", "Adjective"], a: 1 },
      { q: "Which is an action word (verb)?", o: ["Run", "Happy", "Chair"], a: 0 },
      { q: "The opposite of 'Hot' is?", o: ["Sunny", "Warm", "Cold"], a: 2 },
      { q: "Fill in the blank: The dog ___ barking.", o: ["is", "are", "am"], a: 0 },
      { q: "Select the Rhyming word for 'Cat':", o: ["Hat", "Dog", "Car"], a: 0 }
    ],
    "Class 3": [
      { q: "Which word is an Adjective?", o: ["Boy", "Play", "Beautiful"], a: 2 },
      { q: "Past tense of 'Go' is:", o: ["Goed", "Went", "Gone"], a: 1 },
      { q: "What punctuation ends a question?", o: [". (Full stop)", "? (Question mark)", "! (Exclamation)"], a: 1 },
      { q: "Opposite of 'Fast' is:", o: ["Quick", "Slow", "Heavy"], a: 1 },
      { q: "Find the odd one out:", o: ["Apple", "Banana", "Car"], a: 2 }
    ],
    "Class 4": [
      { q: "Identify the pronoun: 'He is playing.'", o: ["Playing", "Is", "He"], a: 2 },
      { q: "Complete the sentence: 'I ___ to the market yesterday.'", o: ["go", "went", "going"], a: 1 },
      { q: "Find the synonym of 'Happy':", o: ["Sad", "Joyful", "Angry"], a: 1 },
      { q: "Which one is a proper noun?", o: ["city", "building", "Mumbai"], a: 2 },
      { q: "The boys ___ playing football.", o: ["is", "are", "am"], a: 1 }
    ],
    "Class 5": [
      { q: "Identify the adverb: 'She sings sweetly.'", o: ["She", "sings", "sweetly"], a: 2 },
      { q: "Which is the correct spelling?", o: ["Beautiful", "Beatifull", "Beautifull"], a: 0 },
      { q: "Find the antonym of 'Victory':", o: ["Success", "Defeat", "Win"], a: 1 },
      { q: "Choose the conjunction:", o: ["And", "Quickly", "Yellow"], a: 0 },
      { q: "What tense is: 'They are eating'?", o: ["Present Continuous", "Simple Past", "Future"], a: 0 }
    ]
  }
};

// ===== STATE =====
let currentSubject = 'maths';
let questionPool = [];
let currentQuestionIndex = 0;
let score = 0;
let isAnswered = false;

// ===== SETUP UI METHODS =====
function setSubject(sub) {
  currentSubject = sub;
  document.getElementById("btn-maths").classList.remove("active");
  document.getElementById("btn-english").classList.remove("active");
  document.getElementById("btn-" + sub).classList.add("active");
}

function startQuiz() {
  const selectedClass = document.getElementById("class-select").value;
  let rawQuestions = quizData[currentSubject][selectedClass];
  
  if (!rawQuestions || rawQuestions.length === 0) {
    alert("Sorry, no questions available for this category yet!");
    return;
  }
  
  // Shuffle array and pick all questions (up to 5 for quick games)
  questionPool = [...rawQuestions].sort(() => Math.random() - 0.5);
  
  currentQuestionIndex = 0;
  score = 0;
  
  document.getElementById("quiz-setup").style.display = "none";
  document.getElementById("quiz-area").style.display = "block";
  document.getElementById("q-total").innerText = questionPool.length;
  
  loadNextQuestion();
}

// ===== QUIZ LOGIC =====
function loadNextQuestion() {
  isAnswered = false;
  document.getElementById("feedback").innerText = "";
  
  const qData = questionPool[currentQuestionIndex];
  document.getElementById("question-text").innerText = qData.q;
  document.getElementById("q-num").innerText = (currentQuestionIndex + 1);
  
  // Update progress bar
  const progressPercent = (currentQuestionIndex / questionPool.length) * 100;
  document.getElementById("progress-bar").style.width = progressPercent + "%";
  
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  
  // Generate options
  qData.o.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(index, btn);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selectedIndex, btnElement) {
  if (isAnswered) return; // Prevent multiple clicks
  isAnswered = true;
  
  const qData = questionPool[currentQuestionIndex];
  const allButtons = document.getElementById("options").getElementsByTagName("button");
  
  if (selectedIndex === qData.a) {
    // Correct!
    btnElement.classList.add("correct");
    document.getElementById("feedback").innerText = "✅ Excellent! Great job!";
    document.getElementById("feedback").style.color = "var(--green)";
    score++;
  } else {
    // Wrong
    btnElement.classList.add("wrong");
    allButtons[qData.a].classList.add("correct"); // Highlight the correct one
    document.getElementById("feedback").innerText = "❌ Oops! Better luck next time!";
    document.getElementById("feedback").style.color = "var(--red)";
  }
  
  // Wait 1.5 seconds, then load next question or finish
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questionPool.length) {
      loadNextQuestion();
    } else {
      showResults();
    }
  }, 1500);
}

function showResults() {
  document.getElementById("quiz-area").style.display = "none";
  document.getElementById("result-area").style.display = "block";
  
  document.getElementById("final-score").innerText = score + " / " + questionPool.length;
  document.getElementById("progress-bar").style.width = "100%"; // set full at end
  
  const percentage = (score / questionPool.length) * 100;
  const msgEl = document.getElementById("score-message");
  
  if (percentage >= 70) {
    msgEl.innerText = "🌟 Great job! You are a superstar! 🌟";
    msgEl.style.color = "var(--green)";
  } else if (percentage >= 40) {
    msgEl.innerText = "Good try! Keep practicing! 👍";
    msgEl.style.color = "var(--orange)";
  } else {
    msgEl.innerText = "Don't worry, try again! You can do it! 💪";
    msgEl.style.color = "var(--red)";
  }
}