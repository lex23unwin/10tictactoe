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
        displayController.setMessageElement(`${gameController.getCurrentPlayerName()} has chosen
        spot ${index}`);
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
            displayController.setMessageElement(`${getCurrentPlayerName()} wins! Play again?`);
            return;
        }
        if (round === 9)
        {
            isOver = true;
            console.log(round)
            displayController.setMessageElement("Draw! Play again?")
            return;
        }
        round += 1;
        console.log(round);
    };

    const checkWinner = () => {
        if (gameBoard.getSquare(0) === gameBoard.getSquare(1) && gameBoard.getSquare(1) === gameBoard.getSquare(2) && gameBoard.getSquare(0) !== '') {return true} 
        else if (gameBoard.getSquare(3) === gameBoard.getSquare(4) && gameBoard.getSquare(4) === gameBoard.getSquare(5) && gameBoard.getSquare(3) !== '') {return true} 
        else if (gameBoard.getSquare(6) === gameBoard.getSquare(7) && gameBoard.getSquare(7) === gameBoard.getSquare(8) && gameBoard.getSquare(6) !== '') {return true} 
        else if (gameBoard.getSquare(0) === gameBoard.getSquare(3) && gameBoard.getSquare(3) === gameBoard.getSquare(6) && gameBoard.getSquare(0) !== '') {return true} 
        else if (gameBoard.getSquare(1) === gameBoard.getSquare(4) && gameBoard.getSquare(4) === gameBoard.getSquare(7) && gameBoard.getSquare(1) !== '') {return true} 
        else if (gameBoard.getSquare(2) === gameBoard.getSquare(5) && gameBoard.getSquare(5) === gameBoard.getSquare(8) && gameBoard.getSquare(2) !== '') {return true} 
        else if (gameBoard.getSquare(0) === gameBoard.getSquare(4) && gameBoard.getSquare(4) === gameBoard.getSquare(8) && gameBoard.getSquare(0) !== '') {return true} 
        else if (gameBoard.getSquare(2) === gameBoard.getSquare(4) && gameBoard.getSquare(4) === gameBoard.getSquare(6) && gameBoard.getSquare(2) !== '') {return true} 
        else { return false; }
    };

    return { getRound, getIsOver, reset, playRound, getCurrentPlayerSign, getCurrentPlayerName };

})();

const displayController = (() => {

    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach( (eachSquare) => {
        eachSquare.addEventListener("click", (e) => {
            if (e.target.textContent === "" && (!gameController.getIsOver()))
            {
                gameController.playRound(e.target.id);
                e.target.textContent = gameController.getCurrentPlayerSign();
            }
        })
    });

    const restartButton = document.querySelector("#restart-button")
    restartButton.addEventListener("click", () => {
        gameBoard.reset();
        gameController.reset();
        allSquares.forEach( (eachSquare) => {
            eachSquare.textContent = "";
        })
    });

    const messageContainer = document.querySelector(".message-container")
    const setMessageElement = (message) => {
        messageContainer.textContent = message;
    };

    return { setMessageElement };

})();