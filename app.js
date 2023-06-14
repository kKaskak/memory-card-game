const cards = document.querySelectorAll(".memory-card");

let cardIsFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  // this.classList.toggle("flip"); // toggle the class
  this.classList.add("flip");

  if (!cardIsFlipped) {
    //  First click -> first card
    cardIsFlipped = true;
    firstCard = this;
    return;
  }
  //  second click -> second card
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatched = secondCard.dataset.name === firstCard.dataset.name;
  isMatched ? disableCards() : unFlipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}
function unFlipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [cardIsFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// IIFE -> Immediately Invoked Function Expression
// -> function is called immediately after its definition
(function shuffle() {
  cards.forEach((card) => {
    let randomPositions = Math.floor(Math.random() * 12);
    card.style.order = randomPositions;
  });
})();

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
