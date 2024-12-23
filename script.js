const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const newGameBtn = document.getElementById('new-game-button');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.getAttribute('data-index'));

    if (gameBoard[index] !== '' || !gameActive) {
        return;
    }

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.cursor = 'not-allowed'; // Disable click after selection
    checkWinner();
    if(gameActive){
      switchPlayer();
      updateStatus();
    }
}

function checkWinner() {
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            modalMessage.textContent = `Player ${currentPlayer} wins!`;
             modal.classList.add('show');
            gameActive = false;
            return;
        }
    }
  
    if (!gameBoard.includes('')) {
         modalMessage.textContent = "It's a draw!";
        modal.classList.add('show');
        gameActive = false;
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function updateStatus(){
    status.textContent = `Player ${currentPlayer}'s turn`
}

function resetGame(){
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.cursor = 'pointer';
    });
    currentPlayer = 'X';
    gameActive = true;
    modal.classList.remove('show');
    updateStatus();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame)
newGameBtn.addEventListener('click', resetGame)

updateStatus();