export default class Score {
  _scoreCount: number;
  _score: HTMLElement;

  constructor() {
    this._scoreCount = 0;
    this._score = document.querySelector('.score__count');
  }

  _displayScore() {
    this._score.innerHTML = this._scoreCount.toString();
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
