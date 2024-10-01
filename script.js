'use strict';

// ------------------------------------------------------------------------------------------------
//*                        ----- SLOT MACHINE COMPLETED VERSION -----  
// ------------------------------------------------------------------------------------------------


let reelCount = 1;
  let total = 0;
    let currentDept = 0;
      let panelsRemain = 3;
        let spinStopBtnEvent = false;
          let activeLight = false;
        let applyCheckOut = false;
      let checkOutDept = false; 
    let checkOutLock = false;  
  let betCount = false; 
let bigSpin = false;
let pointsAdded = false;

class Panel {
  constructor(src) {
    const main = document.querySelector('main');
    const section = document.createElement('section'); 
      section.classList.add('panel');
        this.img = document.createElement('img');
        // this.img.src = src; //* TEST
        this.img.src = this.getRandomImg();
        this.stopBtn = document.createElement('div');
        this.stopBtn.classList.add('stop');
        this.stopBtn.textContent = 'STOP';
        this.panelShadow = document.createElement('span');
      section.appendChild(this.img);
      section.appendChild(this.stopBtn);
      section.appendChild(this.panelShadow); 
      main.appendChild(section); 
    //* event stopBtn --------------------------------------
    this.stopBtn.addEventListener('click', () => { 
      if(!spinStopBtnEvent) return;
      if(this.stopBtn.classList.contains('js_inActive')) return; //***> 
        this.stopBtn.classList.add('js_inActive'); //***> 
        this.stopBtn.classList.add('js_stopBtnAnimation'); // trf animation
        reelHandler.classList.remove('active'); 
        reelHandler.removeEventListener('click', reelAutoStop); 
      clearTimeout(this.timeout);
        this.manipulateReel();
        reelCount++
      panelsRemain--;
      // console.log(panelsRemain); //* log 
      if(panelsRemain === 0) { //* JUDGEMENT //
        if(insertPoint.classList.contains('js_blank')) { // reset BIG SPIN  
          winPoint.classList.remove('js_bigSpinRed'); // reset text & color 
            bigSpinX.classList.remove('js_bigSpinX'); // BIG SPIN X remove
            winPoint.textContent = 0; // needs higher then checkForFunction
          winPoint.classList.remove('js_winRed'); 
        }
        checkForMatchedAll(); checkForUnMatched(); checkForTwoPairMatched(); //* JUDGEMENT // 
        checkForTwoPairExtraSeven(); checkForTwoPairExtraDiamond(); checkForTwoPairExtraBar(); 
        bigSpinFailure(); //* JUDGEMENT // reset shadow effect //* JUDGEMENT //
        saveData(); //*** 
        panelsRemain = 3; // reset counter 
        spinStopBtnEvent = false; activeLight = false; applyCheckOut = false; pointsAdded = false;
          bigSpin = false; betCount = false; // betCounter dblclick disabled reset  
            spinBtn.classList.remove('js_inActive'); // reset btn opacity 
          spinBtn.classList.remove('js_spinBtnAnimation'); // reset trf animation  
          bigSpinX.classList.remove('activate'); // reset bigSpinX activate //*
        if(total === 0) {  // rewrite default message 
          spinBtn.textContent = 'INSERT MONEY TO PLAY';
          betPoint.textContent = 0;
        }
        if(currentDept === 0 && total <= 0)  { 
          checkOutDept = true; // game over
          betPoint.textContent = 0;
          checkOutLock = false;
        }
        // if(insertPoint.classList.contains('js_blank')) { 
        //   console.log('contain read in stop event');
        // } //* BIG SPIN READ TEST
      }
    });
  } //* OUT OF Constructor 

  getRandomImg() {
    // const images = ['img/diamond.jpg','img/diamond.jpg','img/seven.jpg','img/diamond.jpg','img/diamond.jpg','img/seven.jpg'];
    // const images = ['img/seven.jpg','img/seven.jpg','img/seven.jpg','img/diamond.jpg','img/seven.jpg'];
    // const images = ['img/bar.jpg','img/seven.jpg','img/bar.jpg','img/seven.jpg','img/bar.jpg','img/seven.jpg'];
    // const images = ['img/cherry.jpg','img/cherry.jpg','img/cherry.jpg','img/cherry.jpg','img/watermelon.jpg'];
    // const images = ['img/watermelon.jpg','img/watermelon.jpg','img/watermelon.jpg','img/cherry.jpg','img/watermelon.jpg'];
    // const images = ['img/bell.jpg','img/bell.jpg','img/bell.jpg','img/cherry.jpg','img/bell.jpg'];

    const images = ['img/bell.jpg','img/cherry.jpg','img/watermelon.jpg',
      'img/diamond.jpg', 'img/bar.jpg', 'img/seven.jpg'];
    return images[Math.floor(Math.random() * images.length)];
  }

