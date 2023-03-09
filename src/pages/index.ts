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
  pauseButton,
} from '../utils/constants';
import { BodyElement } from '../types/types';

//переменная для запуска/остановки игрового цикла
let gameAnimationId = null; 

//экземпляр класса подсчета очков
const score = new Score();
//экземпляр класса яблока
const apple = new Apple(200, 200, settings.cellSize);
//экземпляр класса змейки
const snake = new Snake(0, 100, settings.cellSize, 0, '#45a063', '#50C878', {
  eatApple: (el: BodyElement) => {
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

//метод управления змейкой
snake.control(settings.cellSize); 

//слушатель кнопки рестарта
restartButton.addEventListener('click', () => {
  restart();
});

//функция рестарта
function restart() {
  score.resetScore(); //сбрасываем очки

  snake.reset(settings.cellSize); //устанавливаем длину змейки в начальное состояние

  //рисуем яблоко в рандомном месте поля
  apple.setRandomApplePosition(
    countOfCellsX,
    countOfCellsY,
    generateRandomNumber,
    settings.cellSize
  );
}

//рекурсивная функция игрового цикла
function game() {
  gameAnimationId = requestAnimationFrame(game);
  if (++settings.step < settings.maxStep) {
    return;
  }
  settings.step = 0;

  context.clearRect(0, 0, gameField.width, gameField.height);

  apple.draw(context, '#ff5555');
  snake.draw(gameField, settings.cellSize, context, restart);
}

game();

//слушатель кнопки паузы игры
pauseButton.addEventListener('click', () => {
  if (gameAnimationId !== null) {
    cancelAnimationFrame(gameAnimationId);
    gameAnimationId = null;
  } else {
    requestAnimationFrame(game);
  }
});
