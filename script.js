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