  manipulateImg() {
    const image = ['img/bell.jpg','img/cherry.jpg','img/watermelon.jpg'];
    return image[Math.floor(Math.random() * image.length)];
  }

  manipulateReel() {
    if(reelCount <= 15) {
      console.log('inactive');
      // console.log('inactive - ' + (reelCount));
    }
    if(reelCount <= 15) return;
      console.log('now activate');
      // console.log('now activate - ' + (reelCount));
      this.img.src = this.manipulateImg();
    if(reelCount === 21) {
      reelCount = 0;
    }
  }

  spin() {
    this.panelShadow.classList.remove('js_unMatched-effect');  // reset shadow effect 
      this.stopBtn.classList.remove('js_inActive'); // stop btn opacity effect remove  
        this.stopBtn.classList.remove('js_stopBtnAnimation'); // reset trf animation 
      this.img.src = this.getRandomImg();
    this.timeout = setTimeout(() => {
      this.spin();
    }, 50);
  }

  matched(p1, p2) {
    return this.img.src === p1.img.src && this.img.src === p2.img.src;
  }

  unMatched(p1, p2) { 
    return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
  }

  unMatchEffect() {
    this.panelShadow.classList.add('js_unMatched-effect'); // shadow effect
  }

  disableUnMatchEffect() {
    this.panelShadow.classList.remove('js_unMatched-effect');
  }
} //* OUT OF CLASS
const panels = [ new Panel(), new Panel(), new Panel()];

const reelHandler = document.querySelector('.reelHandler');
//* reelHandler event ---
function reelAutoStop() {
  reelHandler.classList.remove('active');
  setTimeout(() => {panels[0].stopBtn.click();}, 200);//3/8/12
  setTimeout(() => {panels[1].stopBtn.click();}, 600);//2/6/10
  setTimeout(() => {panels[2].stopBtn.click();}, 1000);
}

//* check for match result ----------------------------------

function checkForMatchedAll() {
  if(panels[2].matched(panels[1], panels[0])) {  
    pointAdd_matchedAll(); // BIG SPIN  
    //* this return down below keep on 5x2x active effect 
      if((panels[0].img.src === panels[1].img.src) 
        && panels[2].img.src.includes('diamond')) return; 
    // reset2x_activeEffect(); // when MatchedAll 2x activeEffect disable   
    // reset5x_activeEffect(); // when MatchedAll 5x activeEffect disable     
  }
}

function checkForUnMatched() {
  if(panels[0].unMatched(panels[1], panels[2])) {  
    panels[0].unMatchEffect(); 
  }
  if(panels[1].unMatched(panels[0], panels[2])) {  
    panels[1].unMatchEffect(); 
  }
  if(panels[2].unMatched(panels[0], panels[1])) {  
    panels[2].unMatchEffect(); 
  }
}

function bigSpinFailure() {
  if(bigSpinX.classList.contains('activate') && !pointsAdded) {
    giphyEmbedFrame('.failure', 50, 46, 3000);
  }
}

//* two pair & extra ------------------------------------

function checkForTwoPairExtraSeven() {
  if((panels[0].img.src === panels[2].img.src) 
    && panels[1].img.src.includes('seven')) {
      panels[1].disableUnMatchEffect();
    pointAdd_twoPairExtraSeven();
  }
}

function checkForTwoPairExtraDiamond() {
  if((panels[0].img.src === panels[2].img.src) 
    && panels[1].img.src.includes('diamond')) {
      panels[1].disableUnMatchEffect();
    pointAdd_twoPairExtraDiamond();
    pointsAdded = true;
  }
}

