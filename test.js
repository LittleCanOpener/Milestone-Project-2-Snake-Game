// Game loop-to continously update the screen
function drawGame(){
    changeSnakeDirection();

    let result=isGameOver();
    if(result){
        return;
    }
    clearScreen();
    drawSnake();
    drawFood();

    checkCollision()
    drawScore();
    setTimeout(drawGame, 1000/speed); // update screen 7 times a second
}

function isGameOver(){
    let gameOver = flase; 
    //check whether game has started
    if(velocity===0 && velocity===0){
        return flase;
    }
    if (headX<0){//Collision Left wall.
        gameOver=true;
    }
    else if (headX===tileCount){//Collision Right wall.
        gameOver=true;
    }
    else if (headY<0){//Collision Top wall.
        gameOver=true;
    }
    else if (headY===tileCount){//Collision Bottom wall.
        gameOver=true;
    }
    for(let i=0; i<snakeParts.length;i++){
        let snakePart=[i];
        if(part.x===headX && part.y===headY){ //snake cannot occupy the same space
            gameOver=true;
            break; //break out of the loop
        }
    }
    if (gameOver){
        ctx.fillstyle="white"
        ctx.font="50px verdana";
        ctx.fillText("Game Over!", canvas.clientWidth/6.5, canvas.clientHeight/2); //Text Centered.
    }
    return gameOver; // Stop the execution of drawgame.
}
function drawScore(){
    ctx.fillstyle="White"//Color of the Text
    ctx.font="10px"
    ctx.fillText("Score: " +score, canvas.clientWidth-50,10); // Position set to the right hand corner
}
function clearScreen(){
    ctx.fillstyle="Black" // Screen set to black
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight) // Black color starts from 0px left, right to canvas width and canvas height
}
function drawSnake(){
    ctx.fillstyle="green";
    // loop through your snakeparts array
    for(let i=0;i<snakeParts.length;i++){
        let part=snakeParts[i]
        ctx.fillRect(part.x *tileCount, part.y *tileCount, tileSize,blockSize)
    }
    snakeParts.push(new snakePart(headX, headY));//put item at the end of list next to the head
    if (snakeParts.length>tailLength){
        snakeParts.shift();//remove furthest item from  snake part if we have more than our tail size
    } 
    function changeSnakePosition(){
        headX=headX + velocityX;
        headY=headY + velocityY;
    }
    function drawFood(){
        ctx.fillstyle="red";
        ctx.fillRect(foodX*tileCount, foodY*blockSize, blockSize, blockSize)
    }
     // check for collision and change apple position
    function checkCollision(){
        if(foodX==headX && foodY==headY){
            foodX=Math.floor(Math.random()*tileCount);
            foodY=Math.floor(Math.random()*tileCount);
            tailLength++;
            score++; //increase our score value
        }
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