import { BodyElement } from "../types/types";
import { buttonDown, buttonLeft, buttonRight, buttonUp } from "../utils/constants";

export default class Snake {
  _x: number;
  _y: number;
  _dx: number;
  _dy: number;
  _direction: string;
  _headColor: string;
  _color: string;
  _eatApple: (el: BodyElement) => void;
  _body: BodyElement[];
  maxLength: number;

  constructor(
    x: number,
    y: number,
    dx: number,
    dy: number,
    headColor: string,
    color: string,
    { eatApple }
  ) {
    this._x = x;
    this._y = y;
    this._dx = dx;
    this._dy = dy;
    this._direction = 'right';
    this._headColor = headColor;
    this._color = color;
    this._eatApple = eatApple;
    this._body = [];
    this.maxLength = 1;
  }

  // метод для движения змейки через границы поля
  _moveThroughBorder(field: HTMLCanvasElement, cellSize: number) {
    if (this._x < 0) {
      this._x = field.width - cellSize;
    } else if (this._x >= field.width) {
      this._x = 0;
    }

    if (this._y < 0) {
      this._y = field.height - cellSize;
    } else if (this._y >= field.height) {
      this._y = 0;
    }
  }

  // метод отрисовки змейки
  draw(field: HTMLCanvasElement, cellSize: number, context: CanvasRenderingContext2D, restart: () => void) {
    this._x += this._dx;
    this._y += this._dy;

    this._moveThroughBorder(field, cellSize);

    this._body.unshift({
      x: this._x,
      y: this._y,
    });

    //проверка на то, чтобы змейка отрисовывалась не длиннее ее текущей длины
    if (this._body.length > this.maxLength) {
      this._body.pop();
    }

    //непосредственно отрисовка
    this._body.forEach((el, i) => {
      context.beginPath();
      context.lineWidth = 1;
      context.strokeStyle = '#000';
      if (i === 0) {
        context.fillStyle = this._headColor;
      } else {
        context.fillStyle = this._color;
      }
      context.roundRect(el.x, el.y, cellSize, cellSize, [5]);
      context.fill();
      context.stroke();

      this._eatApple(el);

      //случай "крушения" змейки
      for (let j = i + 1; j < this._body.length; j++) {
        if (el.x === this._body[j].x && el.y === this._body[j].y) {
          restart();
        }
      }
    });
  }

  // метод определения текущего направления движения
  _defineDirection(cellSize: number) {
    if (this._dx === 0 && this._dy === -cellSize) {
      this._direction = 'up';
    } else if (this._dx === -cellSize && this._dy === 0) {
      this._direction = 'left';
    } else if (this._dx === 0 && this._dy === cellSize) {
      this._direction = 'down';
    } else if (this._dx === cellSize && this._dy === 0) {
      this._direction = 'right';
    }
  }

  // метод управления змейкой
  control(evtType, cellSize: number) {
    document.addEventListener(evtType, (evt) => {
      this._defineDirection(cellSize);
      if ((evt.key === 'ArrowUp' || evt.target === buttonUp) && this._direction !== 'down') {
        this._dx = 0;
        this._dy = -cellSize;
      } else if ((evt.key === 'ArrowLeft' || evt.target === buttonLeft) && this._direction !== 'right') {
        this._dx = -cellSize;
        this._dy = 0;
      } else if ((evt.key === 'ArrowDown'  || evt.target === buttonDown) && this._direction !== 'up') {
        this._dx = 0;
        this._dy = cellSize;
      } else if ((evt.key === 'ArrowRight' || evt.target === buttonRight) && this._direction !== 'left') {
        this._dx = cellSize;
        this._dy = 0;
      }
    });
  }

  // сброс параметров змейки в начальное состояние
  reset(dx: number) {
    this._x = 0;
    this._y = 100;
    this._body = [];
    this.maxLength = 1;
    this._dx = dx;
    this._dy = 0;
  }
}