function checkForTwoPairExtraBar() { 
  if((panels[0].img.src === panels[2].img.src) 
    && panels[1].img.src.includes('bar')) {
      panels[1].disableUnMatchEffect();
    pointAdd_twoPairExtraBar();
  }
}

function checkForTwoPairMatched() {
  if((panels[0].img.src === panels[2].img.src)  
    && panels[2].img.src !== panels[1].img.src) { 
    if(panels[1].img.src.includes('diamond')) return;
    if(panels[1].img.src.includes('seven')) return;
    if(panels[1].img.src.includes('bar')) return;
    pointAdd_twoPair();
  }
}


//* point panel -------------------------------------------------

const bigSpinX = document.querySelector('.btn-bigSpinX');
const winPoint = document.querySelector('.win-point');
  const totalPoint = document.querySelector('.total-point');
    const betPoint = document.querySelector('.bet-point');
      const betText = document.querySelector('.bet-text');
      const deptPoint = document.querySelector('.dept-point');
      winPoint.textContent = 0;
    totalPoint.textContent = 0;
  betPoint.textContent = 0;
deptPoint.textContent = 0;

//* save data to local storage ------------------------------------

function saveData() { 
  localStorage.setItem('total', total);
  localStorage.setItem('currentDept', currentDept);
  adjustPointsFontSize();
} 

function getData() { 
  totalPoint.textContent = parseFloat(localStorage.getItem('total'));
  deptPoint.textContent = parseFloat(localStorage.getItem('currentDept'));
  total = parseFloat(localStorage.getItem('total'));
  currentDept = parseFloat(localStorage.getItem('currentDept'));
  adjustPointsFontSize();
} if(localStorage.getItem('total')) { getData() } //*


function adjustPointsFontSize() {
  if(total > 999999) {
    totalPoint.style.fontSize = 1 + 'em';
  } else { totalPoint.style.fontSize = 1.2 + 'em'; }
  if(currentDept > 999999) {
    deptPoint.style.fontSize = 1 + 'em';
  } else { deptPoint.style.fontSize = 1.2 + 'em'; }
} 

//* point add ----------------------------------------------------------

function pointAdd_matchedAll() {
  if(bet5x.classList.contains('js_bet5x-activeEffect') 
  && bet2x.classList.contains('js_bet2x-activeEffect')) {
    if(insertPoint.classList.contains('js_blank')) { //* BIG SPIN POINT
        // console.log('contain read in 5x2x - pointAdd_matchedAll');
          pointRate(100);
        totalPoint.textContent = total;
      return;
    }
      pointRate(10);
        totalPoint.textContent = total;
      // console.log('10xPoint');
    return;
  } 
  else if(bet5x.classList.contains('js_bet5x-activeEffect')) {
    if(insertPoint.classList.contains('js_blank')) { //* BIG SPIN POINT
        // console.log('contain read in 5x - pointAdd_matchedAll');
          pointRate(50);
        totalPoint.textContent = total;
      return;
    }
      pointRate(5);
        totalPoint.textContent = total;
      // console.log('5xPoint');
    return;
  } 
  else if(bet2x.classList.contains('js_bet2x-activeEffect')) {
    if(insertPoint.classList.contains('js_blank')) { //* BIG SPIN POINT
        // console.log('contain read in 2x - pointAdd_matchedAll');
          pointRate(20);
        totalPoint.textContent = total;
      return;
    }
      pointRate(2);
        totalPoint.textContent = total;
      // console.log('2xPoint');
    return;
  } 
  else {
    if(insertPoint.classList.contains('js_blank')) { //* BIG SPIN POINT
        // console.log('contain read in 1x - pointAdd_matchedAll');
          pointRate(10);
        totalPoint.textContent = total;
      return;
    }
      pointRate(1);
        totalPoint.textContent = total;
    // console.log('1xPoint');
  }
}

//* pointAdd_twoPair ------------------------------------

function pointAdd_twoPair() {
  if(panels[2].img.src.includes('seven')) {
    checkBetX(200); pointsAdded = true;
  } else if(panels[2].img.src.includes('diamond')) {
    checkBetX(300); pointsAdded = true;
  } else if(panels[2].img.src.includes('bar')) {
    checkBetX(200); pointsAdded = true;
  } else if(panels[2].img.src.includes('watermelon')) {
    checkBetX(50); pointsAdded = true;
  } else if(panels[2].img.src.includes('cherry')) {
    checkBetX(50); pointsAdded = true;
  } else if(panels[2].img.src.includes('bell')) {
    checkBetX(50); pointsAdded = true;
  } 
}

