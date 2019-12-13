let balls = [];
function level1setup() {

  let coiny = createCanvas(lwindowWidth, lwindowHeight);
  coiny.parent(thisPane.find('.window').attr('id'));
  balls = [];
  pixelDensity(1);
  ellipseMode(RADIUS);
  aroundTheFire.play();

  //Ball Objekte werden erstellt
  for (var i = 0; i < 100; i++) {
    let radius = random(30);
    let x = random(radius, width - radius);
    let y = random(radius, height - radius);
    balls.push(new Ball(x, y, radius));
  }
  started = true;
}

function level1draw(){
  push();
  clear();
  background(25);
  for (var i = 0; i < balls.length; i++) {
    balls[i].update();
  }
  pop();
}
