
export default class Board {
  constructor(width, height, $node) {
    this.width = width;
    this.grid = [];
    this.node = $node;
    this.initGrid(width, height);
  }

  initGrid(width, height) {
    for (let h = 0; h < height; h++) {
      this.grid.push([]);
      for (let w = 0; w < width; w++) {
        // if (w%2) {
        //   this.grid[h].push('0');
        // } else {
          this.grid[h].push(' ');
        // }
        
      }
    }
  }

  drawGrid() {
    let gridString = this.grid.reduce((string, currentRow) => {
      return string + '\n' + currentRow.reduce((rowString, currentCell) => {
        return rowString + currentCell;
      }, '|') + '|';
    }, addBorder(this.width)) + '\n' + addBorder(this.width);

    this.node.innerText = gridString;
  }
}

function addBorder(width) {
  let border = '';
  for (let i = 0; i < width + 2; i++) {
    border += '_';
  }
  return border;
}