//* pointAdd_twoPairExtraSeven ----------------------------

function pointAdd_twoPairExtraSeven() {
  if(panels[1].img.src.includes('seven') 
      && panels[2].img.src.includes('diamond')) {
    checkBetX(3000); pointsAdded = true;
    confettiShower(200, 1);
    giphyEmbedFrame('.sevenDiamond', 60, 55, 4000); 
  }
  else if(panels[1].img.src.includes('seven') 
      && panels[2].img.src.includes('bar')) {
    checkBetX(1250); pointsAdded = true;
    confettiShower(100, 150); 
    giphyEmbedFrame('.sevenBar', 45, 55, 4000);
  }
  else if(panels[1].img.src.includes('seven') 
      && panels[2].img.src.includes('watermelon')) {
    checkBetX(50); pointsAdded = true;
  }
  else if(panels[1].img.src.includes('seven') 
      && panels[2].img.src.includes('cherry')) {
    checkBetX(50); pointsAdded = true;
  }
  else if(panels[1].img.src.includes('seven') 
      && panels[2].img.src.includes('bell')) {
    checkBetX(50); pointsAdded = true;
  }
}

//* pointAdd_twoPairExtraDiamond ----------------------------

function pointAdd_twoPairExtraDiamond() {
  if(panels[1].img.src.includes('diamond') 
      && panels[2].img.src.includes('seven')) {
    checkBetX(2500); pointsAdded = true;
    confettiShower(200, 1);
    giphyEmbedFrame('.diamondSeven', 60, 53, 4000); 
  }
  else if(panels[1].img.src.includes('diamond') 
      && panels[2].img.src.includes('bar')) {
    checkBetX(1250); pointsAdded = true;
    confettiShower(150, 1); 
    giphyEmbedFrame('.diamondBar', 40, 47, 3500); 
  }
  else if(panels[1].img.src.includes('diamond') 
      && panels[2].img.src.includes('watermelon')) {
    checkBetX(200); pointsAdded = true;
  }
  else if(panels[1].img.src.includes('diamond') 
      && panels[2].img.src.includes('cherry')) {
    checkBetX(200); pointsAdded = true;
  }
  else if(panels[1].img.src.includes('diamond') 
      && panels[2].img.src.includes('bell')) {
    checkBetX(150); pointsAdded = true;
  }
}

//* pointAdd_twoPairExtraBar ---------------------------- 

function pointAdd_twoPairExtraBar() {
  if(panels[1].img.src.includes('bar') 
      && panels[2].img.src.includes('seven')) {
    checkBetX(1250); pointsAdded = true;
    confettiShower(100, 150); 
    giphyEmbedFrame('.barSeven', 48, 50, 4000);
  }
  else if(panels[1].img.src.includes('bar') 
      && panels[2].img.src.includes('diamond')) {
    checkBetX(1000); pointsAdded = true;
    confettiShower(150, 1); 
    giphyEmbedFrame('.barDiamond', 50, 50, 4000); 
  }
  else if(panels[1].img.src.includes('bar') 
      && panels[2].img.src.includes('watermelon')) {
    checkBetX(100); pointsAdded = true;
  }
  else if(panels[1].img.src.includes('bar') 
      && panels[2].img.src.includes('cherry')) {
    checkBetX(100); pointsAdded = true;
  }
  else if(panels[1].img.src.includes('bar') 
      && panels[2].img.src.includes('bell')) {
    checkBetX(100); pointsAdded = true;
  }
}

//* point rates ---------------------------------------------------

