import Segment from './Segment';

export default class Snake {
  constructor(x, y, length) {
    this.length = length;
    this.head = null;
    this.tail = null;

    initSnake(x, y);
  }

  initSnake(x, y) {
    for (let i = this.length; i > 0; i--) {
      addSegment(x + i, y);
    }
  }

  addSegment(x, y) {
    let newSegment = new Segment(x, y);

    if (this.head) {
      this.head.prev = newSegment;
      newSegment.next = this.head;
      this.head = newSegment;
    } else {
      this.head = this.tail = newSegment;
    }
  }

  removeSegment() {
    if (this.tail) {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
  }

  traverseSnake(callback) {
    let currSegment = this.head;

    while (currSegment) {
      callback(currSegment.x, currSegment.y);
      currSegment = currSegment.next;
    }
  }

}