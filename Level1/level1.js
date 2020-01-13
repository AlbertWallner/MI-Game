let balls = [];
let level1Interval;
let s;
let intervalActive;
let level1BgColor;
let warningColor;
let level1Score;

function level1setup() {

  let coiny = createCanvas(lwindowWidth, lwindowHeight);
  coiny.parent(thisPane.find('.window').attr('id'));
  balls = [];
  pixelDensity(1);
  ellipseMode(RADIUS);
  warningColor = color('#FF1050');
  warningColor.setAlpha(120);
  level1BgColor = 0;
  aroundTheFire.play();
  s = 1000;
  intervalActive = false;
  level1Interval = setInterval(function() {
    s = 1000;
    bgWarning();
  }, 10000)

  //Ball Objekte werden erstellt
  for (var i = 0; i < 10; i++) {
    balls.push(new Ball());
  }
  background(level1BgColor);
  for (var i = 0; i < balls.length; i++) {
    balls[i].edges();
    balls[i].update();
    balls[i].display();
  }
  started = true;
}

function level1draw() {
  if (mouseX > -3 && mouseY > 0) {
    if (!aroundTheFire.isPlaying()) {
      aroundTheFire.play();
    }
    background(level1BgColor);
    for (var i = 0; i < balls.length; i++) {
      balls[i].edges();
      balls[i].update();
      balls[i].display();
    }

    if (frameCount % 500 == 0) {
      let newBall = new Ball();
      newBall.grav = balls[0].grav;
      balls.push(newBall);
    }
    textAlign(LEFT, TOP);
    textSize(30);
    strokeWeight(2);
    text('Score', 10, 10);
    textSize(25);
    text(round(aroundTheFire.currentTime()), 10, 50);
    level1Score = round(aroundTheFire.currentTime());
    updateScores();
  } else {
    aroundTheFire.pause();
  }


}

function level1HardReset() {
  aroundTheFire.stop();
  clearInterval(level1Interval);
}


//Der Hintergrund leuchtet in einem bestimmten Interval auf
//(das soll als Warnung vor der Gravitationsänderung dienen)
function bgWarning() {
  intervalActive = true;
  if (s > 0) {
    level1BgColor = warningColor;
    setTimeout(function() {
      level1BgColor = 0;
    }, 30);
    if (s > 100) {
      s -= 100;
    } else {
      s -= 20;
    }
    setTimeout(bgWarning, s);
  } else {
    changeGravity();
  }
}

function changeGravity() {
  for (var i = 0; i < balls.length; i++) {
    balls[i].changeDirection();
  }
}