function pointRate(arg) {
  if(panels[2].img.src.includes('seven')) {
    pointsAdded = true;
      total += 5000 * arg;
      winPoint.textContent = 5000 * arg;
      confettiShower(300, 1); 
      giphyEmbedFrame('.threeSeven', 70, 53, 5000);
    winRed_add_bigSpinRed_remove();
  } else if(panels[2].img.src.includes('diamond')) {
    setTimeout(() => { //* BIG SPIN //* BIG SPIN
      panels.forEach(panel => { panel.spin(); });
      bigSpin = true;
        activeLight = true; // disabled 5x2x click  
          applyCheckOut = true;
        spinStopBtnEvent = true; // disabled spinStopBtn dblclick //*
      spinBtn.classList.add('js_inActive'); //* 
        insertPoint.classList.add('js_blank'); 
          winPoint.classList.add('js_bigSpinRed');
          bigSpinX.classList.add('js_bigSpinX');
          bigSpinX.classList.add('activate'); //***
        winPoint.textContent = 'BIG SPIN'; 
        reelHandler.classList.add('active'); //*
        reelHandler.addEventListener('click', reelAutoStop); //*
      // console.log(insertPoint); //* log
    }, 500); //* BIG SPIN //* 
  } else if(panels[2].img.src.includes('bar')) {
    pointsAdded = true;
      total += 1500 * arg;
        winPoint.textContent = 1500 * arg;
      confettiShower(150, 1); 
      giphyEmbedFrame('.bar', 55, 49, 3500);
    winRed_add_bigSpinRed_remove();
  } else if(panels[2].img.src.includes('watermelon')) {
    pointsAdded = true;
      total += 200 * arg;
        winPoint.textContent = 200 * arg;
      confettiShower(50, 150); 
      giphyEmbedFrame('.watermelon', 57, 55, 3500); //bc60/47
    winRed_add_bigSpinRed_remove();
  } else if(panels[2].img.src.includes('cherry')) {
    pointsAdded = true;
      total += 200 * arg;
        winPoint.textContent = 200 * arg;
      confettiShower(50, 100);
      giphyEmbedFrame('.cherry', 56, 65, 3000); //bc70/55
    winRed_add_bigSpinRed_remove();
  } else if(panels[2].img.src.includes('bell')) {
    pointsAdded = true;
      total += 150 * arg;
        winPoint.textContent = 150 * arg;
      confettiShower(30, 100); 
      giphyEmbedFrame('.bell', 43, 60, 3000); 
    winRed_add_bigSpinRed_remove();
  }
  // if(insertPoint.classList.contains('js_blank')) { // BIG SPIN READ TEST 
  //   console.log('contain read in pointRate');
  // }
}

//* check betX -----------------------------------------------------------

function checkBetX(arg) { // for pair & extra 
  if(bet5x.classList.contains('js_bet5x-activeEffect') 
  && bet2x.classList.contains('js_bet2x-activeEffect')) {
    if(insertPoint.classList.contains('js_blank')) { //* X POINT 
        // console.log('contain read in checkBetAmount 5x2x');
        total += arg * 100; 
          winPoint.textContent = arg * 100;
            totalPoint.textContent = total;
          winRed_add_bigSpinRed_remove();
        insertPoint.classList.remove('js_blank');
      return;
    } else {
        total += arg * 10;
          winPoint.textContent = arg * 10;
            totalPoint.textContent = total;
          winRed_add_bigSpinRed_remove();
        // console.log(' read in checkBetX 5x2x');
      return;
    }
  } else if(bet5x.classList.contains('js_bet5x-activeEffect')) {
    if(insertPoint.classList.contains('js_blank')) { //* X POINT 
        // console.log('contain read in checkBetAmount 5x');
        total += arg * 50;
          winPoint.textContent = arg * 50;
            totalPoint.textContent = total;
          winRed_add_bigSpinRed_remove();
        insertPoint.classList.remove('js_blank');
      return;
    } else {
        total += arg * 5;
          winPoint.textContent = arg * 5;
            totalPoint.textContent = total;
          winRed_add_bigSpinRed_remove();
        // console.log(' read in checkBetX 5x');
      return;
    }
  }
  if(bet2x.classList.contains('js_bet2x-activeEffect')) {
    if(insertPoint.classList.contains('js_blank')) { //* X POINT 
        // console.log('contain read in checkBetAmount 2x');
        total += arg * 20;
          winPoint.textContent = arg * 20;
            totalPoint.textContent = total;
          winRed_add_bigSpinRed_remove();
        insertPoint.classList.remove('js_blank');
      return;
    } else { 
        total += arg * 2;
          winPoint.textContent = arg * 2;
            totalPoint.textContent = total;
          winRed_add_bigSpinRed_remove();
        // console.log(' read in checkBetX 2x');
      return; 
    }
  } else {
    if(insertPoint.classList.contains('js_blank')) { //* X POINT 
        console.log('contain read in checkBetAmount 1x');
        total += arg * 10;
          winPoint.textContent = arg * 10;
            totalPoint.textContent = total;
          winRed_add_bigSpinRed_remove();
        insertPoint.classList.remove('js_blank');
      return;
    } else {
      total += arg;
        winPoint.textContent = arg;
          totalPoint.textContent = total;
        winRed_add_bigSpinRed_remove();
      console.log(' read in checkBetX 1x');
    }
  }
}

