class Star {
  constructor(img) {
    this.rotation = PI / 20;
    this.img = img;
    this.pos = createVector(random(0, width), -100);
    this.vel = createVector(random(-5, 5), 0);
    this.acc = createVector();
    this.removed = false;
    this.scale = width / height * random(1, 3);


    //Rotationsrichtung wird zufällig bestimmt
    if (random() > 0.5) {
      this.rotationFactor = -1;
    } else {
      this.rotationFactor = 1;
    }
  }
}

Star.prototype.display = function() {
  push();
  translate(this.pos.x, this.pos.y);
  rotate(this.rotation);
  scale(this.dim);
  fill('#FF1050');
  stroke('#4F031F');
  strokeWeight(3);
  star(0,0,30,70,5);

  pop();
}
Star.prototype.update = function() {

  this.dim = map(amp.getLevel(), 0, 0.3, 0.1, 0.7)+0.2;
  this.vel.add(this.acc);
  this.pos.add(this.vel);
  this.rotation += (map(amp.getLevel(), 0, 1, 0, 0.4) * random()) * this.rotationFactor;
  this.acc.mult(0);
}
Star.prototype.addForce = function(f) {
  let force = f;
  this.acc.add(force);
}
Star.prototype.remove = function() {
  if (this.pos.y > height) {
    this.removed = true;
  }
}
Star.prototype.edges = function() {
  if (this.pos.x > width || this.pos.x < 0) {
    this.vel.x = this.vel.x * -1;
  }
}
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
