import './index.css';
import { generateRandomNumber } from '../utils/utils';
import Apple from '../components/Apple';
import Snake from '../components/Snake';
import Score from '../components/Score';
import {
  gameField,
  context,
  restartButton,
  settings,
  countOfCellsX,
  countOfCellsY,
} from '../utils/constants';

const score = new Score();
const apple = new Apple(200, 200, settings.cellSize);
const snake = new Snake(0, 100, settings.cellSize, 0, '#50C878', {
  eatApple: (el) => {
    if (el.x === apple.x && el.y === apple.y) {
      snake.maxLength++;
      score.plusScore();
      apple.setRandomApplePosition(
        countOfCellsX,
        countOfCellsY,
        generateRandomNumber,
        settings.cellSize
      );
    }
  },
});

snake.control(settings.cellSize);

restartButton.addEventListener('click', () => {
  restart();
});

function restart() {
  score.resetScore();

  snake.reset(settings.cellSize);

  apple.setRandomApplePosition(
    countOfCellsX,
    countOfCellsY,
    generateRandomNumber,
    settings.cellSize
  );
}

function game() {
  requestAnimationFrame(game);
  if (++settings.step < settings.maxStep) {
    return;
  }
  settings.step = 0;

  context.clearRect(0, 0, gameField.width, gameField.height);

  apple.draw(context, '#ff5555');
  snake.draw(gameField, settings.cellSize, context, restart);
}

game();
