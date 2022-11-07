function main() {
    if (gameOver) {
        if (confirm('You lost. Press ok to restart.')){
            window.location = './'
        }
        return
    }
}


if (gameOver){
    context.fillStyle="white";
    context.font="50px verdana";
    context.fillText("Game Over! ", board.clientWidth/6.5, board.clientHeight/2); 
    //Text Centered.
}
return gameOver=true; // Stop the execution of drawgame



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
    if (headX < 0 || headX > x * blockSize -1 || headY < 0 || headY > y * blockSize -1) {
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
    return snakeBody[0]
  }

//____________________________________________________________

function Intersection() {
    return onSnake(snakeBody[0],)
  }

//____________________________________________________________
function outsideGrid() {
    return (    
        postition.x < 1 || postition.x > blockCount ||
        postition.y < 1 || postition.y > blockCount)
}

//JAJAJAJAJA
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