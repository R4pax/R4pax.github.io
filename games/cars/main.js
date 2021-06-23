const score = document.querySelector(".score"),
  start = document.querySelector(".start"),
  gameArea = document.querySelector(".gameArea"),
  car = document.createElement("div");

car.classList.add("car");

start.addEventListener("click", startGame);
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

const settings = {
  start: false,
  score: 0,
  speed: 3,
  traffic: 2,
};

function getQuantityElements(heightElement) {
  return document.documentElement.clientHeight / heightElement + 1;
}

function startGame() {
  start.classList.add("hide");
  for (let i = 0; i < getQuantityElements(100); i++) {
    const line = document.createElement("div");
    line.classList.add("line");
    line.style.top = i * 100 + "px";
    line.y = i * 100;
    gameArea.appendChild(line);
  }

  for (let i = 0; i < getQuantityElements(100 * settings.traffic); i++) {
    const enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.classList.add("type" + (1 + Number(Math.random() > 0.5)));
    enemy.y = -100 * settings.traffic * (i + 1);
    enemy.style.top = enemy.y + "px";
    enemy.style.left =
      Math.floor(Math.random() * (gameArea.offsetWidth - car.offsetWidth)) +
      "px";
    gameArea.appendChild(enemy);
  }
  settings.start = true;
  gameArea.appendChild(car);
  settings.x = car.offsetLeft;
  settings.y = car.offsetTop;
  requestAnimationFrame(playGame);
}

function playGame() {
  if (!settings.start) return;

  moveRoad();
  moveEnemy();
  if (keys.ArrowLeft && settings.x > 0) settings.x -= settings.speed;
  if (keys.ArrowRight && settings.x < gameArea.offsetWidth - car.offsetWidth)
    settings.x += settings.speed;
  if (
    keys.ArrowDown &&
    settings.y < gameArea.offsetHeight - car.offsetHeight - 10
  )
    settings.y += settings.speed;
  if (keys.ArrowUp && settings.y > 0) settings.y -= settings.speed;

  car.style.left = settings.x + "px";
  car.style.top = settings.y + "px";
  requestAnimationFrame(playGame);
}

function keyDown(e) {
  if (keys.hasOwnProperty(e.key)) {
    e.preventDefault();
    if (e.key == "ArrowLeft") car.classList.add("turn-left");
    if (e.key == "ArrowRight") car.classList.add("turn-right");
    keys[e.key] = true;
  }
}

function keyUp(e) {
  if (keys.hasOwnProperty(e.key)) {
    e.preventDefault();
    if (e.key == "ArrowLeft") car.classList.remove("turn-left");
    if (e.key == "ArrowRight") car.classList.remove("turn-right");
    keys[e.key] = false;
  }
}

function moveRoad() {
  let lines = document.querySelectorAll(".line");
  lines.forEach((line) => {
    line.y += settings.speed;
    if (line.y > gameArea.offsetHeight) line.y = -100;
    line.style.top = line.y + "px";
  });
}

function moveEnemy() {
  let enemies = document.querySelectorAll(".enemy");
  enemies.forEach((enemy) => {
    enemy.y += settings.speed / 2;
    if (enemy.y > gameArea.offsetHeight) {
      enemy.y = -100 * settings.traffic;
      enemy.style.left =
        Math.floor(Math.random() * (gameArea.offsetWidth - car.offsetWidth)) +
        "px";
    }
    enemy.style.top = enemy.y + "px";
  });
}
