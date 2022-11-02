const canvas=document.getElementById('board');
const ctx=canvas.getContext('2d');

class snakePart{
    constructor(X, Y){
        this.X=X;
        this.X=X;
    }
}
// _____________________________ Variables _______________________________
// Board
let speed = 7;
let blockCount=20;
// Snake
let blockSize=canvas.clientWidth/blockCount-2;
let headX = 10;
let headY = 10;
// Snake Array
const snakeParts=[];
let tailLength = 2;
// Snake Speed
let velocityX = 0;
let velocityY = 0;
// Food
let foodX = 5;
let foodY = 5;
// Game over
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
    let gameOver = false; 
    //check whether game has started
    if(velocityY===0 && velocityX===0){
        return false;
    }
    if (headX<0){//Collision Left wall.
        gameOver=true;
    }
    else if (headX===blockCount){//Collision Right wall.
        gameOver=true;
    }
    else if (headY<0){//Collision Top wall.
        gameOver=true;
    }
    else if (headY===blockCount){//Collision Bottom wall.
        gameOver=true;
    }
    for (let i=0; i<snakeParts.length;i++){
        let part=snakeParts=[i];
        if(part.X===headX && part.Y===headY){ //snake cannot occupy the same space
            gameOver=true;
            break; //break out of the loop
        }
    }
    if (gameOver){
        ctx.fillstyle="white";
        ctx.font="50px verdana";
        ctx.fillText("Game Over! ", canvas.clientWidth/6.5, canvas.clientHeight/2); 
        //Text Centered.
    }
    return gameOver; // Stop the execution of drawgame.
}

//____________________________________________________________drawScore

function drawScore(){
    
    ctx.fillstyle="white";//Color of the Text
    ctx.font="10px verdana"
    ctx.fillText("Score: " +score, canvas.clientWidth-50,10); 
    // Position set to the right hand corner
}

//____________________________________________________________clearScreen

function clearScreen(){

    ctx.fillstyle= 'black' // Screen set to black
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight)
    // Black color starts from 0px left, right to canvas width and canvas height

}

//____________________________________________________________drawSnake

function drawSnake(){
    ctx.fillstyle="green";
    // loop through your snakeparts array
    for(let i=0;i<snakeParts.length;i++){
        let part=snakeParts[i]
        ctx.fillRect(part.X *blockCount, part.Y *blockCount, blockSize,blockSize)
    }

    snakeParts.push(new snakePart(headX, headY));    //put item at the end of list next to the head
    if (snakeParts.length>tailLength){
        snakeParts.shift();            //remove furthest item from snake part if we have more than our tail size
    }

    ctx.fillStyle="orange";
    ctx.fillRect(headX* blockCount,headY* blockCount, blockSize,blockSize)
    
}

//____________________________________________________________changeDirection

function changeDirection(){
    headX=headX + velocityX;
    headY=headY + velocityY;
}

//____________________________________________________________placeFood

function placeFood(){
    ctx.fillStyle="red";
    ctx.fillRect(foodX*blockCount, foodY*blockCount, blockSize, blockSize)
}

//____________________________________________________________checkCollision

function checkCollision(){
    if(foodX==headX && foodY==headY){
        foodX=Math.floor(Math.random()*blockCount);
        foodY=Math.floor(Math.random()*blockCount);
        tailLength++;
        score++; //increase our score value
    }
}

//____________________________________________________________
document.body.addEventListener("keyup", keyUp);

function keyUp(e){
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
    foodX = Math.floor(Math.random() * x) * blockCount;
    foodY = Math.floor(Math.random() * x) * blockCount;
}
//____________________________________________________________ 
function outsideGrid(postion){
    return (
        postion.headX < 1 || postion.headX > blockCount ||
        postion.headY < 1 || postion.headY > blockCount
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


//Other
  drawGame();