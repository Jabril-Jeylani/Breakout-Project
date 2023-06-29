//use Canvas

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let rightPress = false;
let leftPress = false;

const circle = {
    x: 300,
    y: 485, 
    size: 10, 
    dx: 3, 
    dy: 2
}

function drawCircle() {
    ctx.beginPath()
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2)
    ctx.fill()
}

function updateCircle() {

    ctx.clearRect(0,0, canvas.width, canvas.height)
    drawCircle()

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
    // Detect Paddle
    
    if (circle.x > paddle.x && circle.y < paddle.y ) {
        console.log('Circle: ', circle)
        console.log('Paddle: ', paddle)
        circle.dx = -circle.dx
    }
    // if (circle.y > paddle.y || circle.y < paddle.y) {
    //     circle.dy = -circle.dy
    // }
    // if (circle.x > paddle.x) {
    //     circle.dx = -circle.dx
    // }
    // if (circle.x < paddle.x + paddle.w) {
    //     circle.dx = -circle.dx
    // }
    // if (circle.y > paddle.y) {
    //     circle.dy = -circle.dy
    // }
    // if (circle.y < paddle.y + paddle.h) {
    //     circle.dy = -circle.dy
    // }
    
}

const paddle = {
    w: 100, 
    h: 20, 
    x: 250, 
    y: 500, 
}

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

// const interval = setInterval(updateCircle, 10)















