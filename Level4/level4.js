let Level4BallArray = [];
let thisTime;
//Standard Schriftgröße
let fontSize = 18;
//Innere Farbe von den Bällen
let Level4BallInnerColor;
//Alpha Wert der Schrift (Score)
let level4FontAlpha = 0;

let lvl4ScoreText;
let level4Score = 0;

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
  if (mouseX > 0 && mouseY > 0) {
    level4Score = round(midAir.currentTime());
    updateScores();
    if (!midAir.isPlaying()) {
      midAir.play();
    }

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
    if (lvl4ScoreText.checkForDeath() || lvl4ScoreValue.checkForDeath()) {
      lvl4ScoreText = new Text('Score', width / 2, height / 9);
      lvl4ScoreValue = new Text(0, width / 2, height / 6);
      Level4BallArray = [];
      for (var i = 0; i < 5; i++) {
        Level4BallArray.push(new Level4Ball());
      }
      thisTime = millis();
    }

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
        midAir.stop();
        lvl4ScoreText = new Text('Score', width / 2, height / 9);
        lvl4ScoreValue = new Text(0, width / 2, height / 6);
      }
    }
    if (millis() - thisTime >= 2000) {
      Level4BallArray.push(new Level4Ball());
      thisTime = millis();
    }
  } else {
    midAir.pause();
    lvl4ScoreText.display();
    lvl4ScoreValue.display();
    for (var i = 0; i < Level4BallArray.length; i++) {
      Level4BallArray[i].display();
    }
  }

}

function level4HardReset() {
  midAir.stop();
  Level4BallArray = [];
  for (var i = 0; i < 5; i++) {
    Level4BallArray.push(new Level4Ball());
  }
}