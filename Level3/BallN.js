//Ball Konstruktor
function BallN() {

  //Zufällige Attribute
  this.radius = random(10, 20);
  this.pos = createVector(random(this.radius, canvas.width - this.radius), random(this.radius, canvas.height - this.radius));
  this.vel = createVector(random(-10, 10), random(-10, 10));

  while (dist(this.pos.x, this.pos.y, mouseX, mouseY) < 200) {
    this.pos.x = random(this.radius, width - this.radius);
    this.pos.y = random(this.radius, height - this.radius);
  }

  //Partikel Effekte
  this.subCircles = [];
  this.sparks = [];

  //Der Ball zeichnet sich selbst
  this.show = function() {
    fill(255, 0, 0);
    noStroke();
    strokeWeight(1);
    ellipse(this.pos.x, this.pos.y, this.radius, this.radius)
  }

  //Der Ball ändert seine Werte (Animation)
  this.update = function() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    this.subCircles.push(new Particle(random(this.pos.x - this.radius / 2, this.pos.x + this.radius / 2), random(this.pos.y - this.radius / 2, this.pos.y + this.radius / 2), mag(this.vel.x, this.vel.y)))
    if (this.subCircles.length >= 20) {
      this.subCircles.shift();
    }
    //Der Ball prallt an den Rändern ab
    if (this.pos.x + this.radius >= width || this.pos.x - this.radius <= 0) {
      this.vel.x = -this.vel.x;

      for (var i = 0; i < 100; i++) {
        this.sparks.push(new Spark(this.pos.x, this.pos.y, this.radius));
      }
    }
    if (this.pos.y + this.radius >= height || this.pos.y - this.radius <= 0) {
      this.vel.y = -this.vel.y;

      for (var i = 0; i < 100; i++) {
        this.sparks.push(new Spark(this.pos.x, this.pos.y, this.radius));
      }
    }
    for (var i = 0; i < this.sparks.length; i++) {
      if (this.sparks[i].lifeSpan >= 20) {
        this.sparks.shift();
      }
    }
  }

  this.increaseSpeed = function(mag) {
    this.vel.setMag(mag);
  };

}