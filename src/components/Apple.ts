export default class Apple {
  x: number;
  y: number;
  _size: number;

  constructor(x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this._size = size;
  }

  setRandomApplePosition(
    countOfCellsX: number,
    countOfCellsY: number,
    getRandonNumber: (min: number, max: number) => number,
    cellSize: number
  ) {
    this.x = getRandonNumber(0, countOfCellsX) * cellSize;
    this.y = getRandonNumber(0, countOfCellsY) * cellSize;
  }

  draw(context: CanvasRenderingContext2D, color: string) {
    context.beginPath();
    context.fillStyle = color;
    context.roundRect(this.x, this.y, this._size, this._size, [5]);
    context.fill();
  }
}
