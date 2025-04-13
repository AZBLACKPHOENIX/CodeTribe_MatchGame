document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector('.game_grid');
    const restartBtn = document.querySelector('#restart');
    const moveDisplay = document.querySelector('#move_counter');
  
    const alphas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    let cards = [...alphas, ...alphas];
  
    let flippedCards = [];
    let lockBoard = false;
    let moves = 0;
    let matches = 0;
  
    function shuffle() {
      cards.sort(() => Math.random() - 0.5);
    }
  
    function createBoard() {
      shuffle();
      grid.innerHTML = "";
      flippedCards = [];
      lockBoard = false;
      moves = 0;
      matches = 0;
      moveDisplay.textContent = "Moves: 0";
  
      cards.forEach(letter => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.alphas = letter;
        card.textContent = "?";
        card.addEventListener("click", flipCard);
        grid.appendChild(card);
      });
    }
  
    function flipCard() {
      if (lockBoard) return;
      if (this.classList.contains("flipped")) return;
  
      this.classList.add("flipped");
      this.textContent = this.dataset.alphas;
      flippedCards.push(this);
  
      if (flippedCards.length === 2) {
        lockBoard = true;
        setTimeout(checkMatch, 800);
      }
    }
  
    function checkMatch() {
      const [card1, card2] = flippedCards;
  
      if (card1.dataset.alphas === card2.dataset.alphas) {
        matches++;
        flippedCards = [];
        lockBoard = false;
  
        if (matches === 8) {
          setTimeout(() => {
            const title = getTitle(moves);
            alert(`You won in ${moves} moves!\nTitle: ${title}`);
          }, 500);
        }
      } else {
        setTimeout(() => {
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          card1.textContent = "?";
          card2.textContent = "?";
          flippedCards = [];
          lockBoard = false;
        }, 1000);
      }
  
      moves++;
      moveDisplay.textContent = `Moves: ${moves}`;
    }
  
    function getTitle(moves) {
      if (moves <= 12) return "Master of the Dark Arts";
      if (moves <= 16) return "Memory Maestro ";
      if (moves <= 20) return "Skilled Sorcerer ";
      if (moves <= 24) return "Apprentice Wizard 🪄";
      return "Fumbling Muggle";
    }
  
    restartBtn.addEventListener("click", createBoard);
  
    createBoard();
  });
  