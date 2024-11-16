const textdisplay = document.getElementById('text-display');
const textinput = document.getElementById('text-input');
const m_text = 'https://api.quotable.io/random'; 
const time = document.getElementById('timer');
const score = document.getElementById('score');
let correct=0;
let incorret=0;


textinput.addEventListener('input', () => {
  const arr1 = textdisplay.querySelectorAll('span'); // Use querySelectorAll for all spans
  const arr2 = textinput.value.split('');
  let flag = true;

  arr1.forEach((charspan, index) => {
    const char = arr2[index];
    if (char == null) {
      charspan.classList.remove('correct', 'incorrect'); 
      flag = false;
    } else if (char === charspan.innerText) {
      charspan.classList.add('correct');
      charspan.classList.remove('incorrect');
      correct++;
    } else {
      charspan.classList.add('incorrect');
      charspan.classList.remove('correct');
      incorret++;
      flag = false;
    }
  });

  if (flag) {
    getnext(); 
  }
});

function getrandom() {
  return fetch(m_text)
    .then(response => response.json())
    .then(data => data.content);
}

async function getnext() {
  const text = await getrandom();
  textdisplay.innerHTML = ''; // Clear previous text
  text.split('').forEach(character => {
    const charspan = document.createElement('span');
    charspan.innerText = character;
    textdisplay.appendChild(charspan);
  });

  // Clear the input text when new text is fetched
  textinput.value = ''; 

  clock(); // Start the timer
}

let start;
function clock() {
  time.innerText = 0;
  start = new Date();
  setInterval(() => {
    gettime();
  }, 1000);
}

function gettime() {
  time.innerText = Math.floor((new Date() - start) / 1000);
  if(time==6){
    clock()
  }
}
function scored() {
  
}

getnext();
