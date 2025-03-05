// Game Variables
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const boxSize = 20;
let snake = [{ x: 200, y: 200 }];
let food = generateFood();
let direction = "RIGHT";
let score = 0;
let gameRunning = true;

// Listen for arrow key presses
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const key = event.key;
    if (key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

// Game Loop
function gameLoop() {
    if (!gameRunning) return;

    update();
    draw();

    setTimeout(gameLoop, 200);
}

// Update Game State
function update() {
    const head = { ...snake[0] };

    // Move the snake's head
    if (direction === "UP") head.y -= boxSize;
    if (direction === "DOWN") head.y += boxSize;
    if (direction === "LEFT") head.x -= boxSize;
    if (direction === "RIGHT") head.x += boxSize;

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").innerText = score;
        food = generateFood();
    } else {
        snake.pop(); // Remove last segment if no food eaten
    }

    // Check for collisions with walls or itself
    if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        gameRunning = false;
        alert("Game Over! Your score: " + score);
        location.reload();
    }

    snake.unshift(head); // Add new head to the snake
}

// Draw Everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = "green";
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, boxSize, boxSize));

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

// Generate New Food Position
function generateFood() {
    let x, y;
    do {
        x = Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
        y = Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize;
    } while (snake.some(segment => segment.x === x && segment.y === y));
    return { x, y };
}

// Start Game
gameLoop();