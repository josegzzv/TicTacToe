
const Board = () => {
    // 1st player is X ie 1
    // State keeps track of next player and gameState
    const [player, setPlayer] = React.useState(1);
    const [gameEnd, setGameEnd] = React.useState(false);
    const [newGame, setNewGame] = React.useState(false);
    const [tikMatrix, setTikMatrix] = React.useState([2,2,2,2,2,2,2,2,2]);
    const [gameState, setGameState] = React.useState([]);
    let winPlayer =checkForWinner(gameState);
    let status = `Winner is ${winPlayer}`;
  
    // Part 1 step 1 code goes here
    // Use conditional logic to set a variable to either 'Player O' or  'Player X'
    let playerTurn = "";
    if(winPlayer=="Player O " || winPlayer =="Player X "){
        //setGameEnd(true);
        playerTurn = `Next Player: --`;
        console.log(`We hav a winner ${status}`);
    }else {
        playerTurn = `Next Player: ${player == '0' ? 'Player O' : 'Player X'}`;
    }

    const takeTurn = (id) => {
      setGameState([...gameState, { id: id, player: player }]);
      setPlayer((player + 1) % 2); // get next player
      if(winPlayer=="Player O " || winPlayer =="Player X "){
        setGameEnd(true);}
      return player;
    };

    const startNewGame = () => {
        setGameEnd(false);
        setGameState([]);
        setTikMatrix([2,2,2,2,2,2,2,2,2])
        setPlayer(1);
        winPlayer="";
    }

    function renderSquare(i) {
      // use properties to pass callback function takeTurn to Child
      if(winPlayer=="Player O " || winPlayer =="Player X "){
        let gameover=true;
        return <Square takeTurn={takeTurn} id={i} gameEnd={gameover} tikMatrix={tikMatrix} setTikMatrix={setTikMatrix}></Square>
      } else 
      return <Square takeTurn={takeTurn} id={i} gameEnd={gameEnd} tikMatrix={tikMatrix} setTikMatrix={setTikMatrix}></Square>;
    }
  
    return (
      <div className="game-board">
        <div className="grid-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="grid-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="grid-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <div id="info">
         {(winPlayer!="Player O " && winPlayer !="Player X ") && <h1 id="turn" className="white">{playerTurn}</h1>}
          {(winPlayer=="Player O " || winPlayer =="Player X ") && <h1 className={winPlayer=="Player O " ? 'white' : 'red'}>{status}</h1>}
          <button id="newGame"
          className='newgame'
          onClick={startNewGame}
          >New Game</button>
        </div>
      </div>
    );
  };
  
  const Square = ({ takeTurn, id, gameEnd, tikMatrix, setTikMatrix }) => {
    const mark = ['O', 'X', '+'];
    // id is the square's number
    // filled tells you if square has been filled
    // tik tells you symbol in square (same as player)
    // You call takeTurn to tell Parent that the square has been filled
    const [filled, setFilled] = React.useState(false);
    //const [tik, setTik] = React.useState(2); //Using a global useState
    
    return (
        <button
        // Part 2: update the return statement below to add css classes
        className={ tikMatrix[id] == 1 ? 'red' : 'white'}
        onClick={() => {
            if(!gameEnd){
                let playertik =takeTurn(id);
                const newMartix = tikMatrix.map((c, i) => {
                    if (i === id) {
                      // Increment the clicked counter
                      return playertik;
                    } else {
                      // The rest haven't changed
                      return c;
                    }
                  });
                setTikMatrix(newMartix);
                setFilled(true);
                console.log(`Square: ${id} filled by player : ${playertik}`);
            }
        }}
      >
        <h1>{mark[tikMatrix[id]]}</h1>
      </button>
    );
  };
  
  const Game = () => {
    return (
      <div className="game">
        <Board></Board>
      </div>
    );
  };
  
  // Checking for Winner takes a bit of work
  // Use JavaScript Sets to check players choices
  // against winning combinations
  // Online there is more compact version but I prefer this one
  
  const win = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // cols
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  const checkPlayerTurn = (gameState) => {
    return gameState.player;
  };
  
  const checkForWinner = (gameState) => {
    // get array of box id's
    // can't be a winner in less than 5 turns
    if (gameState.length < 5) return 'No Winner Yet';
    let p0 = gameState.filter((item) => {
      if (item.player == 0) return item;
    });
    p0 = p0.map((item) => item.id);
    let px = gameState.filter((item) => {
      if (item.player == 1) return item;
    });
    px = px.map((item) => item.id);
    if (p0 != null && px != null) {
      var win0 = win.filter((item) => {
        return isSuperset(new Set(p0), new Set(item));
      });
      var winX = win.filter((item) => {
        return isSuperset(new Set(px), new Set(item));
      });
    }
    if (win0.length > 0) {
        return 'Player O ';
    }
    else if (winX.length > 0) {
        return 'Player X ';
    };
    return 'No Winner Yet';
  };
  // check if subset is in the set
  function isSuperset(set, subset) {
    for (let elem of subset) {
      if (!set.has(elem)) {
        return false;
      }
    }
    return true;
  }
  
  // ========================================
  
  ReactDOM.render(<Game />, document.getElementById('root'));
  