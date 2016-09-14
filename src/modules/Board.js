import Snake from './Snake';
import Food from './Food';
import { LENGTH, SPEED } from '../constants';

export default class Board {
  constructor(width, height, $node) {
    this.width = width;
    this.height = height;
    this.baseGrid = [];
    this.makeBaseGrid(width, height);
    this.foodSrc = new Food(width, height);
    
    this.grid = null;

    this.node = $node;
    this.snake = new Snake(Math.floor(width / 2), Math.floor(height / 2), LENGTH);
  
    this.addFood();
    this.addSnakeAndFoodToGrid();

    this.currDir = 'LEFT';

    this.gameInterval = null;
    this.startGame();
  }

  makeBaseGrid(width, height) {
    for (let h = 0; h < height; h++) {
      this.baseGrid.push([]);
      for (let w = 0; w < width; w++) {
        this.baseGrid[h].push(' ');
      }
    }
  }

  drawGrid() {
    let gridString = this.currGrid.reduce((string, currentRow) => {
      return string + '\n' + currentRow.reduce((rowString, currentCell) => {
        return rowString + currentCell;
      }, '|') + '|';
    }, addBorder(this.width)) + '\n' + addBorder(this.width);

    this.node.innerText = gridString;
  }

  addSnakeAndFoodToGrid() {
    this.currGrid = this.copyBaseGrid();

    this.snake.traverseSnake((x, y) => {
      this.currGrid[y][x] = 'O';
    });

    this.currGrid[this.food.y][this.food.x] = 'X';
    this.drawGrid();
  }

  copyBaseGrid() {
    return this.baseGrid.map(row => row.slice());
  }

  startGame() {
    this.gameInterval = setInterval(this.updatePos.bind(this), SPEED);
  }

  updatePos() {
    var newPos = this.snake.moveSnake(this.currDir, this.food);

    if (newPos.isEating) {
      this.addFood();
    }

    this.addSnakeAndFoodToGrid();    

    if (newPos.collision) {
      clearInterval(this.gameInterval);
      this.killBoard();
    }
  }

  handleKeyDown(e) {
    if (e.keyCode === 37) {
      this.currDir = 'LEFT';
    } else if (e.keyCode === 39) {
      this.currDir = 'RIGHT';
    } else if (e.keyCode === 38) {
      this.currDir = 'UP';
    } else if (e.keyCode === 40) {
      this.currDir = 'DOWN';
    }
  }

  addFood() {
    this.food = this.foodSrc.getNewLocation();
    while (this.snake.detectCollision(this.food.x, this.food.y)) {
      this.food = this.foodSrc.getNewLocation();
    }
  }

  killBoard() {
    var rowLength = this.width;
    if (this.currGrid[this.height - 1][this.width - 1] !== 9) {

      this.currGrid = this.currGrid.map(row => {
        var place = row.lastIndexOf(9);
        if (place !== -1 && place <= rowLength - 2) {
          row[place + 1] = 9;
        }
        return row;
      });

      for (let i = 0; i < this.height; i++) {
        if (this.currGrid[i][0] !== 9) {
          this.currGrid[i][0] = 9;
          break;
        }
      }

      this.drawGrid();
      setTimeout(this.killBoard.bind(this), 20);
    }

    // this.currGrid.forEach(row => row[0] = 9);
    // this.drawGrid();
  }
}

function addBorder(width) {
  let border = '';
  for (let i = 0; i < width + 2; i++) {
    border += '-';
  }
  return border;
}