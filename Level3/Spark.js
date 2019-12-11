function Spark(bx,by,radius){
  this.x = random(bx-radius/2,bx+radius/2);
  this.y = random(by-radius/2,by+radius/2);
  this.dx = this.x-bx;
  this.dy = this.y-by;
  this.lifeSpan = 0;
  this.paint = ['#591202','#BF3604','#F25D07','#F28B30'];

  this.draw = function(){
    stroke(this.paint[floor(random(0,this.paint.length))]);
    strokeWeight(random(1,5));
    line(this.x,this.y,this.x+this.dx,this.y+this.dy);
  }
  this.update = function(){
    this.dx = this.dx *1.00005;
    this.dy = this.dy *1.00005;
    this.x = this.x+this.dx;
    this.y = this.y+this.dy;
    this.lifeSpan+=1.5;

  }
}
