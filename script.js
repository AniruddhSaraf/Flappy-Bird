let bird = document.getElementById('bird');
let birdTop = 250;
let birdLeft = 50;
let gravity = 2;
let gameSpeed = 2;

let isGameOver = false;

//initialize the game
function initializeGame() {
    birdTop = 250;
    isGameOver = false;
    document.addEventListener("keydown", jump);
}

//jump the bird
function jump() {
    if(!isGameOver) {
        birdTop -= 50;
    }
}

//apply gravity

function applyGravity() {
    if(!isGameOver) {
        birdTop += gravity;
        bird.style.top = birdTop + "px";
    }
}

//Move the pipes
function movePipes() {
    const pipes = document.querySelectorAll('.pipe');
    pipes.forEach(element => {
        let pipeLeft = parseInt(element.style.left);
        if(pipeLeft >= -60) {
            element.style.left = (pipeLeft - gameSpeed) + "px"; 
        } else {
            element.style.left = "400px";
        }
    })
}

//detect the collision
function detectCollision() {
    const pipes = document.querySelectorAll('.pipe');
    pipes.forEach(element => {
        let pipeLeft = parseInt(element.style.left);
        if(
            birdLeft + 40 > pipeLeft &&
            birdLeft < pipeLeft + 60 &&
            birdTop + 40 > parseInt(element.style.top) &&
            birdTop < parseInt(element.style.top) + parseInt(element.style.height)
        ) {
            gameOver();
        }
    })
    if(birdTop <= 0 || birdTop >= 560) {
        gameOver();
    }
}

//gameOver
function gameOver() {
    isGameOver = true;
    alert("Game Over! Click OK to restart.");
    initializeGame();
    resetPipes();
}

//reset the pipes
function resetPipes() {
    const pipes = document.querySelectorAll('.pipe');
    pipes.forEach(element => {
        element.style.left = "400px";
    })
}

//increase difficulty 
function increaseDifficulty() {
    if (!isGameOver) {
        gameSpeed += 0.01;  // Gradually increase game speed
        setTimeout(increaseDifficulty, 1000);  // Call this function every second
    }
}

//game loop
function gameLoop() {
    if(!isGameOver) {
        applyGravity();
        movePipes();
        detectCollision();
        requestAnimationFrame(gameLoop);
    }
}

//keep track of scores
let score = 0;
function increaseScore() {
    if (!isGameOver) {
        score++;
        document.getElementById('score').innerText = "Score : " + score;
        setTimeout(increaseScore, 1000);  // Update score every second
    }
}

document.addEventListener("DOMContentLoaded", function() {
    initializeGame();
    gameLoop();
    increaseDifficulty();
    increaseScore();
})