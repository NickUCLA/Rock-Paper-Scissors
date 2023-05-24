let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement()
/*
if (!score) {
  score = {
    wins: 0,
  losses: 0,
  ties: 0
};
}*/
const autoplayButton = document.querySelector('.js-auto-play-button')
let isAutoPlaying = false;
let intervalID; // setInterval creates an ID, we can use this ID to stop the interval from runing, we placed this var outside of the below function because the interval ID changes everytime it is ran.

// this is an example of how to toggle Auto Play button with a function, a simplified way is in autoPlay() however.
/*
function stopPlaying() {
  if (autoplayButton.classList.contains('stop-playing')) {
    autoplayButton.innerHTML = 'Stop Playing'
    autoplayButton.classList.remove('stop-playing')
  } else {
    autoplayButton.innerHTML = 'Auto Play'
    autoplayButton.classList.add('stop-playing')
  }
};
*/

// const autoplay = () => {} is the arrow function version of below
function autoPlay() {
  if (!isAutoPlaying) { // if we are not isAutoPlaying then start
    intervalID = setInterval(() => { // have to make a function inside of setInterval, instead of having just (playGame(pickComputerMove()))
      const playerMove = pickComputerMove()
      playGame(playerMove)
    }, 1000);
    isAutoPlaying = true // change isAutoPlaying to true because if this code runs we are playing
    autoplayButton.innerHTML = 'Stop Playing'
  } else {
    clearInterval(intervalID); // this stops setInterval from running by using the unique ID created everytime it is ran
    isAutoPlaying = false; // change this var back to false so the code can run next time it is clicked
    autoplayButton.innerHTML = 'Auto Play'
  }
};

autoplayButton.addEventListener('click', () => {
  autoPlay()
  updateScoreElement()
});

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    resetScore()
  });

function resetScore() {
  document.querySelector('.reset-score-display')
    .innerHTML = `Are you sure you want to reset the score? <button class="yes-button reset-score-button">Yes</button> <button class="no-button reset-score-button">No</button>`

  document.querySelector('.yes-button')
    .addEventListener('click', () => {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updateScoreElement();
      document.querySelector('.reset-score-display')
        .innerHTML = ''
    });

  document.querySelector('.no-button')
    .addEventListener('click', () => {
      document.querySelector('.reset-score-display')
        .innerHTML = ''
    });
};

document.body.addEventListener('keydown', (event) => {// This adds eventListener keydown to anywhere in the body, similar to onkeydown
  if (event.key === 'r') {  // console.log(event.key) to see what key is being used
    playGame('rock')
  } else if (event.key === 'p') {
    playGame('paper')
  } else if (event.key === 's') {
    playGame('scissors')
  } else if (event.key === 'a') {
    autoPlay()
  } else if (event.key === 'Backspace') {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = ''

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  updateScoreElement()

  localStorage.setItem('score', JSON.stringify(score
  ));

  document.querySelector('.js-picks')
    .innerHTML = `you
<img src="assets/${playerMove}-emoji.png" class="move-icon">
<img src="assets/${computerMove}-emoji.png" class="move-icon">
computer`;

  document.querySelector('.js-result')
    .innerHTML = result;
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}