//* WIN point BIG SPIN red ----------------------------------------------------

function winRed_add_bigSpinRed_remove() {
    winPoint.classList.add('js_winRed');
  winPoint.classList.remove('js_bigSpinRed');  
}

//* players bet -------------------------------------------------------------------

function playerBet() {
  if(bet5x.classList.contains('js_bet5x-activeEffect') 
    && bet2x.classList.contains('js_bet2x-activeEffect')) {
      total -= 500;
        totalPoint.textContent = total;
    return;
  } 
  else if(bet5x.classList.contains('js_bet5x-activeEffect')) {
    total -= 250;
      totalPoint.textContent = total;
    return;
  } 
  if(bet2x.classList.contains('js_bet2x-activeEffect')) {
    total -= 100;
      totalPoint.textContent = total;
  } else {
    total -= 50;
      totalPoint.textContent = total;
  }
}

//* bet counter -----------------------------------------------------------------------

function betCounter() {
  // console.log('bet counter read in function'); //* log
  if(betCount) return; // betCounter disabled dblclick reset .notSure
    if(bet5x.classList.contains('js_bet5x-activeEffect') 
        && bet2x.classList.contains('js_bet2x-activeEffect')) {
      betAmount(500);
    return;
  } 
  else if(bet5x.classList.contains
    ('js_bet5x-activeEffect')) {
      betAmount(250);
    return;
  }
  else if(bet2x.classList.contains
    ('js_bet2x-activeEffect')) {
      betAmount(100);
    return;
  }
  else {
    betAmount(50);
  }
}

function betAmount(arg) {
  betPoint.textContent ='';
  setTimeout(() => {
      betPoint.textContent = arg;
    // console.log('bet'); //* log
  }, 50);
}

//* 5x2xBtn active effect turn off auto --------------------------------------------------

function btn5x2x_ActiveEffect_TurnOffAuto() {
  if(bet2x.classList.contains('js_bet2x-activeEffect') && total < 500) {
    reset5x_activeEffect();
  }
  if(total < 250) {
    reset5x_activeEffect();
  } if(total < 100) {
    reset2x_activeEffect();
  }                              
}

  function reset2x_activeEffect() {
      bet2x.classList.remove('js_bet2x-activeEffect'); 
    bet2x.classList.remove('js_bet2x-textColorBright'); 
  }

  function reset5x_activeEffect() {
      bet5x.classList.remove('js_bet5x-activeEffect'); 
    bet5x.classList.remove('js_bet5x-textColorBright'); 
  }

//* event insertPoint -------------------------------------------------------------------------

    const insertPoint = document.querySelector('.btn-insert');
  insertPoint.addEventListener('click', function () {
    checkOutLock = true;
    checkOutDept = false; 
    if(total > 0) return;
    total += 10000; //*** 
    currentDept += 10000; //***
    saveData(); //*** 
    winPoint.textContent = 0;
    betPoint.textContent = 0;
    totalPoint.textContent = total; 
      deptPoint.textContent = currentDept; 
        spinBtn.textContent = 'SPIN'; // rewrite textContent to SPIN 
          checkOut.textContent = 'CHECK OUT'; 
          checkOut.classList.remove('js_checkOut-lost');
            // console.log(total);  //* log
        insertPoint.classList.add('js_insertPoint-activeEffect'); // insert btn flash effect 
      insertPoint.classList.add('js_insertPoint-textColorBright');
    setTimeout(() => { 
        insertPoint.classList.remove('js_insertPoint-activeEffect');
      insertPoint.classList.remove('js_insertPoint-textColorBright');
    }, 300);
  });


