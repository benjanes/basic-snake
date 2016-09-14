import Segment from './Segment';
import { WIDTH, HEIGHT } from '../constants';

export default class Snake {
  constructor(x, y, length) {
    this.length = length;
    this.head = null;
    this.tail = null;

    this.initSnake(x, y);
  }

  initSnake(x, y) {
    for (let i = this.length; i > 0; i--) {
      this.addSegment(x + i, y);
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

  moveSnake(dir, foodLoc) {
    var collision, isEating;
    var x = this.head.x;
    var y = this.head.y;

    if (dir === 'LEFT') {
      x -= 1;
    } else if (dir === 'RIGHT') {
      x += 1;
    } else if (dir === 'UP') {
      y -= 1;
    } else if (dir === 'DOWN') {
      y += 1;
    }

    isEating = false;
    if (foodLoc.x === x && foodLoc.y === y) isEating = true;
    
    collision = this.detectCollision(x, y);
    if (x < 0 || y < 0 || x >= WIDTH || y >= HEIGHT) {
      collision = true;
    }

    if (collision) {
      return { collision, isEating };
    }

    this.addSegment(x, y);
    if (!isEating) this.removeSegment();
    
    return { collision, isEating };
  }

  detectCollision(x, y) {
    var collisionDetected = false;
    this.traverseSnake((segX, segY) => { if (segX === x && segY === y) collisionDetected = true });
    return collisionDetected;
  }

}