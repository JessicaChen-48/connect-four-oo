


class Game {

    constructor(height, width, player1, player2) {
        this.height = height;
        this.width = width;
        this.board = [];
        //this.currPlayer = 1;
        this.currPlayer = player1;
        this.player1 = player1;
        this.player2 = player2;
        this.makeBoard();
        this.makeHtmlBoard();
    }

    makeBoard() {
        for (let y = 0; y < this.height; y++) {
          this.board.push(Array.from({ length: this.width }));
        }
    }

    makeHtmlBoard() {
        const htmlBoard = document.getElementById('board');
      
        // make column tops (clickable area for adding a piece to that column)
        const top = document.createElement('tr');
        top.setAttribute('id', 'column-top');
        top.addEventListener('click', this.handleClick.bind(this));
      
        for (let x = 0; x < this.width; x++) {
          const headCell = document.createElement('td');
          headCell.setAttribute('id', x);
          top.append(headCell);
        }
      
        htmlBoard.append(top);
      
        // make main part of board
        for (let y = 0; y < this.height; y++) {
          const row = document.createElement('tr');
      
          for (let x = 0; x < this.width; x++) {
            const cell = document.createElement('td');
            cell.setAttribute('id', `${y}-${x}`);
            row.append(cell);
          }
      
          htmlBoard.append(row);
        }
    }

    // only fire off handClick only if submit is hit
 
      //then run this code ->
    handleClick(evt) {
        // get x from ID of clicked cell
        const x = +evt.target.id;
      
        // get next spot in column (if none, ignore click)
        const y = this.findSpotForCol(x);
        if (y === null) {
          return;
        }
      
        // place piece in board and add to HTML table
        this.board[y][x] = this.currPlayer;
        this.placeInTable(y, x);
        
        // check for win
        if (this.checkForWin()) {
          return this.endGame(`Player ${this.currPlayer.color} won!`);
        }
        
        // check for tie
        if (this.board.every(row => row.every(cell => cell))) {
          return this.endGame('Tie!');
        }
          
        // switch players
        //this.currPlayer = this.currPlayer === 1 ? 2 : 1;
        this.currPlayer = this.currPlayer === this.player1 ? this.player2 : this.player1;
    }
  

    findSpotForCol(x) {
        for (let y = this.height - 1; y >= 0; y--) {
          if (!this.board[y][x]) {
            return y;
          }
        }
        return null;
    }

    placeInTable(y, x) {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        piece.style.top = -50 * (y + 2);

        //piece.style.backgroundColor = this.currPlayer === 1 ? this.player1.color : this.player2.color;
        piece.style.backgroundColor = this.currPlayer === this.player1 ? this.player1.color : this.player2.color;
      
        const spot = document.getElementById(`${y}-${x}`);
        spot.append(piece);
    }

    endGame(msg) {
        alert(msg);
    }

    checkForWin() {

        let _this = this

        function _win(cells) {
          // Check four cells to see if they're all color of current player
          //  - cells: list of four (y, x) cells
          //  - returns true if all are legal coordinates & all match currPlayer

          //_win = _win.bind(this)
      
          return cells.every(
              ([y, x]) =>
              y >= 0 &&
              y < _this.height &&
              x >= 0 &&
              x < _this.width &&
              _this.board[y][x] === _this.currPlayer
          );
        }
      
        for (let y = 0; y < this.height; y++) {
          for (let x = 0; x < this.width; x++) {
            // get "check list" of 4 cells (starting here) for each of the different
            // ways to win
            const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      
            // find winner (only checking each win-possibility as needed)
            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
              return true;
            }
          }
        }
      }
}

class Player {
  constructor(color) {
    this.color = color;
  }
}


const form = document.querySelector("#generate-players");

const player1FormValue = document.querySelector("#player1")
const player2FormValue = document.querySelector("#player2")

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let player1 = new Player(player1FormValue.value)
    let player2 = new Player(player2FormValue.value)

    new Game(6, 7, player1, player2);
});





