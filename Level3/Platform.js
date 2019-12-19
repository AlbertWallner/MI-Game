//Platform Konstruktor
function Platform(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;
  this.color = 255;
  this.timer = 20;

  //Zeichnet die Platform
  this.display = function() {
    fill(255, this.color, this.color);
    stroke(0);
    strokeWeight(1);
    rect(this.x, this.y, this.width, this.height);
  }

  //Ändert die Werte der Platform (macht sie roter)
  this.update = function() {
    if (gameActive) {
      this.color -= 0.3;
    }

    //Nach 20 Sekunden schrumpft die Platform
    if (sparkSong.currentTime() % this.timer == 0 && sparkSong.currentTime() > 0) {
      console.log('true');
      this.width -= 4;
      this.x += 2;
      if (this.width <= 300) {
        this.timer += 20;
      }
    }
    if (this.width < width) {
      this.width += 2;
    }
    if (this.x > 0) {
      this.x -= 1;
    }

    //Durch drücken von "W" oder "S" macht man die Platform "weniger rot" und verschiebt sie
    if (keyIsDown(87)) {
      this.y -= 5;
      this.color += 1;
    }
    if (keyIsDown(83)) {
      this.y += 5;
      this.color += 1;
    }
  }
  this.isDead = () => mouseX > this.width + this.x || this.color <= 0 || mouseX < this.x || mouseY > this.height + this.y || mouseY < this.y;
}