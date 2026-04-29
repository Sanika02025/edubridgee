// ========== gk.js ==========
// GK flip cards with randomisation and SpeechSynthesis
 
// ===== GK DATA =====
// Each card has: question, answer, image URL, and audio text
const gkCards = [
  {
    question: "What is the national animal of India?",
    answer: "🐯 Tiger",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Tiger_in_Ranthambhore.jpg/320px-Tiger_in_Ranthambhore.jpg",
    audio: "The national animal of India is the Tiger."
  },
  {
    question: "Which planet is closest to the Sun?",
    answer: "☀️ Mercury",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/320px-Mercury_in_true_color.jpg",
    audio: "Mercury is the closest planet to the Sun."
  },
  {
    question: "How many days are in a week?",
    answer: "📅 7 days",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Calendar_icon.png/120px-Calendar_icon.png",
    audio: "There are 7 days in a week."
  },
  {
    question: "What colour is the sky on a clear day?",
    answer: "🔵 Blue",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Partly_cloudy_skies_over_Ellsworth_Air_Force_Base.jpg/320px-Partly_cloudy_skies_over_Ellsworth_Air_Force_Base.jpg",
    audio: "The sky looks blue on a clear sunny day."
  },
  {
    question: "Which is the largest ocean in the world?",
    answer: "🌊 Pacific Ocean",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Pacific_Ocean_-_en.png/320px-Pacific_Ocean_-_en.png",
    audio: "The Pacific Ocean is the largest ocean in the world."
  },
  {
    question: "What is the capital of India?",
    answer: "🏛️ New Delhi",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/India_Gate_in_New_Delhi_03-2016.jpg/320px-India_Gate_in_New_Delhi_03-2016.jpg",
    audio: "New Delhi is the capital city of India."
  },
  {
    question: "How many colours are in a rainbow?",
    answer: "🌈 7 colours",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Double-alaskan-rainbow.jpg/320px-Double-alaskan-rainbow.jpg",
    audio: "A rainbow has 7 beautiful colours."
  },
  {
    question: "Which animal is called the King of the Jungle?",
    answer: "🦁 Lion",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/320px-Lion_waiting_in_Namibia.jpg",
    audio: "The Lion is called the King of the Jungle."
  },
  {
    question: "How many sides does a triangle have?",
    answer: "📐 3 sides",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Colored_triangle.png/240px-Colored_triangle.png",
    audio: "A triangle has 3 sides."
  },
  {
    question: "Which fruit is yellow and curved?",
    answer: "🍌 Banana",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Chocolate-Chip-Cookies-Recipe.jpg/320px-Banana-Chocolate-Chip-Cookies-Recipe.jpg",
    audio: "A banana is yellow and curved."
  },
  {
    question: "What is the national bird of India?",
    answer: "🦚 Peacock",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Burung_merak.jpg/320px-Burung_merak.jpg",
    audio: "The Peacock is the national bird of India."
  },
  {
    question: "How many letters are in the English alphabet?",
    answer: "🔤 26 letters",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Alphabet_blocks.jpg/320px-Alphabet_blocks.jpg",
    audio: "There are 26 letters in the English alphabet."
  }
];
 
// ===== SHUFFLE FUNCTION (Fisher-Yates) =====
function shuffle(arr) {
  const a = [...arr]; // copy so we don't modify original
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
 
// ===== SPEECH SYNTHESIS =====
function speakGK(text, event) {
  event.stopPropagation(); // don't trigger card flip
  window.speechSynthesis.cancel();
 
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-IN";
  utterance.rate = 0.85;
  utterance.pitch = 1.1;
  window.speechSynthesis.speak(utterance);
}
 
// ===== FLIP TOGGLE =====
function toggleFlip(cardEl) {
  cardEl.classList.toggle("flipped");
}
 
// ===== BUILD CARDS =====
function buildCards() {
  const container = document.getElementById("gk-container");
  container.innerHTML = ""; // clear before building
 
  const shuffled = shuffle(gkCards);
 
  shuffled.forEach(card => {
    // Create outer flip container
    const flipCard = document.createElement("div");
    flipCard.className = "flip-card";
    flipCard.onclick = function () { toggleFlip(this); };
 
    // Inner container (holds front + back)
    const inner = document.createElement("div");
    inner.className = "flip-card-inner";
 
    // ---- FRONT ----
    const front = document.createElement("div");
    front.className = "flip-card-front";
    front.innerHTML = `
      <img src="${card.image}" alt="GK image" onerror="this.src='https://via.placeholder.com/70x70?text=📚'">
      <p>${card.question}</p>
      <p style="font-size:12px; color:#aaa; margin-top:6px;">👆 Tap to flip!</p>
    `;
 
    // ---- BACK ----
    const back = document.createElement("div");
    back.className = "flip-card-back";
    back.innerHTML = `
      <p>${card.answer}</p>
      <p class="flip-hint">Tap again to flip back</p>
      <button class="card-audio-btn" onclick="speakGK('${card.audio.replace(/'/g, "&#39;")}', event)">
        🔊 Hear Answer
      </button>
    `;
 
    inner.appendChild(front);
    inner.appendChild(back);
    flipCard.appendChild(inner);
    container.appendChild(flipCard);
  });
}
 
// ===== INITIALISE =====
buildCards();