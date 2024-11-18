const textdisplay = document.getElementById('text-display');
const textinput = document.getElementById('text-input');
const m_text = 'https://api.quotable.io/random'; 
const time = document.getElementById('timer');
const score = document.getElementById('score');
let timecurr = 0;
let correct = 0;
let incorrect = 0;

textinput.addEventListener('input', () => {
  const arr1 = textdisplay.querySelectorAll('span');
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
      incorrect++; 
      flag = false;
    }
  });

  if (flag) {
    getnext(); 
  }
});

async function getrandom() {
  const quotes = [
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Do not wait to strike till the iron is hot, but make it hot by striking.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "I didnt come this far to only come this far",
    "When the days are dark night are cold,the winter has arrived get ready because the wall is breaking",
    "the horrors of the nights says it all , you can see it without watching you can feel it without feeling ,says you know nothing john snow"
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}


async function getnext() {
  const text = await getrandom();
  textdisplay.innerHTML = '';
  text.split('').forEach(character => {
    const charspan = document.createElement('span');
    charspan.innerText = character;
    textdisplay.appendChild(charspan);
  });

  textinput.value = ''; 

  clock(); 
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
  timecurr = time.innerText;

  if (timecurr == 61) {
    clock(); 
  }
}

function scored() {
  return correct - incorrect;
}

async function scoredisplay() {
  const currentScore = scored();
  score.innerText = currentScore;
}


scoredisplay();
getnext();
