  // let playing = document.querySelector('.playing');
  // let again = document.querySelector('.play-again');

  // window.addEventListener('load', () => {
  //   playing.classList.add('margin-transform');
  //   again.classList.add('scaling');
  // });

// CALCULATION ELEMENTS 
let things;
let rand;
let you;
let house;
let youSel, comSel;
let yourScore = 0, comScore = 0;


// SELECTED QUERIES   
let select = {
  rulesBtn : document.querySelector('.rulebtn'),
  closeBtn : document.querySelector('.closebtn'),
  ruleSec : document.querySelector('.rules'), // display: flex / none
  playSec : document.querySelector('.play'), // display: block / none
  playingSec : document.querySelector('.playing'), // display: flex / none
  pagainBtn : document.querySelector('.play-again'), // display: block / none
  clickIcon : document.querySelectorAll('.icon-click'),
  againStr : document.querySelector('.play-again .head span'),
  yourScore: document.querySelector('.yourScore'),
  comScore: document.querySelector('.comScore'),
  calcArr : []
};

// UPDATE UI WITH THE RESPECTIVE SELECTED THING 
let updateThing = (className) => {
  let html = `<div class="icon"><div class="${className}"><img src="./images/icon-${className}.svg" alt="${className} ICON" width="35px" height="35px">
              </div></div>`;

  select.playingSec.insertAdjacentHTML('beforeend', html);
}

// WILL SHOW WON OR LOSE 
let showAgain = (str) => {

  // UPDATE PLAY AGAIN STRING 
  select.againStr.textContent = str;

  // UPDATE SCORE TO 0 
  yourScore = 0;
  comScore = 0;

  // UPDATING UI WITH PLAY AGAIN BUTTON
  setTimeout( () => {
    select.pagainBtn.style.display = 'block';
    select.playingSec.classList.add('margin-transform');
    select.pagainBtn.classList.add('scaling');
  }, 500);  
}

// UPDATING UI WITH THE PLAY SECTION 
let updateUI = () => {
  select.playSec.style.display = 'block';
  select.playingSec.style.display = 'none';
}

// UPDATE SCORE FUNCTION 
let updateScore = () => {
  
  // ADDING 1 TO SCORE 
  yourScore++;

  // UPDATING UI WITH SCORE 
  select.yourScore.textContent = yourScore;

}

// CALCULATE SCORE FUNCTION 
let calcScore = (arr) => {
  you = arr[0];
  house = arr[1];

  if(you == 'rock' && house != 'paper') {
    updateScore();
  } else if( you == 'paper' && house != 'scissors') {
      updateScore();
    } else if ( you == 'scissors' && house != 'rock') {
        updateScore();
      } else {
          comScore++;
          select.comScore.textContent = comScore; 
      }
  
  //UPDATING UI 
  select.playSec.style.display = 'none';
  select.playingSec.style.display = 'flex';

  // TO GET BACK PLAY SECTION UI IN 2 SECONDS
  if( yourScore < 3 && comScore < 3 ) {
    setTimeout(updateUI, 2000);
  }
  
  if( yourScore == 3 ) {
    showAgain('WON');
  } 
  if( comScore == 3 ) {
    showAgain('LOSE');
  }
}

//FUNCTION FOR GAME STARTING ( SELECTING THING WITH CLICK )
select.clickIcon.forEach( cur => cur.addEventListener('click', (e) => {
  e.preventDefault();

  // RESETTING THE DISPLAYING OF THINGS 
  select.playingSec.innerHTML = "";
  
  // COMPUTER RANDOM FUNCTION 
  let comp = () => {
    things = ['rock', 'paper', 'scissors'];
    rand = Math.round(Math.random() * 2);
    comSel = things[rand];

    if(comSel != youSel) {
      select.calcArr.push(comSel);
      updateThing(comSel);

      //CALCULATING SCORE
      calcScore(select.calcArr);
      select.calcArr = [];
      // console.log(score);
    } 
      else {
        comp();
      }   
  }

  // FUNCTION FOR THE USER
  if(e.target.classList.contains('icon-click')) {
    select.calcArr.push(e.target.classList[0]);

    youSel = e.target.classList[0];

    updateThing(e.target.classList[0]);
    comp();
  } 
    else if ( e.target.parentNode.classList.contains('icon-click') ) {
      select.calcArr.push(e.target.parentNode.classList[0]);

      youSel = e.target.parentNode.classList[0];

      updateThing(e.target.parentNode.classList[0]);
      comp();
    }

  select.playingSec.style.display = 'flex';
})
);

// ON CLICK OF PLAY AGAIN BUTTON 
select.pagainBtn.addEventListener('click', () => {
  
  // UPDATING SCORE TO ZERO 
  select.yourScore.textContent = '0';
  select.comScore.textContent = '0';

  //UPDATING UI 
  select.playSec.style.display = 'block';
  select.playingSec.style.display = 'none';
  
  // UPDATING PLAY AGAIN FUNCTIONS
  select.pagainBtn.style.display = 'none';
  select.pagainBtn.classList.remove('scaling');
  select.playingSec.classList.remove('margin-transform');   

});

// ON CLICK OF RULES BUTTON 
select.rulesBtn.addEventListener('click', () => {
  select.ruleSec.style.display = "flex";
});

// ON CLICK OF CLOSE BUTTON ON RULES SECTION 
select.closeBtn.addEventListener('click', () => {
  select.ruleSec.style.display = "none";
});