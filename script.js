const PlayerFactory = (sign) => {

    const getSign = () => {
        return sign;
    };

    return { getSign };
}

const gameBoard = (() => {

    let board = ["", "", "", "", "", "", "", "", ""];

    const setSquare = (index, symbol) => {
        board[index] = symbol;
    };

    const getSquare = (index) => {
        return board[index];
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++)
        {
            board[i] = "";
        }
    };

    return { setSquare, getSquare, reset };
})(); 

const gameController = (() => {

    const player1 = PlayerFactory("X");
    const player2 = PlayerFactory("O");

    let round = 0;
    let isOver = false;

    const getRound = () => {
        return round; 
    };

    const getIsOver = () => {
        return isOver;
    };

    const reset = () => {
        round = 1;
        isOver = false;
    };

    const getCurrentPlayerSign = () => {
        if (round % 2 == 0)
        {
            return player2.getSign(); 
        }
        else 
        {
            return player1.getSign();
        }
    };

    const getCurrentPlayerName = () => {
        if (round % 2 == 0)
        {
            return "Player 2";
        }
        else 
        {
            return "Player 1";
        }
    };  

    const playRound = (squareIndex) => {
        gameBoard.setSquare(squareIndex, getCurrentPlayerSign());
        if (checkWinner())
        {
            isOver = true;
            round += 1;
            return;
        }
        if (round === 9)
        {
            isOver = true;

            return;
        }
        round += 1;
    };

    return { getRound, getIsOver, reset, playRound, getCurrentPlayerSign, getCurrentPlayerName };

})();