const data = {
  math1: [
    {q:"2+2?", o:["3","4","5"], a:1},
    {q:"3+1?", o:["4","5","6"], a:0}
  ],
  eng1: [
    {q:"A for?", o:["Apple","Ball"], a:0}
  ]
};

let current = [];

function loadQuiz(topic){
  current = [...data[topic]].sort(()=>Math.random()-0.5);
  show();
}

function show(){
  const q = current[0];
  document.getElementById("q").innerText = q.q;

  let html="";
  q.o.forEach((opt,i)=>{
    html += `<button onclick="check(${i})">${opt}</button><br>`;
  });

  document.getElementById("options").innerHTML = html;
}

function check(i){
  alert(i === current[0].a ? "Correct!" : "Wrong!");
  current.shift(); // removes used question → no repeat
  if(current.length) show();
}