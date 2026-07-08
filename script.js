// Snake game — clean implementation, initialized on window load

const board = document.querySelector('.board');
let startButton;
let restartButton;
let modal;
let startGameModal;
let gameOverModal;

const highScoreElement = document.querySelector('#high-score');
const scoreElement = document.querySelector('#score');
const timeElement = document.querySelector('#time');

const BLOCK_SIZE = 40; // px (smaller tiles -> larger play area in cells)
let cols = 10;
let rows = 10;

let blocks = {};
let snake = [];
let food = null;
let direction = 'right';
let nextDirection = 'right';

let score = 0;
let highScore = Number(localStorage.getItem('highScore') || 0);
let timeoutId = null;
let timerId = null;
let seconds = 0;
let running = false;

highScoreElement.innerText = highScore;

function buildGrid() {
    blocks = {};
    board.innerHTML = '';
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const block = document.createElement('div');
            block.className = 'block';
            board.appendChild(block);
            blocks[`${r}-${c}`] = block;
        }
    }
}

function createFood() {
    let attempts = 0;
    while (attempts < 1000) {
        attempts++;
        const x = Math.floor(Math.random() * rows);
        const y = Math.floor(Math.random() * cols);
        const key = `${x}-${y}`;
        if (!blocks[key]) continue;
        if (!blocks[key].classList.contains('fill')) {
            if (food) blocks[`${food.x}-${food.y}`].classList.remove('food');
            food = { x, y };
            blocks[key].classList.add('food');
            return;
        }
    }
}

function updateTimer() {
    seconds++;
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    timeElement.innerText = `${mins}:${secs}`;
}

function render() {
    if (!running) return;
    direction = nextDirection;
    const head = {
        x: snake[0].x + (direction === 'down' ? 1 : direction === 'up' ? -1 : 0),
        y: snake[0].y + (direction === 'right' ? 1 : direction === 'left' ? -1 : 0)
    };

    // out of bounds
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        return endGame();
    }
    const headKey = `${head.x}-${head.y}`;
    if (!blocks[headKey]) return endGame();
    const tail = snake[snake.length - 1];
    const tailKey = `${tail.x}-${tail.y}`;

    if (blocks[headKey].classList.contains('fill') && headKey !== tailKey) {
        return endGame();
    }

    const ate = food && head.x === food.x && head.y === food.y;

    snake.unshift(head);
        // update classes: remove previous head and direction classes
        Object.values(blocks).forEach(b => { b.classList.remove('head', 'head-up', 'head-right', 'head-down', 'head-left'); });
        blocks[headKey].classList.add('fill', 'head', `head-${direction}`);

    if (ate) {
        blocks[`${food.x}-${food.y}`].classList.remove('food');
        score += 10;
        scoreElement.innerText = score;
        if (score > highScore) {
            highScore = score;
            highScoreElement.innerText = highScore;
            localStorage.setItem('highScore', highScore);
        }
        createFood();
    } else {
        const removed = snake.pop();
        const removedKey = `${removed.x}-${removed.y}`;
        blocks[removedKey].classList.remove('fill', 'head', 'tail');
        blocks[removedKey].style.transform = '';
        // mark current tail
        const newTail = snake[snake.length - 1];
        if (newTail) blocks[`${newTail.x}-${newTail.y}`].classList.add('tail');
    }
}

// Show control pad on side the user taps/clicks
function showControlsOnSide(side) {
    const controls = document.querySelector('.controls');
    if (!controls) return;
    controls.classList.remove('hidden');
    if (side === 'left') {
        controls.style.left = '18px';
        controls.style.right = 'auto';
    } else if (side === 'right') {
        controls.style.right = '18px';
        controls.style.left = 'auto';
    } else {
        controls.style.left = '50%';
        controls.style.transform = 'translate(-50%,-50%)';
    }
}

// attach control pad handlers
function wireControls() {
    const up = document.querySelector('.btn-up');
    const down = document.querySelector('.btn-down');
    const left = document.querySelector('.btn-left');
    const right = document.querySelector('.btn-right');
    if (up) up.addEventListener('click', () => { if (direction !== 'down') nextDirection = 'up'; });
    if (down) down.addEventListener('click', () => { if (direction !== 'up') nextDirection = 'down'; });
    if (left) left.addEventListener('click', () => { if (direction !== 'right') nextDirection = 'left'; });
    if (right) right.addEventListener('click', () => { if (direction !== 'left') nextDirection = 'right'; });
}

