//use Canvas

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

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
    if (circle.x + circle.dx > canvas.width - circle.size || circle.x + circle.dx < circle.size) {
        circle.dx = -circle.dx
    }

    if (circle.y + circle.dy > canvas.width - circle.size || circle.y + circle.dy < circle.size) {
        circle.dy = -circle.dy
    }
    // Detect Paddle
    if (circle.x + circle.size > paddle.x || circle.x - circle.size < paddle.x) {
        circle.dx = -circle.dx
    }
    
    if (circle.y + circle.size > paddle.y || circle.y - circle.size < paddle.y) {
        circle.dy = -circle.dy
    }
    // if (circle.x > paddle.x) {
    //     circle.dx = -circle.dx
    // }
    
    // if (circle.y > paddle.y) {
    //     circle.dy = -circle.dy
    // }
    
    
    
    
}


const paddle = {
    w: 100, 
    h: 20, 
    x: 250, 
    y: 500, 
    dx: 0, 
    dy: 0
}

function drawPaddle() {
    ctx.beginPath()
    ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.closePath()
}

function clear() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
}

// function newPos() {
//     paddle.x += paddle.dx
//     paddle.y += paddle.dy

//     detectWalls()
// }

// function detectWalls() {
//     // Left Wall
//     if (paddle.x < 0) {
//         paddle.x = 0;        
//     }
//     // Right Wall
//     if (paddle.x + paddle.w > canvas.width) {
//         paddle.x = canvas.width - paddle.w
//     }
// }

function update() {
    clear()

    drawPaddle()

    drawCircle()

    // newPos()

    requestAnimationFrame(updateCircle)

    requestAnimationFrame(update)
}

document.addEventListener('mousemove', (e) => {
    paddle.x = Math.min(e.offsetX, canvas.width - paddle.w) 
});



update()





















// const paddle = {
//     x: 250, 
//     y: 550, 
//     width: 100, 
//     height: 10,
//     draw() {
//         ctx.beginPath()
//         ctx.fillRect(this.x, this.y, this.width, this.height)
//         ctx.closePath()
//     }
// }

// const ball = {
//     x: 300, 
//     y: 540, 
//     vx: 5,
//     vy: 2,
//     radius: 10,
//     color: 'black',
//     draw() {
//         ctx.beginPath()
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2, true)
//         ctx.closePath()
//         ctx.fillStyle = this.color
//         ctx.fill()
//     }
// }

// function draw() {
//     ctx.clearRect(0,0, canvas.width, canvas.height)
//     ball.draw()
//     paddle.draw()
//     ball.x += ball.vx
//     ball.y += ball.vy
    

//     if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
//         ball.vy = -ball.vy;
//       }
//       if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
//         ball.vx = -ball.vx;
//       }
//     raf = window.requestAnimationFrame(draw)
// }

// canvas.addEventListener('mouseover', (e) => {
//     raf = window.requestAnimationFrame(draw)
// })

// canvas.addEventListener('mouseout', (e) => {
//     window.cancelAnimationFrame(raf)
// })

// ball.draw()

