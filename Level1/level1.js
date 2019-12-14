let balls = [];
let level1Interval;
let s;
let intervalActive;
let level1BgColor;
let warningColor;
function level1setup() {

  let coiny = createCanvas(lwindowWidth, lwindowHeight);
  coiny.parent(thisPane.find('.window').attr('id'));
  balls = [];
  pixelDensity(1);
  ellipseMode(RADIUS);
  warningColor = color('#FF1050');
  warningColor.setAlpha(120);
  level1BgColor = 20;
  aroundTheFire.play();
  s = 1000;
  intervalActive = false;
  level1Interval = setInterval(function(){
    s = 1000;
    bgWarning();
  },10000)
  //Ball Objekte werden erstellt
  for (var i = 0; i < 10; i++) {
    let radius = random(30);
    let x = random(radius, width - radius);
    let y = random(radius, height - radius);
    balls.push(new Ball(x, y, radius));
  }
  started = true;
}

function level1draw(){

  background(level1BgColor);

  for (var i = 0; i < balls.length; i++) {
    balls[i].edges();
    balls[i].update();
    balls[i].display();
  }

}

function level1HardReset(){
  aroundTheFire.stop();
  clearInterval(level1Interval);
}

function bgWarning(){
  intervalActive = true;
  if (s > 0) {
    level1BgColor = warningColor;
    setTimeout(function(){
      level1BgColor = 20;
    },30);
    if (s>100) {
      s -= 100;
    }
    else {
      s -= 20;
    }
    setTimeout(bgWarning,s);
  }
  else {
    changeGravity();
  }
}

function changeGravity(){
  for (var i = 0; i < balls.length; i++) {
    balls[i].changeDirection();
  }
}
