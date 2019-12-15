function Level4Ball() {
  this.paints = ['#225378', '#1695A3', '#ACF0F2', '#F3FFE2', '#EB7F00'];
  this.radius = random(10, 60);
  this.pos = createVector(random(width - this.radius * 2) + this.radius, random(height - this.radius * 2) + this.radius);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.mass = map(this.radius, 20, 40, 1, 5);
  this.g = 1;
  this.maker = this.paints[floor(random(this.paints.length))];
  this.accMultiplier = 0.2;

  this.display = function() {
    fill('#FF1050');
    stroke('#4F031F');
    strokeWeight(5);
    ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
  }

  this.update = function() {
    //Hier kann man die Beschleunigung allgeimein verändern
    this.acc.mult(this.accMultiplier);

    //Bounce
    if (this.pos.x + this.radius / 2 >= width || this.pos.x - this.radius / 2 <= 0) {
      this.vel.x *= (-1);
    } else if (this.pos.y + this.radius / 2 >= height || this.pos.y - this.radius / 2 <= 0) {
      this.vel.y *= (-1);
    } else {
      this.vel.add(this.acc);
    }

    this.pos.add(this.vel);
    this.acc.setMag(0);
  }
  this.applyForce = function(force) {
    let f = force.copy();
    this.acc.add(f);
  }

  //Alle Objekte ziehen sich gegenseitig an
  this.getAttraction = function(ballArray) {
    let finalForce = createVector(0, 0);
    for (var i = 0; i < ballArray.length; i++) {
      let nextPos = ballArray[i].pos.copy();
      let attractionForce = nextPos.sub(this.pos);
      let attractionMagnitude = attractionForce.mag();
      attractionForce.normalize();
      finalForce.add(attractionForce.mult((this.g * this.mass * ballArray[i].mass) / attractionMagnitude * attractionMagnitude * 0.001));
    }
    this.acc.add(finalForce);
  }

  this.applyMouseForce = function() {
    let mouseVector = createVector(mouseX, mouseY);
    let workingVector = mouseVector.sub(this.pos);
    let mouseMag = workingVector.mag();
    workingVector.normalize();
    this.acc.add(workingVector.mult((this.g * this.mass * 20) / mouseMag * mouseMag * 0.001));
  }
  //Prüft,ob die Maus über einem Ball ist (wenn man getroffen wurde)
  this.isDead = function() {
    if (dist(this.pos.x, this.pos.y, mouseX, mouseY) <= this.radius / 2) {
      return true;

    }
  }
}