const canvas=document.getElementById('board');
const ctx=canvas.getContext('2d');
class snakePart{
    constructor(x, y){
        this.x=x;
        this.y=y;
    }
}
// _____________________________ Variables _______________________________ 
// Board
let speed = 7;
let blockSize = 20;
let x = 25; // Column
let y = 25; // Rows
// Snake
const snakeBody = [];
let tailLength = 2;
let snakeX = 10;
let snakeY = 10;
// Snake Speed
let velocityX = 0;
let velocityY = 0;
// Food
let foodX = 5;
let foodY = 5;
// Game over
let gameOver = false;
let score = 0;

// _____________________________ FUNCTIONS _______________________________ 

function drawGame(){
    changeDirection();
    // game over logic
    let result=isGameOver();
    if(result){// if result is true
        return;
    }
    clearScreen();
    drawSnake();
    placeFood();

    checkCollision()
    drawScore();
    setTimeout(drawGame, 1000/speed); // update screen 7 times a second
}

//____________________________________________________________ 

function isGameOver(){
    let gameOver = flase; 
    //check whether game has started
    if(velocityY===0 && velocityX===0){
        return flase;
    }
    if (snakeX<0){//Collision Left wall.
        gameOver=true;
    }
    else if (snakeX===blockSize){//Collision Right wall.
        gameOver=true;
    }
    else if (snakeY<0){//Collision Top wall.
        gameOver=true;
    }
    else if (snakeY===blockSize){//Collision Bottom wall.
        gameOver=true;
    }
    for (let i=0; i<snakeParts.length;i++){
        let snakeParts=[i];
        if(part.x===snakeX && part.y===snakeY){ //snake cannot occupy the same space
            gameOver=true;
            break; //break out of the loop
        }
    }
    if (gameOver){
        ctx.fillstyle="white"
        ctx.font="50px verdana";
        ctx.fillText("Game Over! ", canvas.clientWidth/6.5, canvas.clientHeight/2); 
        //Text Centered.
    }
    return gameOver; // Stop the execution of drawgame.
}

//____________________________________________________________  

function drawScore(){
    ctx.fillstyle="White"//Color of the Text
    ctx.font="10px verdana"
    ctx.fillText("Score: " +score, canvas.clientWidth-50,10); 
    // Position set to the right hand corner
}

//____________________________________________________________ 

function clearScreen(){
    ctx.fillstyle="Black" // Screen set to black
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight)
    // Black color starts from 0px left, right to canvas width and canvas height
}

//____________________________________________________________  

function drawSnake(){
    ctx.fillstyle="green";
    // loop through your snakeparts array
    for(let i=0;i<snakeParts.length;i++){
        let part=snakeParts[i]
        ctx.fillRect(part.x *blockSize, part.y *blockSize, tileSize,tileSize)
    }
    snakeParts.push(new snakePart(snakeX, snakeY));
    //put item at the end of list next to the head
    if (snakeParts.length>tailLength){
        snakeParts.shift();
        //remove furthest item from snake part if we have more than our tail size
    } 
    ctx.fillStyle="orange";
    ctx.fillRect(snakeX* blockSize,snakeY* blockSize, tileSize,tileSize)
}

//____________________________________________________________ 

function changeDirection(e) {
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

//____________________________________________________________ 
function placeFood() {
    foodX = Math.floor(Math.random() * x) * blockSize;
    foodY = Math.floor(Math.random() * x) * blockSize;
}
//____________________________________________________________ 
function outsideGrid(postion){
    return (
        postion.snakeX < 1 || postion.snakeX > blockSize ||
        postion.snakeY < 1 || postion.snakeY > blockSize
        )
}
//____________________________________________________________ 
function main() {
    if (gameOver) {
        if (confirm('You lost. Press ok to restart.')){
            window.location = '/'
        }
        return
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
    return onSnake(snakeBody[0], { ignoreHead: true })
  }

//____________________________________________________________

function checkCollision(){
    if(foodX==headX && foodY==snakeY){
        foodX=Math.floor(Math.random()*blockSize);
        foodY=Math.floor(Math.random()*blockSize);
        tailLength++;
        score++; //increase our score value
    }
}

//Other
drawGame();