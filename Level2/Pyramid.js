class Pyramid {
  constructor() {
    //Determines if the pyramid should spawn on the top or the bottom
    if (random()>0.5) {
      this.bottom = false;
    }
    else {
      this.bottom = true;
    }
    this.y = height;
    this.width = width / 20;
    this.x = random(0, width);
    //Changes the height depending on wether the pyramid spawns on the top or the bottom
    if (this.bottom) {
      this.height = -height / 4;
    }
    else {
      this.height = height/4;
    }
    this.showParts = false;
    this.strokeColor = '#4F031F';
    this.fillColor = '#4F031F';
  }
  display() {
    fill(this.fillColor);
    stroke(this.strokeColor);
    strokeWeight(2);
    if (this.bottom) {
      //This draws the warning rectangle
      rect(this.x, this.y, this.width, this.height * (amp.getLevel() + 1));
      if (this.showParts) {
        //this draws all of the rectangles to the left of the pyramid
        for (var i = 1; i < 10; i++) {
          rect(this.x - this.width * i, this.y, this.width, this.height * (1 - 0.15 * i) * (amp.getLevel() + 1));
        }
        //this draws all of the rectangles to the right of the pyramid
        for (var i = 1; i < 10; i++) {
          rect(this.x + this.width * i, this.y, this.width, this.height * (1 - 0.15 * i) * (amp.getLevel() + 1));
        }
      }
    }
    else {
      //This draws the warning rectangle
      rect(this.x, 0, this.width, this.height * (amp.getLevel() + 1));
      if (this.showParts) {
        //this draws all of the rectangles to the left of the pyramid
        for (var i = 1; i < 10; i++) {
          rect(this.x - this.width * i, 0, this.width, this.height * (1 - 0.15 * i) * (amp.getLevel() + 1));
        }
        //this draws all of the rectangles to the right of the pyramid
        for (var i = 1; i < 10; i++) {
          rect(this.x + this.width * i, 0, this.width, this.height * (1 - 0.15 * i) * (amp.getLevel() + 1));
        }
      }
    }

  }
}
