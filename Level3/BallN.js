//Ball Konstruktor
function BallN() {

  //Zufällige Attribute
  this.radius = random(10, 20);
  this.x = random(this.radius, canvas.width - this.radius);
  this.y = random(this.radius, canvas.height - this.radius);
  while (dist(this.x,this.y,mouseX,mouseY)<200) {
    this.x = random(this.radius, width - this.radius);
    this.y = random(this.radius, height - this.radius);
  }

  this.dx = random(-10,10);
  this.dy = random(-10,10);

  //Partikel Effekte
  this.subCircles = [];
  this.sparks = [];

  //Der Ball zeichnet sich selbst
  this.show = function() {
    fill(255, 0, 0);
    noStroke();
    strokeWeight(1);
    ellipse(this.x, this.y, this.radius, this.radius)
  }

  //Der Ball ändert seine Werte (Animation)
  this.update = function() {
    this.x += this.dx;
    this.y += this.dy;

    this.subCircles.push(new Particle(random(this.x-this.radius/2,this.x+this.radius/2),random(this.y-this.radius/2,this.y+this.radius/2),mag(this.dx,this.dy)))
    if (this.subCircles.length >= 20) {
      this.subCircles.shift();
    }
    //Der Ball prallt an den Rändern ab
    if (this.x + this.radius >= width || this.x - this.radius <= 0) {
      this.dx = -this.dx;


      for (var i = 0; i < 100; i++) {
        this.sparks.push(new Spark(this.x,this.y,this.radius));
      }
    }
    if (this.y + this.radius >= height || this.y - this.radius <= 0) {
      this.dy = -this.dy;

      for (var i = 0; i < 100; i++) {
        this.sparks.push(new Spark(this.x,this.y,this.radius));
      }
    }
    for (var i = 0; i < this.sparks.length; i++) {
      if (this.sparks[i].lifeSpan>=20) {
        this.sparks.shift();
      }
    }
  }
}
