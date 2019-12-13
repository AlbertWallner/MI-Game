let paints = ['#222640', '#4EA6B0', '#F2CA80', '#F28B66', '#F26052'];

function Ball(x, y, radius) {
  this.pos = createVector(x, y);
  this.vel = createVector(random(-3, 3), 3);
  this.radius = radius;
  this.grav = 0;

  this.color = paints[Math.round(Math.random(paints.length))];

  this.display = function() {
    fill('#FF1050');
    stroke('#4F031F');
    strokeWeight(5);
    ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    if (dist(mouseX, mouseY, this.pos.x, this.pos.y) <= this.radius) {

    }
  }
  this.update = function() {

    this.pos.add(this.vel);

  }

  this.edges = function() {
    if (this.grav == 0) {

      if (this.pos.y + this.radius + this.vel.y >= height || this.pos.y - this.radius <= 0) {
        this.vel.y = -this.vel.y;
      } else {
        this.vel.y += 1;
      }
      if (this.pos.x + this.radius > width || this.pos.x - this.radius <= 0) {
        this.vel.x = -this.vel.x;
      }
    } else if (this.grav == 1) {

      if (this.pos.y + this.radius + this.vel.y >= height || this.pos.y - this.radius <= 0) {
        this.vel.y = -this.vel.y;
      }

      if (this.pos.x + this.radius > width || this.pos.x - this.radius <= 0) {
        this.vel.x = -this.vel.x;
      } else {
        this.vel.x += 1;
      }
    } else if (this.grav == 2) {

      if (this.pos.y + this.radius + this.vel.y >= height || this.pos.y - this.radius <= 0) {
        this.vel.y = -this.vel.y;
      } else {
        this.vel.y -= 1;
      }
      if (this.pos.x + this.radius > width || this.pos.x - this.radius <= 0) {
        this.vel.x = -this.vel.x;
      }
    } else if (this.grav == 3) {

      if (this.pos.y + this.radius + this.vel.y >= height || this.pos.y - this.radius <= 0) {
        this.vel.y = -this.vel.y;
      }
      if (this.pos.x + this.radius > width || this.pos.x - this.radius <= 0) {
        this.vel.x = -this.vel.x;
      }else {
        this.vel.x -= 1;
      }
    }

  }

  // TO DO: Make a new ball spawn every second or so

  this.changeDirection = function() {
    this.grav ++;
    if (this.grav == 4) {
      this.grav = 0;
    }
    if (this.grav == 0) {
      this.vel = createVector(random(-3, 3), 3);
    } else if (this.grav == 1) {
      let temp = this.vel.x;
      this.vel.x = this.vel.y;
      this.vel.y = temp;
    } else if (this.grav == 2) {
      let temp = this.vel.x;
      this.vel.x = this.vel.y;
      this.vel.y = -temp;
    } else if (this.grav == 3) {
      let temp = this.vel.x;
      this.vel.x = this.vel.y;
      this.vel.y = temp;
    }

  }
}
