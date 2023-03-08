export default class Apple {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  setRandomApplePosition(countOfCellsX, countOfCellsY, getRandonNumber, cellSize) {
    this.x = getRandonNumber(0, countOfCellsX) * cellSize;
	  this.y = getRandonNumber(0, countOfCellsY) * cellSize;
  }
  
  draw(context, color) {
    context.fillStyle = color;
    context.fillRect(this.x, this.y, this.size, this.size);
  }
}