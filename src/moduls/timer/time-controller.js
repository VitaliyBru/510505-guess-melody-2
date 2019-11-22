export class TimeController {
  constructor(timeLeft, callBack) {
    this.timeLeft = timeLeft;
    this.callBack = callBack;
  }

  runStep() {
    this.timeLeft--;
    if (this.timeLeft <= 0) {
      this.callBack();
      return 0;
    }
    return this.timeLeft;
  }
}
