const quotes = [
  "Keep learning – every day you grow a little smarter! 🌟",
  "Practice makes perfect. Never give up! 💪",
  "You are brighter than you think! 💡",
  "Reading opens the door to every dream! 📚",
  "Small steps every day lead to big success! 🚀",
  "Be curious – questions are the seeds of knowledge! 🌱",
  "Mistakes help you learn – be brave and try! 🦁",
  "Smart kids ask 'Why?' – keep asking! 🤔",
  "Your brain grows every time you study! 🧠",
  "Today's effort is tomorrow's reward! ⭐",
  "Believe in yourself and you are halfway there! 🏆",
  "Learning is the greatest adventure! 🗺️"
];
 
// Pick a quote based on today's date (changes daily)
const today = new Date();
const dayIndex = today.getDate() % quotes.length;
 
const quoteEl = document.getElementById("dailyQuote");
if (quoteEl) {
  quoteEl.innerText = quotes[dayIndex];
}