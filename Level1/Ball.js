function Ball() {
  this.radius = random(8, 30);
  this.pos = createVector(random(this.radius, width - this.radius), random(this.radius, height - this.radius));

  //Diese while Schleife sorgt dafür,dass die Bälle nicht auf der Maus spawnen können
  while (dist(this.pos.x, this.pos.y, mouseX, mouseY) < 60) {
    this.pos = createVector(random(this.radius, width - this.radius), random(this.radius, height - this.radius));
  }

  this.vel = createVector(random(-3, 3), 2);
  this.grav = 0;

  this.display = function() {
    fill('#FF1050');
    stroke('#4F031F');
    strokeWeight(5);
    ellipse(this.pos.x, this.pos.y, this.radius, this.radius);

    //Das passiert,wenn man getroffen wird
    if (dist(mouseX, mouseY, this.pos.x, this.pos.y) <= this.radius) {
      balls = [];
      for (var i = 0; i < 10; i++) {
        balls.push(new Ball());
      }
      aroundTheFire.stop();
    }
  }
  this.update = function() {
    this.pos.add(this.vel);

  }

  this.edges = function() {
    if (this.grav == 0) {

      if (this.pos.y + this.radius + this.vel.y >= height || this.pos.y - this.radius +this.vel.y<= 0) {
        this.vel.y = -this.vel.y;

      } else {
        this.vel.y += 1;
      }
      if (this.pos.x + this.radius > width || this.pos.x - this.radius <= 0) {
        this.vel.x = -this.vel.x;
      }
    } else if (this.grav == 1) {

      if (this.pos.y + this.radius + this.vel.y >= height || this.pos.y - this.radius +this.vel.y<= 0) {
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
      } else {
        this.vel.x -= 1;
      }
    }

  }

  this.changeDirection = function() {
    this.grav++;
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