function gameLoop() {
    if (!running) return;
    render();
    const speedBonus = Math.floor(score / 10) * 15;
    const delay = Math.max(100, 350 - speedBonus);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(gameLoop, delay);
}

function startGame() {
    clearTimeout(timeoutId);
    clearInterval(timerId);
    Object.values(blocks).forEach(b => b.classList.remove('fill', 'food'));
    score = 0;
    seconds = 0;
    scoreElement.innerText = '0';
    timeElement.innerText = '00:00';

    const startX = Math.floor(rows / 2);
    let startY = Math.floor(cols / 2) - 1;
    // clamp startY so snake fits horizontally
    if (startY < 0) startY = 0;
    if (startY + 2 >= cols) startY = Math.max(0, cols - 3);
    snake = [ { x: startX, y: startY + 2 }, { x: startX, y: startY + 1 }, { x: startX, y: startY } ];
    // ensure all initial segments map to existing blocks
    snake = snake.map(s => ({ x: Math.max(0, Math.min(rows-1, s.x)), y: Math.max(0, Math.min(cols-1, s.y)) }));
    snake.forEach(s => blocks[`${s.x}-${s.y}`].classList.add('fill'));
    direction = 'right';
    nextDirection = 'right';
    createFood();
    running = true;
    if (modal) modal.style.display = 'none';
    if (startGameModal) startGameModal.style.display = 'none';
    if (gameOverModal) gameOverModal.style.display = 'none';
    timerId = setInterval(updateTimer, 1000);
    gameLoop();
}

function endGame() {
    running = false;
    clearTimeout(timeoutId);
    clearInterval(timerId);
    if (modal) modal.style.display = 'flex';
    if (startGameModal) startGameModal.style.display = 'none';
    if (gameOverModal) gameOverModal.style.display = 'flex';
}

function handleKey(e) {
    if (!running && (e.key.startsWith('Arrow') || ['w','a','s','d'].includes(e.key))) return;
    if (e.key === 'ArrowUp' && direction !== 'down') nextDirection = 'up';
    else if (e.key === 'ArrowDown' && direction !== 'up') nextDirection = 'down';
    else if (e.key === 'ArrowLeft' && direction !== 'right') nextDirection = 'left';
    else if (e.key === 'ArrowRight' && direction !== 'left') nextDirection = 'right';
}

function init() {
    // query dynamic elements
    startButton = document.querySelector('.btn-start');
    restartButton = document.querySelector('.btn-restart');
    modal = document.querySelector('.modal');
    startGameModal = document.querySelector('.start-game');
    gameOverModal = document.querySelector('.game-over');

    // compute grid from board size (board styled to 500x500 in CSS)
    const rect = board.getBoundingClientRect();
    cols = Math.max(5, Math.floor(rect.width / BLOCK_SIZE));
    rows = Math.max(5, Math.floor(rect.height / BLOCK_SIZE));

    // ensure CSS grid matches JS calculation
    board.style.gridTemplateColumns = `repeat(${cols}, ${BLOCK_SIZE}px)`;
    board.style.gridAutoRows = `${BLOCK_SIZE}px`;

    buildGrid();

    if (startButton) startButton.addEventListener('click', startGame);
    if (restartButton) restartButton.addEventListener('click', () => {
        if (gameOverModal) gameOverModal.style.display = 'none';
        startGame();
    });

    window.addEventListener('keydown', handleKey);
    // show controls on first board click/touch on that side
    board.addEventListener('pointerdown', (e) => {
        const side = (e.clientX < window.innerWidth / 2) ? 'left' : 'right';
        showControlsOnSide(side);
    });
    wireControls();

    if (modal) modal.style.display = 'flex';
    if (startGameModal) startGameModal.style.display = 'flex';
    if (gameOverModal) gameOverModal.style.display = 'none';
}

window.addEventListener('load', init);
