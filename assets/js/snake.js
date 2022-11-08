// _____________________________ Variables _______________________________
// Board
var blockCount = 25;
var x = 20;
var y = 20;
var board;
var context;
// Snake
var headX = blockCount * 5;
var headY = blockCount * 5;
// Snake Array
var snakeBody=[];
// Snake Speed
var velocityX = 0;
var velocityY = 0;
// Food
var foodX;
var foodY;
// Game Over
var gameOver = false;
// Score
var score = 0;

// ____________________________________________________________ Main Function
window.onload = function(){
    document.addEventListener("keyup", changeDirection); // Allows the user to start the game by going up
    document.addEventListener("keydown", changeDirection); // Allows the user to start the game by going down
    document.addEventListener("keyleft", changeDirection); // Allows the user to start the game by going left
    document.addEventListener("keyright", changeDirection); // Allows the user to start the game by going right
    placeFood();
    setInterval(update, 1000/10); // Run Update Function 100 Times Milliseconds
}
// ____________________________________________________________ Update Function
function update(){
    if (gameOver) {
        return;
    }
    intersection(); // Check intersection
    drawBoard(); // Draw the board
    drawFood(); // Draw the food
    drawSnake(); // Draw the snake
    drawScore(); // Draw the score
    checkDeath(); // Check Death
    
}
//____________________________________________________________  Score Function
function drawScore(){
    
    context.fillStyle="white"; //Color of the Text
    context.font="15px verdana"
    context.fillText("Score: " +score, board.clientWidth-80,20); // Position set to the right hand corner
    //80 = Left and right 20 = up and down
}
//____________________________________________________________  Board Function
function drawBoard(){
    board=document.getElementById('board');
    context=board.getContext('2d');
    board.height = x * blockCount;
    board.width = y * blockCount; // Drawing the board

    context.fillStyle="black"; // Screen set to black
    context.fillRect(0, 0, board.width, board.height);
    // Black color starts from 0px left, right to board width and board height
}
//____________________________________________________________  Snake Function
function drawSnake() {
    context.fillStyle="lime";
    headX += velocityX * blockCount;
    headY += velocityY * blockCount;
    context.fillRect(headX, headY, blockCount, blockCount);
//__________
    for (let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockCount, blockCount);
    }
//__________
    for (let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
//__________
    if (snakeBody.length){
        snakeBody[0] = [headX, headY];
    }
//__________
    if (headX == foodX && headY == foodY){
        snakeBody.push([foodX, foodY]);
        placeFood(); // place a new food.
        score++; // increase score
    }
}
//____________________________________________________________  Food Function
function drawFood(){
    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockCount, blockCount);
}
//____________________________________________________________ Random Food Placement Function
function placeFood(){
    foodX = Math.floor(Math.random() * x) * blockCount;
    foodY = Math.floor(Math.random() * y) * blockCount;
}
//____________________________________________________________ Key Bindings Function
function changeDirection(e){
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}
//____________________________________________________________ Grid Collision & Restart
function checkDeath(){
    if (headX < 0 || headX > x * blockCount -1 || headY < 0 || headY > y * blockCount -1) {
        gameOver=true;
        if (gameOver) {
            if (confirm('You lost. Press ok to restart.')){
                window.location.reload("./");
            }
            return gameOver;
        }
    }
}
//____________________________________________________________ Intersection
function intersection() {
    for (let i = 0; i < snakeBody.length; i++) {
        if (headX == snakeBody[i][0] && headY == snakeBody[i][0]) { // PROBLEM IS HERE!  
            gameOver=true;
        if (gameOver) {
            if (confirm('You lost. Press ok to restart.')){
                window.location.reload("./");
            }
            return gameOver;
        }
    }
  }
}
//____________________________________________________________


// Check death / Check collision 