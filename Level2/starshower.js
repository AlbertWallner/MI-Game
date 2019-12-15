let myStars = [];
let img;
let gravity;
let secondTimer = 0;
let spawnTimer;
let amp;
let gravityForce;
let ampList;
let pyramidTime = 16;
let pyramidArray = [];
let fontSizeValue;
let fontAlpha;
let myColor;
let canBeKilled = false;
let level2Score = 0;

function level2setup() {
  let coiny = createCanvas(lwindowWidth, lwindowHeight);
  coiny.parent(thisPane.find('.window').attr('id'));
  song.play();
  imageMode(CENTER);
  amp = new p5.Amplitude();
  fontAlpha = 0;
  fontSizeValue = 20;
  myColor = color('#5CECBF');
  pixelDensity(1);
  started = true;
  textAlign(CENTER, CENTER);
}

function level2draw() {
  level2Score = round(song.currentTime());
  updateScores();
  background(15, 15, 25);
  if (mouseX > -2 && mouseY > 0) {
    if (!song.isPlaying()) {
      song.play();
    }
    createGravityAndTimer();
    createStar();
    createPyramid();
    growPyramid();
    checkForDeath();
  } else {
    song.pause();
  }
  drawScore();
  displayPyramid();
  drawStars();

}

function level2HardReset() {
  song.stop();
  pyramidArray = [];
  pyramidTime = 16;
  secondTimer = 0;
  myStars = [];
}

//Function which draws and updates the score
function drawScore() {

  if (song.currentTime() >= 3.036 && song.currentTime() < 35.757) {
    fontAlpha += 0.02;
    fontSizeValue += 0.02;
  } else if (song.currentTime() >= 106.405) {
    if (fontSizeValue < 300) {
      fontAlpha += 0.02;
      fontSizeValue += 0.1;
    }
    if (song.currentTime() > 123.0715 && song.currentTime() < 128.104) {
      myColor = color('#4F031F');
    } else if (song.currentTime() >= 130.8) {
      fontAlpha = 255;
      myColor = color('#FF1050')
    }

  }

  push()
  let copiedValue = fontSizeValue;
  myColor.setAlpha(fontAlpha);
  if (song.currentTime() <= 130.8) {
    noStroke();
  } else {
    stroke('#4F031F')
    strokeWeight(10);
  }

  fill(myColor);
  textAlign(CENTER, CENTER);
  if (song.currentTime() > 123.0715) {
    textSize(copiedValue + (amp.getLevel() * 100));
  } else {
    textSize(fontSizeValue);
  }
  translate(width / 2, height / 3);
  text('Score', 0, 0);
  if (song.currentTime() > 123.0715) {
    translate(0, copiedValue + (amp.getLevel() * 100));
  } else {
    translate(0, fontSizeValue);
  }

  text(round(song.currentTime()), 0, 0);

  pop();
}

//Function that creates a new Star every now and then
function createStar() {
  if (millis() - secondTimer > spawnTimer && myStars.length < 50) {
    myStars.push(new Star(img));
    secondTimer = millis();
  }
}

//Callback of the Sound File
function soundLoaded() {
  song.play();
  //song.jump(50);
  ampList = song.getPeaks(100);
}

//Determines the growth of the pyramid.It grows faster,when it is active
function growPyramid() {
  if (pyramidArray.length > 0 && pyramidArray[0].showParts && pyramidArray[0].bottom) {
    for (var i = 0; i < pyramidArray.length; i++) {
      pyramidArray[i].height -= 2;
    }
  } else if (pyramidArray.length > 0 && pyramidArray[0].bottom) {
    for (var i = 0; i < pyramidArray.length; i++) {
      pyramidArray[i].height -= 1;
    }
  } else if (pyramidArray.length > 0 && pyramidArray[0].showParts && !pyramidArray[0].bottom) {
    for (var i = 0; i < pyramidArray.length; i++) {
      pyramidArray[i].height += 2;
    }
  } else if (pyramidArray.length > 0 && !pyramidArray[0].bottom) {
    for (var i = 0; i < pyramidArray.length; i++) {
      pyramidArray[i].height += 1;
    }
  }
}

//Draws the stars and removes them if neccessary
function drawStars() {
  for (var i = 0; i < myStars.length; i++) {
    myStars[i].addForce(gravity);
    myStars[i].display();
    myStars[i].update();
    myStars[i].edges();
    myStars[i].update();
    myStars[i].remove();
    if (myStars[i].removed) {
      myStars.splice(i, 1);
    }
  }
}

//Makes a new pyramid about every now and then
function createPyramid() {
  print(song.currentTime());
  if (song.currentTime() - pyramidTime > 4 - amp.getLevel() * 1.5) {
    pyramidArray.push(new Pyramid());

    setTimeout(function() {
      for (var i = 0; i < pyramidArray.length; i++) {
        if (pyramidArray[0].bottom) {
          pyramidArray[i].height = -height / 1.5;
        } else {
          pyramidArray[i].height = +height / 1.5;
        }

        pyramidArray[i].showParts = true;
        pyramidArray[i].fillColor = '#FF1050';
      }
    }, 2000);

    setTimeout(function() {
      pyramidArray.shift();
    }, 3000);
    pyramidTime = song.currentTime();
  }
}

//This function creates the gravityForce and also sets a timer
function createGravityAndTimer() {
  spawnTimer = map(amp.getLevel(), 0, 0.3, 1000, 400);
  gravityForce = map(amp.getLevel(), 0, 0.3, 0.01, 0.1);
  gravity = createVector(0, gravityForce);
}

//This part actually displays the pyramid every frame
function displayPyramid() {
  if (pyramidArray.length > 0) {
    for (var i = 0; i < pyramidArray.length; i++) {
      pyramidArray[i].display();
    }
  }
}

function checkForDeath() {

  loadPixels();
  let x = mouseX;
  let y = round(mouseY);

  let off = (y * width + x) * 4;

  let components = [
    pixels[off],
    pixels[off + 1],
    pixels[off + 2],
    pixels[off + 3]
  ];

  if (pixels[off] == 255 && pixels[off + 1] == 16 && pixels[off + 2] == 80) {
    gettingHitEnv.play();
  }
  updatePixels();

}