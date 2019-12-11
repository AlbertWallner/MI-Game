//Partikel Konstruktor (Das sind eigentlich die kleinen Kreise,die den großen Kreis verfolgen (der Name ist etwas irreführend))
function Particle(x,y,magnitude){
  this.x = x;
  this.y = y;
  this.blue;
  this.radius = random(2,7);
  this.paint = ['#591202','#BF3604','#F25D07','#F28B30']
  this.create = function(){
    //Die Strokefarbe passt sich an die Geschwindigkeit vom Ball an
    stroke(255,0,this.blue);
    strokeWeight(1);
    fill(this.paint[floor(random(0,this.paint.length))]);
    ellipse(this.x,this.y,this.radius,this.radius)
  }
  this.update = function(){
    
    this.blue = map(magnitude,0,10,0,255);
  }
}
