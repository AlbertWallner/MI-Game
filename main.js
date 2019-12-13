  //Started triggered die draw() Funktion
  let started = false;
  //Wichtig für die ID vergabe später
  let $currentPane = $('.pane:first')
  let $book = $('#bookImage');
  $book.hide();
  let $allPanes = $('.pane');
  //Dimensionen vom Canvas
  let lwindowWidth;
  let lwindowHeight;
  //thisPane beszieht sich auf das aktuell ausgewählte Level
  let thisPane;
  //Level Selection Button und Score
  let $levelSelection = $('#lvlSelection');
  let $scoreDiv = $levelSelection.next();
  let $listEl = $('li');
  $listEl.hide();

  //Variablen zur speicherung von den Positionen der Panes (Damit man diese am Ende wieder repositionieren kann)
  let currentLeft;
  let currentTop;
  let currentWidth;
  let currentHeight;
  let isSomethingActive = false;
  let millisTime;

  //Sounds
  let selectionSound;
  let selectionSoundEnv;
  let gettingHitSound;
  let gettingHitEnv;


  //Scores
  let $scoreBoard = $('#scoreBoard');
  $scoreBoard.hide();

  //Videos
  let $myVideos = $('video');

  //Wenn man auf den "Level Selection" Button drückt,dann geht der aktuelle Panel
  //Zurück zur originallen Position und der Canvas verschwindet
  $levelSelection.click(function() {
    if (!isSomethingActive && started) {
      $scoreDiv.fadeIn(1000);
      selectionSoundEnv.play();
      FahrStuhlMusik();
      resetAllLevels();
      addEventListenersToPanes();
      isSomethingActive = true;
      $myVideos.fadeIn(3000);
      started = false;
      //Canvas wird komplett entfernt
      $('canvas').remove();
      thisPane.animate({
        width: currentWidth,
        height: currentHeight,
        top: currentTop,
        left: currentLeft
      }, 2000, function() {
        lwindowWidth = $('#window').width();
        lwindowHeight = $('#window').height();
        $('.pane').not(thisPane).fadeIn(1000);
        $book.fadeIn(1000);
        isSomethingActive = false;
      });
      fullscreen(false);
    }
  })
  $allPanes.hide();
  //Beim klick auf das Buch wird jedem Pane eine ID gegeben (wichtig für css u.a)
  $book.click(function() {
    selectionSoundEnv.play();
    FahrStuhlMusikStart();
    for (var i = 1; i < 4; i++) {
      if (i == 1) {
        $currentPane.attr('id', 'game' + i);
      } else {
        $currentPane = $currentPane.next();
        $currentPane.attr('id', 'game' + i);
      }
      if (i == 3) {
        $currentPane = $currentPane.next();
        $currentPane.attr('id', 'game' + 4);
        $currentPane = $('.pane:first')
      }
    }
    $allPanes.fadeIn(1000);
    $scoreDiv.fadeIn(1000);
    addEventListenersToPanes();
  });

  function addEventListenersToPanes() {
    $allPanes.on('click', function(e) {
      if (!isSomethingActive) {
        $scoreDiv.fadeOut(1000);
        selectionSoundEnv.play();
        FahrStuhlMusik();
        isSomethingActive = true;
        $myVideos.hide();

        thisPane = $(e.target).closest('.pane');

        //Speicherung von der Positon vom aktuellen Pane
        currentTop = thisPane.css('top');
        currentLeft = thisPane.css('left');
        currentWidth = thisPane.css('width');
        currentHeight = thisPane.css('height');
        $book.fadeOut(1000);
        $allPanes.not(this).fadeOut(1000);
        thisPane.delay(1000).animate({
          left: '0vw',
          top: '0vh',
          width: '100%',
          height: '100%',
        }, 2500, loadCanvas);
      }

    });
  }

  $scoreDiv.click(function(){
    if (!isSomethingActive) {
      isSomethingActive = true;
      $book.hide();
      $allPanes.hide();
      $levelSelection.hide();
      $scoreBoard.show();
    }
    else {
      isSomethingActive = false;
      $scoreBoard.fadeOut(1000,function(){
        $book.fadeIn(1000);
        $allPanes.fadeIn(1000);
        $levelSelection.fadeIn(1000);
      });


    }
  })

  //Fügt Sounds hinzu (in der Preload Funktion)
  function createSounds(){
    //Sounds
    selectionSound = new p5.Oscillator();
    selectionSoundEnv = new p5.Envelope();

    selectionSoundEnv.setADSR(0,0.2,0.2,1.1);
    selectionSoundEnv.setRange(0.4,0.0);
    selectionSoundEnv.mult(0.5);

    selectionSound.setType('sawtooth');
    selectionSound.amp(selectionSoundEnv);
    selectionSound.freq(280);
    selectionSound.start();

    gettingHitSound = new p5.Oscillator();
    gettingHitEnv = new p5.Envelope();

    gettingHitEnv.setADSR(0,0,0.8,0.4);
    gettingHitEnv.setRange(0.8,0.0);
    gettingHitEnv.mult(0.5);

    gettingHitSound.setType('square');
    gettingHitSound.amp(gettingHitEnv);
    gettingHitSound.freq(50);
    gettingHitSound.start();
  }

  function preload() {
    song = loadSound('Sounds/song.mp3');
    aroundTheFire = loadSound('Sounds/aroundTheFire.mp3');
    fahrstuhlmusik = loadSound('Sounds/Fahrstuhl.mp3');
    createSounds();

  }

  function setup(){
    $book.fadeIn(500);
    $listEl.fadeIn(500);
    $scoreDiv.hide();
  }

  function FahrStuhlMusikStart(){
    fahrstuhlmusik.setVolume(0.8);
    if (fahrstuhlmusik.isPlaying()) {
      fahrstuhlmusik.stop();
    }
    else {
      fahrstuhlmusik.play();
    }
  }

  //Fahrstuhlmusik!
  function FahrStuhlMusik(){
    if (fahrstuhlmusik.isPlaying()) {
      fahrstuhlmusik.stop();
    }
    else {
      fahrstuhlmusik.play();
    }

  }

  //Callback Funktion (Wenn man auf ein level klickt)
  function loadCanvas() {

    fullscreen(true);
    //Canvas bekommt die Dimensionen von dem aktuellen Window Element
    setTimeout(function() {
      lwindowWidth = thisPane.find('.window').width();
      lwindowHeight = thisPane.find('.window').height();
      //Je nach dem auf welches Level man geklickt hat,wird das entsprechende LevelSetup geladen
      switch (thisPane.find('.window').attr('id')) {
        case 'survival':
          level1setup();
          break;
        case 'puzzle':
          level3setup();
          break;
        case 'parkour':
          level2setup();
          break;
        case 'story':
          level4setup();
          break;
      }
      //Macht den EventListener weg
      thisPane.off();
      isSomethingActive = false;
    }, 1000);


  }

  //Je nach dem auf welches Level man geklickt hat,wird das entsprechende LevelDraw geladen
  function draw() {
    if (started) {
      switch (thisPane.find('.window').attr('id')) {
        case 'survival':
          level1draw();
          break;
        case 'puzzle':
          level3draw();
          break;
        case 'parkour':
          level2draw();
          break;
        case 'story':
          level4draw();
          break;
      }
    }
  }

  function resetAllLevels(){
    level1HardReset();
    level2HardResett();

  }
