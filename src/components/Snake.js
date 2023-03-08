export default class Snake {
  constructor(x, y, dx, dy, headColor, color, { eatApple }) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.direction = 'right';
    this.headColor = headColor;
    this.color = color;
    this._eatApple = eatApple;
    this.body = [];
    this.maxLength = 1;
  }

  _moveThroughBorder(field, cellSize) {
    if (this.x < 0) {
      this.x = field.width - cellSize;
    } else if ( this.x >= field.width ) {
      this.x = 0;
    }
  
    if (this.y < 0) {
      this.y = field.height - cellSize;
    } else if ( this.y >= field.height ) {
      this.y = 0;
    }
  }

  draw(field, cellSize, context, restart) {
    this.x += this.dx;
    this.y += this.dy;
  
    this._moveThroughBorder(field, cellSize);
  
    this.body.unshift({ 
      x: this.x, 
      y: this.y 
    });
  
    if (this.body.length > this.maxLength) {
      this.body.pop();
    }
  
    this.body.forEach((el, i) => {
      context.beginPath();
      context.lineWidth = "1";
      context.strokeStyle = '#000';
      if (i === 0) {
        context.fillStyle = this.headColor;
      } else {
        context.fillStyle = this.color;
      }
      context.roundRect(el.x, el.y, cellSize, cellSize, [5]);
      context.fill();
      context.stroke();
  
      this._eatApple(el);
  
      for (let j = i + 1; j < this.body.length; j++) {
        if (el.x === this.body[j].x && el.y === this.body[j].y) {
          restart();
        }
      }
    });
  }

  _defineDirection(cellSize) {
    if (this.dx === 0 && this.dy === -cellSize) {
      this.direction = 'up';
    } else if (this.dx === -cellSize && this.dy === 0) {
      this.direction = 'left';
    } else if (this.dx === 0 && this.dy === cellSize) {
      this.direction = 'down';
    } else if (this.dx === cellSize && this.dy === 0) {
      this.direction = 'right';
    }
  }

  control(cellSize) {
    document.addEventListener('keydown', (evt) => {
      this._defineDirection(cellSize);
      if (evt.key === 'ArrowUp' && this.direction !== 'down') {
        this.dx = 0;
        this.dy = -cellSize;
      } else if (evt.key === 'ArrowLeft' && this.direction !== 'right') {
        this.dx = -cellSize;
        this.dy = 0;
      } else if (evt.key === 'ArrowDown' && this.direction !== 'up') {
        this.dx = 0;
        this.dy = cellSize;
      } else if (evt.key === 'ArrowRight' && this.direction !== 'left') {
        this.dx = cellSize;
        this.dy = 0;
      }
    });
  }

  reset(dx) {
    this.x = 0;
    this.y = 100;
    this.body = [];
    this.maxLength = 1;
    this.dx = dx;
    this.dy = 0;
  }
}