const game = document.getElementById("game");
const bird = document.getElementById("bird");
const scoreDisplay = document.getElementById("score");
const gameOverScreen = document.getElementById("game-over");

let birdTop = 250;
let gravity = 0.3;
let velocity = 0;
let isGameOver = false;
let score = 0;

function jump() {
    velocity = -5;
}

document.addEventListener("keydown", jump);
document.addEventListener("click", jump);

function createPipe() {
    if (isGameOver) return;

    let pipeTopHeight = Math.random() * 250 + 50;
    let gap = 150;

    let pipeTop = document.createElement("div");
    let pipeBottom = document.createElement("div");
    pipeTop.classList.add("pipe", "top");
    pipeBottom.classList.add("pipe", "bottom");

    pipeTop.style.height = pipeTopHeight + "px";
    pipeTop.style.top = "0px";
    pipeTop.style.left = "400px";

    pipeBottom.style.height = (600 - pipeTopHeight - gap) + "px";
    pipeBottom.style.bottom = "0px";
    pipeBottom.style.left = "400px";

    game.appendChild(pipeTop);
    game.appendChild(pipeBottom);

    let pipeLeft = 400;

    let movePipe = setInterval(() => {
        if (isGameOver) {
            clearInterval(movePipe);
            return;
        }

        pipeLeft -= 3;
        pipeTop.style.left = pipeLeft + "px";
        pipeBottom.style.left = pipeLeft + "px";

        if (pipeLeft < 80 && pipeLeft > 77) {
            score++;
            scoreDisplay.innerText = score;
        }

        if (
            pipeLeft < 130 &&
            pipeLeft > 20 &&
            (birdTop < pipeTopHeight ||
             birdTop + 40 > pipeTopHeight + gap)
        ) {
            endGame();
        }

        if (pipeLeft < -60) {
            pipeTop.remove();
            pipeBottom.remove();
            clearInterval(movePipe);
        }

    }, 20);
}

function gameLoop() {
    if (isGameOver) return;

    velocity += gravity;
    birdTop += velocity;
    bird.style.top = birdTop + "px";

    bird.style.transform = `rotate(${velocity * 3}deg)`;

    if (birdTop <= 0 || birdTop >= 560) {
        endGame();
    }

    requestAnimationFrame(gameLoop);
}

function endGame() {
    isGameOver = true;
    gameOverScreen.style.display = "flex";
}

function restartGame() {
    location.reload();
}

setInterval(createPipe, 2000);
gameLoop();