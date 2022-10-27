// New KeyBindings 
window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (velocityY !== 1) break
            inputDirection = {velocityX : 0, velocityY : -1 }
            break
        case 'ArrowDown': 
            if (velocityY !== -1) break
            inputDirection = {velocityX : 0, velocityY : 1 }
            break
        case 'ArrowLeft': 
            if (velocityX !== 1) break
            inputDirection = {velocityX : -1, velocityY : 0 }
            break
        case 'ArrowRight': 
            if (velocityX !== -1) break
            inputDirection = {velocityX : 1, velocityY : 0 }
            break
        }
})
// Old Key Bindings
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

// Random Food Spawner
function randomGridPostion(){
    return {
        foodX: Math.floor(Math.random() * grid) + 1,
        foodY: Math.floor(Math.random() * grid) + 1,
    }
}
// The Old Random Food Spawner
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * cols) * blockSize;
}