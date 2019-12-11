let Level4BallArray = [];
let thisTime;
//Standard Schriftgröße
let fontSize = 18;
//Innere Farbe von den Bällen
let Level4BallInnerColor;
//Alpha Wert der Schrift (Score)
let level4FontAlpha = 0;

function level4setup(){
  let coiny = createCanvas(lwindowWidth, lwindowHeight);
  coiny.parent(thisPane.find('.window').attr('id'));
  pixelDensity(1);
  //Koordinaten vom Text werden zentriert
  textAlign(CENTER,TOP);
  //Innere Farbe festlegen
  Level4BallInnerColor = color(254,16,80);
  Level4BallInnerColor.setAlpha(10);
  Level4BallArray = [];

  for (var i = 0; i < 5; i++) {
    Level4BallArray.push(new Level4Ball());
  }
  thisTime = millis();
  started = true;
  
}

function level4draw(){
  //Text Alpha wird immer erhöht
  level4FontAlpha+=0.1;
  //Dunkler Hintergrund
  background(25);

  fill(Level4BallInnerColor);
  Level4BallInnerColor.setAlpha(level4FontAlpha);
  textSize(45);
  strokeWeight(2);
  text('Score',width/2,0);
  textSize(25);
  text(round(millis()/100),width/2,40);

  for (var i = 0; i < Level4BallArray.length; i++) {
    Level4BallArray[i].getAttraction(Level4BallArray);
    Level4BallArray[i].applyMouseForce();
    Level4BallArray[i].update();
    Level4BallArray[i].display();
    if(Level4BallArray[i].isDead()){
      Level4BallArray = [];
      for (var i = 0; i < 5; i++) {
        Level4BallArray.push(new Level4Ball());
      }
      thisTime = millis();

    }
  }
  if (millis()-thisTime>=2000) {
    Level4BallArray.push(new Level4Ball());
    thisTime = millis();
  }
}
