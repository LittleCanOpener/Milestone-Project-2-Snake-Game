function main() {
    if (gameOver) {
        if (confirm('You lost. Press ok to restart.')){
            window.location = './'
        }
        return
    }
}


function board() {
    context.fillstyle="black"
    context.fillRect(0, 0, board.width, board.height)
}


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



//Break down!

function board() {
    context.fillstyle="black";
    context.fillRect(0, 0, board.width, board.height);
}
function placeFood() {
    foodX = Math.floor(Math.random() * x) * blockCount;
    foodY = Math.floor(Math.random() * x) * blockCount;
}
// Food !
function food() {
    context.fillstyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
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
}
// Snake !
function snake() {
    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);}
}

function collision() {
    if (snakeX < 0 || snakeX > x * blockSize -1 || snakeY < 0 || snakeY > y * blockSize -1) {
        gameOver = true;
        if (gameOver) {
            if (confirm('You lost. Press ok to restart.')){
                window.location.reload();
            }
            return
        }
    }
}


//____________________________________________________________

function checkDeath() {
    gameOver = outsideGrid(SnakeHead()) || Intersection()
  }

//____________________________________________________________

function SnakeHead() {
    return snakeParts[0]
  }

//____________________________________________________________

function Intersection() {
    return onSnake(snakeParts[0], { ignoreHead: true })
  }

//____________________________________________________________