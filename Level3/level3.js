let wPressed = false;
let sPressed = false;
let backgroundC = 255;
let gameActive = false;
let gameStartTime;
let timerActive = true;
let platformTimer;

//Erstelle Objekte
let platform1;
let meteorArray = [];

//Passiert 1 Mal wenn die Seite ladet
function level3setup() {
  let coiny = createCanvas(lwindowWidth, lwindowHeight);
  coiny.parent(thisPane.find('.window').attr('id'));
  pixelDensity(1);
  //Zentriert alle Kreise
  ellipseMode(RADIUS);
  platform1 = new Platform(0, height / 2, width, 100);
  started = true;
  rectMode(CORNER);
}

//Passiert immer und immer wieder während das Programm läuft
function level3draw() {

  background(backgroundC);

  platform1.update();
  platform1.display();

  //Level Start
  if (sPressed && wPressed) {
    //schwarzer Hintergrund und Spiel wird "aktiviert"

    backgroundC = 0;
    gameActive = true;

    if (!sparkSong.isPlaying()) {
      sparkSong.play();
    }

    //Timer resetten
    if (timerActive) {
      gameStartTime = millis();
      counter = gameStartTime;
      platformTimer = gameStartTime;
      timerActive = false;
    }

    //Alle 5 Sekunden kommt ein neuer Meteor
    if (millis() - counter >= 10000 && meteorArray.length <= 20) {
      meteorArray.push(new Meteor());
      counter = millis();
    }
    //Zeichne alle Objekte
    for (let i = 0; i < meteorArray.length; i++) {
      meteorArray[i].update();
      meteorArray[i].show();
      for (var j = 0; j < meteorArray[i].subCircles.length; j++) {
        meteorArray[i].subCircles[j].create();
        meteorArray[i].subCircles[j].update();
      }
      for (var k = 0; k < meteorArray[i].sparks.length; k++) {
        meteorArray[i].sparks[k].draw();
        meteorArray[i].sparks[k].update();
      }
    }

    if (sparkSong.currentTime() > 62.65) {
      increaseBallSpeed(20);
    }


    if (isDead() && sparkSong.currentTime() > 2 || mouseY < 0) {
      level3HardReset();
    }

  }
  displayKeys();
}

function increaseBallSpeed(mag) {
  for (var i = 0; i < meteorArray.length; i++) {
    meteorArray[i].increaseSpeed(mag);
  }
}

function displayKeys() {
  fill(255);
  noStroke();

  //WKey Image
  if (!wPressed) {
    push();
    imageMode(CENTER);
    rectMode(CENTER);
    translate(width / 2, height / 8);
    scale(0.2);
    rect(0, 0, WkeyImage.width * 0.8, WkeyImage.height * 0.8);
    image(WkeyImage, 0, 0);
    pop();
  }

  //SKey Image
  if (!sPressed) {
    push();
    imageMode(CENTER);
    rectMode(CENTER);
    translate(width / 2, height / 1.25);
    scale(0.2);
    rect(0, 0, SkeyImage.width * 0.8, SkeyImage.height * 0.8);
    image(SkeyImage, 0, 0);
    pop();
  }
}

let level3HardReset = () => {
  meteorArray = [];
  platform1.color = 255;
  gameActive = false;
  platform1 = new Platform(0, height / 2, width, 100);
  sparkSong.stop();
  wPressed = false;
  sPressed = false;
}

function keyPressed() {
  if (keyCode == 87) {
    wPressed = true;
  } else if (keyCode == 83) {
    sPressed = true;
  }
}

let isDead = () => {
  for (ball of meteorArray) {
    if (ball.isDead()) {
      return true;
    }
  }
  if (platform1.isDead()) {
    return true;
  }
}