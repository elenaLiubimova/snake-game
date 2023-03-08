export default class Snake {
  constructor(x, y, dx, dy, color, { eatApple }) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
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
      context.fillStyle = this.color;
      context.fillRect(el.x, el.y, cellSize, cellSize);
  
      this._eatApple(el);
  
      for (let j = i + 1; j < this.body.length; j++) {
        if (el.x === this.body[j].x && el.y === this.body[j].y) {
          restart();
        }
      }
    });
  }

  control(cellSize) {
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'ArrowUp') {
        this.dx = 0;
        this.dy = -cellSize;
      } else if (evt.key === 'ArrowLeft') {
        this.dx = -cellSize;
        this.dy = 0;
      } else if (evt.key === 'ArrowDown') {
        this.dx = 0;
        this.dy = cellSize;
      } else if (evt.key === 'ArrowRight') {
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