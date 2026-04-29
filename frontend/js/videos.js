// ================= DATA =================
const videoData = {
  maths: {
    "Class 1": {
      "Numbers": [
        {
          title: "Counting 1-10",
          file: "videos/numbers.mp4",
          summary: "Learn counting from 1 to 10"
        }
      ],
      "Addition": [
        {
          title: "Basic Addition",
          file: "videos/addition.mp4",
          summary: "Simple addition concept"
        }
      ]
    }
  },

  english: {
    "Basics": {
      "Alphabets": [
        {
          title: "A to Z",
          file: "videos/alphabets.mp4",
          summary: "Learn alphabets A-Z"
        }
      ]
    }
  }
};

// ================= STATE =================
let subject = "";
let category = "";

// ================= NAVIGATION =================
function showStep(n){
  document.getElementById("step1").style.display = n===1?"block":"none";
  document.getElementById("step2").style.display = n===2?"block":"none";
  document.getElementById("step3").style.display = n===3?"block":"none";
  document.getElementById("step4").style.display = n===4?"block":"none";
}

function goBack(step){
  showStep(step);
}

// ================= STEP 1 =================
function selectSubject(sub){
  subject = sub;

  let html = "";
  Object.keys(videoData[sub]).forEach(c=>{
    html += `<button onclick="selectCategory('${c}')" class="topic-btn">${c}</button>`;
  });

  document.getElementById("categories").innerHTML = html;
  showStep(2);
}

// ================= STEP 2 =================
function selectCategory(cat){
  category = cat;

  let html = "";
  Object.keys(videoData[subject][cat]).forEach(t=>{
    html += `<button onclick="selectTopic('${t}')" class="topic-btn">${t}</button>`;
  });

  document.getElementById("topics").innerHTML = html;
  showStep(3);
}

// ================= STEP 3 =================
function selectTopic(topic){

  const list = videoData[subject][category][topic];
  let html = "";

  list.forEach(v=>{

    html += `
      <div class="video-card">

        <h3>${v.title}</h3>

        <!-- LOCAL VIDEO -->
        <video controls>
          <source src="${v.file}" type="video/mp4">
          Your browser does not support the video tag.
        </video>

        <div class="summary-box">
          <p>${v.summary}</p>
          <button class="listen-btn" onclick="speak('${v.summary.replace(/'/g, "&#39;")}')">🔊 Listen</button>
        </div>

      </div>
    `;
  });

  document.getElementById("videos").innerHTML = html;
  showStep(4);
}

// ================= SPEECH =================
function speak(text){
  speechSynthesis.cancel();
  let msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-IN";
  speechSynthesis.speak(msg);
}