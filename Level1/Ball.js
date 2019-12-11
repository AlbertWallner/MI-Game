let paints = ['#222640','#4EA6B0','#F2CA80','#F28B66','#F26052'];
function Ball(x,y,radius){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dx = random(-3,3);
  this.dy = random(3);
  this.color = paints[Math.round(Math.random(paints.length))];

  this.display = function(){
    fill('#FF1050');
    stroke('#4F031F');
    strokeWeight(5);
    ellipse(this.x,this.y,this.radius,this.radius);
    if (dist(mouseX,mouseY,this.x,this.y)<=this.radius) {
      alert('Game Over');
    }
  }
  this.update = function(){

    if (this.y +this.radius+this.dy >=height||this.y -this.radius <=0) {
      this.dy = -this.dy*0.99;
    }
    else {
      this.dy += 1;
    }
    if (this.x +this.radius >width||this.x -this.radius <=0) {
      this.dx = -this.dx;
    }

    this.y += this.dy;
    this.x += this.dx;
    this.display();
  }

}
