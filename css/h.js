console.clear();

let eyes = [];
let col;
let cell = window.innerWidth < 700 ? 30 : 50;

function setup () {
  const size = min(windowWidth, windowHeight) * 0.95;
  createCanvas(size, size);
  
  const cols = floor(width / cell);
  const offset = (width - (cols * cell)) / 2;
  
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < cols; y++) {
      eyes.push(new Eye(x, y, offset));
    }
  }
}

function windowResized () {
  cell = window.innerWidth < 700 ? 30 : 50;
  const size = min(windowWidth, windowHeight) * 0.95;
  resizeCanvas(size, size);
  
  eyes = [];
  const cols = floor(width / cell);
  const offset = (width - (cols * cell)) / 2;
  
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < cols; y++) {
      eyes.push(new Eye(x, y, offset));
    }
  }
}

class Eye {
  constructor (x, y, offset) {
    this.x = x * cell + (cell / 2) + offset;
    this.y = y * cell + (cell / 2) + offset;
    this.r = (cell - 5);
    this.speed = random();
    this.angle = 0;
  }
  
  draw () {
    noFill();
    stroke(0);
    strokeWeight(3);
    circle(this.x, this.y, this.r);
    
    const _d = dist(mouseX, mouseY, this.x, this.y);
    this.angle = Math.atan2(mouseY - this.y, mouseX - this.x);

    fill(0);
    noStroke();
    const x = this.x + cos(this.angle) * (cell / 4 - 4);
    const y = this.y + sin(this.angle) * (cell / 4 - 4);
    circle(x, y, this.r * 0.5);
    
    fill(255);
    circle(x + 4, y - 4, this.r * 0.1);
  }
}

function draw () {
  clear();
  
  eyes.forEach(eye => {
    eye.draw();
  });
}