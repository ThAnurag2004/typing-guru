const para = document.querySelector('.paragraph');
const text = para.textContent;
let i = 0;
let wrong = 0;
let startTime;
let endTime;
let typingStarted = false;


window.addEventListener('keydown', (e) => {
    const key = e.code;
    const button = document.getElementById(key);
    if (button) {
        button.style.backgroundColor = "yellow";
    }
});

window.addEventListener('keyup', (e) => {
    const key = e.code;
    const button = document.getElementById(key);
    if (button) {
        button.style.backgroundColor = "white";
    }
});


// Wrap each character in span
para.innerHTML = text
  .split('')
  .map(char => `<span>${char}</span>`)
  .join('');

const spans = document.querySelectorAll('.paragraph span');
spans[i].classList.add('active');

window.addEventListener('keydown', (e) => {
  if (!typingStarted) {
    startTime = Date.now();
    typingStarted = true;
  }

  if (i >= text.length) return;

  const character = text.charAt(i);
  const pressedKey = e.key;

  if (pressedKey === character) {
    spans[i].classList.remove('active');
    spans[i].classList.add('correct');
    i++;

    if (i < spans.length) {
      spans[i].classList.add('active');
    }

    if (i === text.length) {
      endTime = Date.now();
      const timeInMinutes = (endTime - startTime) / 1000 / 60;
      const totalCharactersTyped = text.length;
      const wpm = (totalCharactersTyped / 5) / timeInMinutes;
      const accuracy = ((totalCharactersTyped - wrong) / totalCharactersTyped) * 100;

      document.querySelector('.textarea').style.display = 'none';
      document.querySelector('.result').style.display = 'block';
      document.getElementById('wpm').textContent = Math.round(wpm);
      document.getElementById('accuracy').textContent = Math.round(accuracy);
      document.getElementById('wrong').textContent = wrong;
      document.querySelector('.keyboard').style.display = 'none';
      const button = document.getElementById('refreshBtn')
      button.addEventListener('click', ()=>{
        location.reload(); //refreshing page
      })
    }

  } else {
    wrong += 1;
    spans[i].classList.add('wrong');
    setTimeout(() => {
      spans[i].classList.remove('wrong');
    }, 200);
  }
});
