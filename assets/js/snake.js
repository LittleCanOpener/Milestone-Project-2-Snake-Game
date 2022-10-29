const snakeBody = [];
// _____________________________ Variables _______________________________ 
// Board
let blockSize = 25;
let x = 25; // Column
let y = 25; // Rows
let board = document.getElementById('board');
// Snake Head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
// Snake Speed
let velocityX = 0;
let velocityY = 0;
// Food
let foodX;
let foodY;
// Game over
let gameOver = false;

// _____________________________ Event Listeners _______________________________ 
document.addEventListener("DOMContentLoaded", function(){
document.addEventListener("keyup", control)
createBoard()
startGame()
playAgain.addEventListener("click", replay);
})


window.onload = function() {
    board = document.getElementById("board");
    board.height = x * blockSize;
    board.width = y * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // Update Every =
    setInterval(update, 1000/10);
}
// _____________________________ FUNCTIONS _______________________________ 
function update() {
    if (gameOver) {
        return;
    }
// Board
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);
// Food
    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
//Check if snake hits food
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
// Snake
    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
// Game Over
    if (snakeX < 0 || snakeX > x * blockSize -1 || snakeY < 0 || snakeY > y * blockSize -1) {
        gameOver = true;
        if (gameOver) {
            if (confirm('You lost. Press ok to restart.')){
                location.reload()
            }
            return
        }
    }
}
//_____________________________ Key Bindings _______________________________ 
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
        update()
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
        update()
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
        update()
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
        update()
    }
}
//_____________________________ Place Food _______________________________ 
function placeFood() {
    foodX = Math.floor(Math.random() * x) * blockSize;
    foodY = Math.floor(Math.random() * x) * blockSize;
}
//_____________________________ GRID _______________________________ 
function outsideGrid(postion){
    return (
        postion.snakeX < 1 || postion.snakeX > blockSize ||
        postion.snakeY < 1 || postion.snakeY > blockSize
        )
}
//_____________________________ GAMEOVER _______________________________ 
function main() {
    if (gameOver) {
        if (confirm('You lost. Press ok to restart.')){
            window.location = '/'
        }
        return
    }
}
function checkDeath() {
    gameOver = outsideGrid(SnakeHead()) || Intersection()
  }

function SnakeHead() {
    return snakeBody[0]
  }
  
function Intersection() {
    return onSnake(snakeBody[0], { ignoreHead: true })
  }

function checkDeath() {
    gameOver = outsideGrid(SnakeHead()) || Intersection()
}