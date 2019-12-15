class Text {
  constructor(text, x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    if (text) {
      this.text = text;
    } else {
      this.text = 0;
    }

    this.rotation = 0;
    this.rotationAcc = 0;
  }
}

Text.prototype.update = function() {
  this.acc.mult(0.02);
  if (this.pos.x + textWidth(this.text) / 2 >= width || this.pos.x - textWidth(this.text) / 2 <= 0) {
    this.vel.x *= (-1);
  } else if (this.pos.y + textWidth(this.text) / 2 >= height || this.pos.y - textWidth(this.text) / 2 <= 0) {
    this.vel.y *= (-1);
  } else {
    this.vel.add(this.acc);
  }
  this.pos.add(this.vel);
  this.acc.setMag(0);
  this.rotation += this.rotationAcc;

  if (this.rotationAcc < 0.8) {
    this.rotationAcc += 0.001;
  }


};
Text.prototype.applyForce = function() {
  let mouseVector = createVector(mouseX, mouseY);
  let workingVector = mouseVector.sub(this.pos);
  let mouseMag = workingVector.mag();
  workingVector.normalize();
  this.acc.add(workingVector.mult((this.mass * 20) / mouseMag * mouseMag * 0.001));

};
Text.prototype.display = function() {
  push();
  if (this.text != 'Score') {
    this.text = round(midAir.currentTime());
  }
  strokeWeight(2);
  translate(this.pos.x, this.pos.y);
  rotate(this.rotation);
  text(this.text, 0, 0);
  pop();
};
Text.prototype.checkForDeath = function() {
  if (dist(this.pos.x, this.pos.y, mouseX, mouseY) <= textWidth(this.text) / 2 && midAir.currentTime() > 1) {
    this.rotationAcc = 0;
    while (midAir.isPlaying()) {
      midAir.stop();
    }

    return true;
  }
}