const bet2x = document.querySelector('.btn-bet2x'); 
  bet2x.addEventListener('click', function () {
    if(checkOutDept) return; // (R1)
      if(total < 500 && bet5x.classList.contains('js_bet5x-activeEffect')) return; 
        if(total < 100) return; 
      checkOut.textContent = 'CHECK OUT';  // reset check out text 
    checkOut.classList.remove('js_checkOut-win', 'js_checkOut-lost'); // reset message 
      if(activeLight) return;
        if(total <= 0) return;
      bet2x.classList.toggle('js_bet2x-activeEffect'); // bets2x btn flash effect
    bet2x.classList.toggle('js_bet2x-textColorBright');
  });


const bet5x = document.querySelector('.btn-bet5x');
  bet5x.addEventListener('click', function () {
    if(checkOutDept) return; 
      if(total < 500 && bet2x.classList.contains('js_bet2x-activeEffect')) return;  // disable click 
        if(total < 250) return;  // activeEffect disable click 
      checkOut.textContent = 'CHECK OUT';  // reset check out text 
    checkOut.classList.remove('js_checkOut-win', 'js_checkOut-lost'); // reset colored 
      if(activeLight) return;
        if(total <= 0) return;
      bet5x.classList.toggle('js_bet5x-activeEffect');; // bets5x btn flash effect 
    bet5x.classList.toggle('js_bet5x-textColorBright');
  });


const checkOut = document.querySelector('.check-out');
  checkOut.addEventListener('click', function () {
    if(!checkOutLock) return;
    if(applyCheckOut) return;
    betPoint.textContent = 0;
      reset2x_activeEffect(); reset5x_activeEffect();
        if(total > currentDept) {
          checkOut.textContent = `WIN + ${total - currentDept}`;
        } else if(currentDept > total) { 
          checkOut.textContent = `LOST - ${currentDept - total}`;
        }
          if(total > currentDept) { // colored when check out 
            checkOut.classList.add('js_checkOut-win');
          } else if(total < currentDept) { // colored when check out 
            checkOut.classList.add('js_checkOut-lost');
          }
        if(total < currentDept) return; 
      if(total > currentDept) {
        totalPoint.textContent = total - currentDept;
          total = total - currentDept;
            currentDept = 0;
        deptPoint.textContent = currentDept;
        saveData() //***
      }
      if(total > currentDept) return; 
    if(!checkOutDept) { // runs only (total even currentDept) 
      deptPoint.textContent = total - currentDept;
        totalPoint.textContent = total - currentDept;
          total = 0;
            currentDept = 0;
            checkOutDept = true;
            saveData() //***
          checkOut.textContent = `LOST - ${currentDept - total}`;
      if(total === 0) {  // reset message
        spinBtn.textContent = 'INSERT MONEY TO PLAY';
      }
    } 
  }); 

const spinBtn = document.getElementById('spin');
  if(total > 0) { spinBtn.textContent = 'SPIN'}
  spinBtn.addEventListener('click', () => { 
    if(confetti) return;
    if(bigSpin) return;
      if(checkOutDept) return; 
        winPoint.textContent = 0;  // reset winPoint  
        winPoint.classList.remove('js_winRed'); // reset winRed 
      checkOut.textContent = 'CHECK OUT';  // reset // check out text 
      checkOut.classList.remove('js_checkOut-win', 'js_checkOut-lost');
    if(total < 50) return; // when point 0 disable spinBtn click event 
      spinStopBtnEvent = true;
        activeLight = true;
      applyCheckOut = true;
    spinBtn.classList.add('js_spinBtnAnimation'); // trf animation add 
    if(spinBtn.classList.contains('js_inActive')) return; // avoid dbl click
    spinBtn.classList.add('js_inActive');
    insertPoint.classList.remove('js_blank') // BIG SPIN 
    reelHandler.classList.add('active'); //*
    reelHandler.addEventListener('click', reelAutoStop); //*
      // console.log('classList removed -- js_blank'); //* log
      playerBet(); // bets point
      betCounter(); 
      betCount = true; // betCounter dblclick disabled  
      // console.log(total); //* log
    panels.forEach(panel => {
      panel.spin();
      btn5x2x_ActiveEffect_TurnOffAuto(); 
    });
  });

