const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
let time = 0;
let score = 0;
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const colors = [
  "#b19cd9",
  "#96d38c",
  "#e8a889",
  "#7ca7d1",
  "#cfbd96",
  "#8aa6a6",
  "#db8d67",
  "#71989a",
  "#d8c3a5",
  "#78898b",
  "#baa5b3",
  "#a3c6c0",
  "#d7b8a3",
  "#94a1b2",
  "#c2b09a",
  "#a6abb2",
  "#d2c7b0",
  "#9aa4ac",
  "#c3b6a2",
];

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.remove();
  board.innerHTML = `<h1>Счет: <span class='primary'>${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");

  const size = getRandomeNumber(10, 60);

  const { width, height } = board.getBoundingClientRect();
  const x = getRandomeNumber(0, width - size);
  const y = getRandomeNumber(0, height - size);

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;

  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  const color = getRandomColor();
  circle.style.background = color;

  board.append(circle);
}

function getRandomeNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
