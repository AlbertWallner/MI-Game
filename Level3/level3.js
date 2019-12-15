let wPressed = false;
let sPressed = false;
let backgroundC = 255;
let gameActive = false;
let gameStartTime;
let timerActive = true;
let platformTimer;

//Erstelle Objekte
let platform1;
let ballArray = [];

//Passiert 1 Mal wenn die Seite ladet
function level3setup() {
  let coiny = createCanvas(lwindowWidth, lwindowHeight);
  coiny.parent(thisPane.find('.window').attr('id'));
  pixelDensity(1);
  //Zentriert alle Kreise
  ellipseMode(RADIUS);
  platform1 = new Platform(0, height / 2, width, 100);
  started = true;


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
    if (millis() - counter >= 10000 && ballArray.length <= 20) {
      ballArray.push(new BallN());
      counter = millis();
    }
    //Zeichne alle Objekte
    for (let i = 0; i < ballArray.length; i++) {
      ballArray[i].update();
      ballArray[i].show();
      for (var j = 0; j < ballArray[i].subCircles.length; j++) {
        ballArray[i].subCircles[j].create();
        ballArray[i].subCircles[j].update();
      }
      for (var k = 0; k < ballArray[i].sparks.length; k++) {
        ballArray[i].sparks[k].draw();
        ballArray[i].sparks[k].update();
      }
    }

    if (sparkSong.currentTime() > 62.65) {
      increaseBallSpeed(20);
    }

    //millis() sorgt dafür,dass man 2 Sekunden Zeit hat,bevor man sterben kann
    //Wenn man verliert,dann folgt ein hard resett
    if (isDead() && sparkSong.currentTime() > 2 || mouseY < 0) {
      for (var i = 0; i < ballArray.length; i++) {
        ballArray[i].subCircles = [];
      }
      ballArray = [];
      platform1.color = 255;
      gameActive = false;
      platformTimer = millis();
      platform1.width = width;
      sparkSong.stop();
      wPressed = false;
      sPressed = false;
    }

  }
  displayKeys();
}

function increaseBallSpeed(mag) {
  for (var i = 0; i < ballArray.length; i++) {
    ballArray[i].increaseSpeed(mag);
  }
}

function displayKeys() {
  fill(255);
  noStroke();

  //WKey
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

  //SKey
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

//Returns true wenn man auf einem bösen Feld ist
function isDead() {

  let x = mouseX;
  let y = round(mouseY);

  //loadPixels sagt dem Programm,dass wir jetzt was mit Pixeln machen wollen
  loadPixels();

  //off bestimmt die Position von userem Pixel (Hier: unter dem Cursor)
  let off = Math.round((y * width + x) * 4);

  //Rgba Werte vom Pixel als Array
  let pixelRgba = [
    pixels[off], //r
    pixels[off + 1], //g
    pixels[off + 2], //b
    pixels[off + 3] //a
  ]

  /* Wenn der "g" Wert vom rgba Pixel weniger oder gleich Null ist,dann hat man verloren (return true)
     Das ist bei den schwarzen und roten Flächen der Fall
     Was für eine Farbe man wählt ist hier variabel!!! */
  if (pixels[off + 1] <= 0) {
    return true;
  } else {
    return false;
  }
}

function keyPressed() {
  console.log('test');
  if (keyCode == 87) {
    wPressed = true;
  } else if (keyCode == 83) {
    sPressed = true;
  }
}