//* matched all sevens -------------------

  const giphy = document.querySelector('.giphy');
  let confetti = false;
  function confettiShower(quantity, num) {
    for (let i = 0; i < quantity; i++) {
      const rectangle = document.createElement('span');
      rectangle.classList.add('rectangle');
      rectangle.style.width = 7 + Math.random() * 10 + 'px';
      rectangle.style.left = Math.random() * innerWidth + 'px';
      rectangle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      rectangle.style.setProperty('--top', innerHeight + 'px');
      rectangle.style.setProperty('--skew', 15 + Math.random() * 20 +'deg');
      rectangle.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px');
      rectangle.style.setProperty('--x', (Math.random() - 0.5) * 360 + 'deg');
      rectangle.style.setProperty('--y', (Math.random() - 0.5) * 180 + 'deg');
      rectangle.style.setProperty('--scale', 1 + Math.random());
      rectangle.style.animationDelay = (i + Math.random() * num) * 0.01 + 's';
      rectangle.style.animationDuration = 1.5 + Math.random() * 1.5 + 's';
      document.body.appendChild(rectangle);
    }
    const rectangles = document.querySelectorAll('.rectangle');
    rectangles.forEach(rectangle => {
      rectangle.addEventListener('animationend', () => {
        rectangle.classList.remove('rectangle');
        rectangle.remove();
      });
    });
  }

  function giphyEmbedFrame(className, height, left, duration) {
    confetti = true;
    const elem = document.querySelector(className);
    giphy.style.setProperty('--height', height + '%');
    elem.style.setProperty('--left', left + '%');
    elem.classList.add('active');
    setTimeout(() => elem.classList.add('alpha'), 0);
    setTimeout(() => {
      confetti = false;
      elem.classList.remove('alpha');
      setTimeout(() => elem.classList.remove('active'), 2000);
      bigSpinX.classList.remove('activate');
    }, duration);
  }

//* resize randomMp4 -------------------

  const mp4s = ['img/Seoul.mp4', 'img/City.mp4'];
  const video = document.querySelector('.video');
  window.addEventListener('resize', () => {
    video.src = mp4s[Math.floor(Math.random() * mp4s.length)];
  });



// -----------------------------------------------------------------------------------------------------------------

















//* TEST Manually -----------------------------------------------------------------------------------------
  //* need to add - constructor(src) & this.img.src = src; 

  // ['img/bell.jpg','img/cherry.jpg','img/watermelon.jpg', 'img/diamond.jpg', 'img/bar.jpg', 'img/seven.jpg'];


// const panels = [ new Panel('img/diamond.jpg'), new Panel('img/bar.jpg'), new Panel('img/diamond.jpg')];

// insertPoint.classList.add('js_blank'); // bigSpinX
// bet2x.classList.add('js_bet2x-activeEffect'); // bets2x btn flash effect
// bet2x.classList.add('js_bet2x-textColorBright');
// bet5x.classList.add('js_bet5x-activeEffect'); // bets2x btn flash effect
// bet5x.classList.add('js_bet5x-textColorBright');

// document.addEventListener('click', () => {
//   checkForMatchedAll(); checkForUnMatched(); checkForTwoPairMatched(); //* JUDGEMENT // 
//   checkForTwoPairExtraSeven(); checkForTwoPairExtraDiamond(); checkForTwoPairExtraBar(); 
//   console.log('read');
// });

//* ---------------------------------------------------------------------------------------------------------











// -----------------------------------------------------------------------------------------------------------------
// メモ ---

/* pointAdd_twoPairExtraSeven, pointAdd_twoPairExtraDiamond, pointAdd_twoPairExtraBarの中で
この記述を省くことでpointAdd_matchedAllでのポイント加算した後のポイント重複を解除している */
  // else if(panels[1].img.src.includes('seven') // sevenの場合の記述 //
  // && panels[2].img.src.includes('seven')) {
  //   この記載を省くことでmatchedAllの時の重複を解除
  // }

// ---------------------------------------------------------------------------------------------
// メモ ---

// if(total < 10000) {
//   lostPoint.textContent = Math.abs(total - 10000); 
// } 


// if(total < 500 && total > 250) {
//   reset5x_activeEffect();
// } 

// -----------------------------------------------------------------------------------------------------------------








