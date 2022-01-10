const startBtn = document.querySelector('.start');
const screens = document.querySelectorAll('.screen');
const timeBtnsList = document.querySelector('.time-list');
const board = document.querySelector('#board');
const timeElement = document.querySelector('#time');
const colors = ['#32CD32', '#FF1493', '#20B2AA', '#FF8C00', 'MediumSlateBlue', '#800080', '#B8860B', '#DAA520']
let time = 0;
let score = 0;

startBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  screens[0].classList.add('up');
});
timeBtnsList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('time-btn')) {
    time = parseInt(evt.target.getAttribute('data-time'), 10);
    screens[1].classList.add('up');
    startGame();
  }
});
board.addEventListener('click', evt => {
  if (evt.target.classList.contains('circle')) {
    score++;
    evt.target.remove();
    createRandomCircle();
  }
})
function startGame() {
  setInterval(decreaseTime, 1000);
  setTime(time);
  createRandomCircle();
}

function decreaseTime() {
  if (time === 0) {
    endGame();
  } else {
    let currentTime = --time;
    if (currentTime < 10) {
      currentTime = `0${currentTime}`;
    }
    setTime(currentTime);
  }
}

function setTime(value) {
  timeElement.innerHTML = `00:${value}`;
}

function createRandomCircle() {
  const circle = document.createElement('div');
  let size = getRandomNumber(10, 50);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  let randomColor = getRandomColor();
  circle.style.background = randomColor;
  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}


function endGame() {
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`;
  timeElement.parentNode.classList.add('hide');
}
