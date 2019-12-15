let Level4BallArray = [];
let thisTime;
//Standard Schriftgröße
let fontSize = 18;
//Innere Farbe von den Bällen
let Level4BallInnerColor;
//Alpha Wert der Schrift (Score)
let level4FontAlpha = 0;

let lvl4ScoreText;

function level4setup() {
  let coiny = createCanvas(lwindowWidth, lwindowHeight);
  coiny.parent(thisPane.find('.window').attr('id'));
  pixelDensity(1);
  //Koordinaten vom Text werden zentriert
  textAlign(CENTER, CENTER);
  //Innere Farbe festlegen
  Level4BallInnerColor = color(254, 16, 80);
  Level4BallInnerColor.setAlpha(10);
  Level4BallArray = [];

  for (var i = 0; i < 5; i++) {
    Level4BallArray.push(new Level4Ball());
  }
  thisTime = millis();
  started = true;
  ellipseMode(CENTER);

  lvl4ScoreText = new Text('Score', width / 2, height / 9);
  lvl4ScoreValue = new Text(0, width / 2, height / 6);
  textSize(45);
  midAir.play();
}

function level4draw() {

  //Dunkler Hintergrund
  background(25);

  if (midAir.currentTime() > 20) {
    lvl4ScoreText.applyForce();
    lvl4ScoreText.update();
  }

  if (midAir.currentTime() > 30) {
    lvl4ScoreValue.applyForce();
    lvl4ScoreValue.update();
  }

  lvl4ScoreText.display();
  lvl4ScoreValue.display();
  lvl4ScoreText.checkForDeath();
  lvl4ScoreValue.checkForDeath();


  for (var i = 0; i < Level4BallArray.length; i++) {
    Level4BallArray[i].getAttraction(Level4BallArray);
    Level4BallArray[i].applyMouseForce();
    Level4BallArray[i].update();
    Level4BallArray[i].display();
    if (Level4BallArray[i].isDead()) {
      Level4BallArray = [];
      for (var i = 0; i < 5; i++) {
        Level4BallArray.push(new Level4Ball());
      }
      thisTime = millis();

    }
  }
  if (millis() - thisTime >= 2000) {
    Level4BallArray.push(new Level4Ball());
    thisTime = millis();
  }
}