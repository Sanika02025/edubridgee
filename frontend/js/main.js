// main.js
function go(page){
  window.location.href = page;
}

const quotes = [
  "Keep learning 🌟",
  "Practice daily 📚",
  "You are smart 💡"
];

document.getElementById("quote").innerText =
  quotes[new Date().getDate() % quotes.length];