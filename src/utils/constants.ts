export const gameField = document.querySelector(
  '.game__field'
) as HTMLCanvasElement;
export const context = gameField.getContext('2d');
export const restartButton = document.querySelector('.restart');

export const settings = {
  step: 0,
  maxStep: 12,
  cellSize: 20,
};

export const countOfCellsX = gameField.width / settings.cellSize;
export const countOfCellsY = gameField.width / settings.cellSize;

export const pauseButton = document.querySelector('.pause');

export const buttonUp = document.querySelector('.direction-button_type_up');
export const buttonLeft = document.querySelector('.direction-button_type_left');
export const buttonRight = document.querySelector('.direction-button_type_right');
export const buttonDown = document.querySelector('.direction-button_type_down');