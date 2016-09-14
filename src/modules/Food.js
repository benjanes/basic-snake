
export default class Food {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getNewLocation() {
    var x = Math.floor(Math.random() * this.width);
    var y = Math.floor(Math.random() * this.height);

    return { x, y };
  }
}