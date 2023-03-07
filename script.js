const gameField = document.querySelector('.game__field');
const context = gameField.getContext('2d');
const score = document.querySelector('.score__count');
let scoreCount = 0;

const config = {
  step: 0,
  maxStep: 10,
  cellSize: 20,
};

const snake = {
  x: 0,
  y: 100,
  dx: config.cellSize,
  dy: 0,
  body: [],
  maxBody: 3,
};

let apple = {
  x: 200,
  y: 200,
};

document.addEventListener("keydown", function (evt) {
	if (evt.key === "ArrowUp") {
    snake.dy = -config.cellSize;
		snake.dx = 0;
	} else if (evt.key === "ArrowLeft") {
		snake.dx = -config.cellSize;
		snake.dy = 0;
	} else if (evt.key === "ArrowDown") {
    snake.dy = config.cellSize;
		snake.dx = 0;
	} else if (evt.key === "ArrowRight") {
		snake.dx = config.cellSize;
		snake.dy = 0;
	}
});

function displayScore() {
  score.innerHTML = scoreCount;
}

function plusScore() {
	scoreCount++;
  displayScore();
}

function moveThroughBorder() {
	if (snake.x < 0) {
		snake.x = gameField.width - config.cellSize;
	} else if ( snake.x >= gameField.width ) {
		snake.x = 0;
	}

	if (snake.y < 0) {
		snake.y = gameField.height - config.cellSize;
	} else if ( snake.y >= gameField.height ) {
		snake.y = 0;
	}
}

function generateRandomNumber(min, max) {
	return Math.floor(min + Math.random() * (max - min));
}

function setRandomApplePosition() {
  const countOfCellsX = gameField.width / config.cellSize;
  const countOfCellsY = gameField.width / config.cellSize;
  apple.x = generateRandomNumber(0, countOfCellsX) * config.cellSize;
	apple.y = generateRandomNumber(0, countOfCellsY) * config.cellSize;
}

function drawApple() {
  context.fillStyle = '#df4377';
  context.fillRect(apple.x, apple.y, config.cellSize, config.cellSize);
}

function reloadGame() {
	scoreCount = 0;
	displayScore();

	snake.x = 0;
	snake.y = 100;
	snake.body = [];
	snake.maxBody = 3;
	snake.dx = config.cellSize;
	snake.dy = 0;

	setRandomApplePosition();
}

function displaySnake() {
  snake.x += snake.dx;
  snake.y += snake.dy;

  moveThroughBorder();

  snake.body.unshift({ 
    x: snake.x, 
    y: snake.y 
  });

  if (snake.body.length > snake.maxBody) {
    snake.body.pop();
  }

  snake.body.forEach((el, i) => {
    context.fillStyle = '#50C878';
    context.fillRect(el.x, el.y, config.cellSize, config.cellSize);

    if (el.x === apple.x && el.y === apple.y) {
      snake.maxBody++;
      plusScore();
      setRandomApplePosition();
    }

    for (let j = i + 1; j < snake.body.length; j++) {
      if (el.x === snake.body[j].x && el.y === snake.body[j].y) {
        reloadGame();
      }
    }
  });
}

function gameLoop() {
  requestAnimationFrame(gameLoop);
  if (++config.step < config.maxStep) {
    return;
  }
  config.step = 0;

  context.clearRect(0, 0, gameField.width, gameField.height);

  drawApple();
  displaySnake();
}

// requestAnimationFrame(gameLoop);
gameLoop();