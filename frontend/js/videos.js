let videos = {
  maths: {
    1: [
      {
        title: "Numbers 1 to 10",
        url: "https://www.youtube.com/embed/tIDQyyG0S6E",
        summary: "Learn counting from 1 to 10 using fun visuals."
      },
      {
        title: "Addition Basics",
        url: "https://www.youtube.com/embed/QfVMqur4L1U",
        summary: "Simple addition using objects and examples."
      }
    ],

    2: [
      {
        title: "Subtraction for Kids",
        url: "https://www.youtube.com/embed/8l1gV7uQw8A",
        summary: "Learn subtraction in a simple and fun way."
      }
    ]
  },

  english: {
    basic: [
      {
        title: "Alphabet A-Z",
        url: "https://www.youtube.com/embed/75p-N9YKqNo",
        summary: "Learn all alphabets with pronunciation."
      },
      {
        title: "Phonics Sounds",
        url: "https://www.youtube.com/embed/BELlZKpi1Zs",
        summary: "Understand letter sounds easily."
      }
    ]
  }
};

function loadVideo(subject, level) {
  let list;

  if (subject === "maths") {
    list = videos.maths[level];
  } else {
    list = videos.english.basic;
  }

  let html = "";

  list.forEach(v => {
    html += `
      <div class="video-card">
        <h3>${v.title}</h3>
        <iframe src="${v.url}" allowfullscreen></iframe>

        <div class="summary-box">
          <p>${v.summary}</p>

          <button onclick="speak('${v.summary}')">
            🔊 Listen
          </button>
        </div>
      </div>
    `;
  });

  document.getElementById("videoContainer").innerHTML = html;
}
function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.rate = 0.9;
  speech.pitch = 1;
  speech.lang = "en-US";

  window.speechSynthesis.speak(speech);
}