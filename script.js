
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let rightPress = false;
let leftPress = false;
let score = 0
let round = 1

const circle = {
    x: 300,
    y: 485, 
    size: 10, 
    dx: 3, 
    dy: 2
}

const paddle = {
    w: 100, 
    h: 20, 
    x: 250, 
    y: 500, 
}

// createBricks() function that makes objects with coordinates and everything
// push them to an array of Bricks
// animateBricks() to loop through all bricks and draw based on coordinates
// when there is collision detection between ball and brick, delete brick from array
const brick = {
    row: 3,
    column: 5,
    x: 0,
    y: 0,
    w: 100,
    h: 20
}
const bricks = []


for (let c = 0; c < brick.column; c++) {
    bricks[c] = [];
    for (let r = 0; r < brick.row; r++) {
        bricks[c][r] = { x: 0, y: 0, isHit: 1};
    }
}


function animateBricks() {

    for (let c = 0; c < brick.column; c++) {
        for (let r = 0; r < brick.row; r++) {
            if (bricks[c][r].isHit === 1) {
                const brickX = c * (brick.w + 20) + 10
                const brickY = r * (brick.h + 20) + 10
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath()
                ctx.fillRect(brickX, brickY, brick.w, brick.h)
                ctx.closePath()
            }
        }
    }
}

function drawScore() {
    ctx.font = '16px Helvetica'
    ctx.fillText(`Score: ${score}`, 10, 580)
    ctx.fillText(`Round: ${round}`, 530, 580)
}

function drawCircle() {
    ctx.beginPath()
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2)
    ctx.fill()
}

function reset() {
    circle.x = 300
    circle.y = paddle.y 
    document.location.reload()
    
}

function updateCircle() {

    ctx.clearRect(0,0, canvas.width, canvas.height)

    // change position
    circle.x += circle.dx
    circle.y += circle.dy;

    // Detect side walls
    if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
        circle.dx = -circle.dx
    }
    if (circle.y + circle.size > canvas.height || circle.y - circle.size < 0) {
        circle.dy = -circle.dy
    }

    // Detect Bottom Wall
    if (circle.y + circle.size > canvas.height) {
        alert('Game Over')
        reset()
    }

    // Detect Paddle
    if (circle.y > paddle.y && circle.y < paddle.y + paddle.h
        && circle.x > paddle.x && circle.x < paddle.x + paddle.w) {
        circle.dy = -circle.dy
    }

    
    
}

function collisionDetection() {
    for (let c = 0; c < brick.column; c++) {
      for (let r = 0; r < brick.row; r++) {
        const b = bricks[c][r];
        if (b.isHit === 1) {
            if (circle.x > b.x &&
                circle.x < b.x + brick.w && 
                circle.y > b.y && 
                circle.y < b.y + brick.h) {
                circle.dy = -circle.dy;
                b.isHit = 0;
                score++
                if (score === brick.row * brick.column) {
                    alert('You Win! Next Round...')
                    round++
                    circle.x = 300
                    circle.y = 500
                    for (let c = 0; c < brick.column; c++) {
                        bricks[c] = [];
                        for (let r = 0; r < brick.row; r++) {
                            bricks[c][r] = { x: 0, y: 0, isHit: 1};
                        }
                    }
                }
                if (score === (brick.row * brick.column) * 3) {
                    alert('Game Done!')
                    document.location.reload()
                }
            }
        }
      }
    }
}
console.log(bricks)
function drawPaddle() {
    ctx.beginPath()
    ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.closePath()
}

function clear() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
}

function movement() {
    if (rightPress) {
        paddle.x += 5;
        if (paddle.x + paddle.w > canvas.width) {
            paddle.x = canvas.width - paddle.w
        }
    }
    else if (leftPress) {
        paddle.x -= 5;
        if (paddle.x < 0) {
            paddle.x = 0
        }
    }
}
function update() {
    

    clear()

    drawPaddle()

    drawCircle()

    drawScore()

    animateBricks()

    collisionDetection()

    movement()

    

    requestAnimationFrame(updateCircle)

    requestAnimationFrame(update)
}


document.addEventListener('keydown', keyDown, false)
document.addEventListener('keyup', keyUp, false)

function keyDown(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPress = true;
    }
    else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPress = true;
    }
}

function keyUp(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPress = false;
    }
    else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPress = false;
    }
}

update()

















