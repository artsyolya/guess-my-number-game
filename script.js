"use strict";

// buttons declarations
const newBtn = document.querySelector(".btn--new");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");

// other DOM declarations
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
const score0EL = document.getElementById("score--0");
const score1EL = document.getElementById("score--1");
const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");
const dice = document.querySelector(".dice");

// regular variable initializations
let scores, current, activePlayer, playing;

// functions
const init = function () {
  // set regular variables
  scores = [0, 0];
  current = 0;
  activePlayer = 0;
  playing = true;

  // reset DOM
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  dice.classList.add("hidden");
  player0EL.classList.add("player--active");
  player1EL.classList.remove("player--active");
  player0EL.classList.remove("player--winner");
  player1EL.classList.remove("player--winner");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  current = 0;
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
};

rollBtn.addEventListener("click", function () {
  if (playing) {
    // roll dice between 1 and 6
    const random = Math.trunc(Math.random() * 6) + 1;
    dice.src = `img/dice-${random}.png`;
    dice.classList.remove("hidden");

    // if  dice !== 1, add dice num to current score
    if (random !== 1) {
      current += random;
      document.getElementById(`current--${activePlayer}`).textContent = current;

      // if dice === 1, switch player & reset current score
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener("click", function () {
  if (playing) {
    // store the current points in active player's score
    scores[activePlayer] += current;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if player wins, if score >= 100
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      dice.classList.add("hidden");
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

newBtn.addEventListener("click", init);
