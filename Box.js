class Box {
  constructor(index, x, y, speed, width, height) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.draw();
  }

  draw() {
    context.fillStyle = 'rgba(0,0,0,0.5)';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.fillStyle = '#fff';
    context.fillText(this.index, this.x+30, this.y+30);
  }
}