export default class Score {
  constructor() {
    this._scoreCount = 0;
    this._score = document.querySelector('.score__count');
  }

  _displayScore() {
    this._score.innerHTML = this._scoreCount;
  }

  plusScore() {
    this._scoreCount++;
    this._displayScore();
  }

  resetScore() {
    this._scoreCount = 0;
    this._displayScore();
  }
}