// Canvas

const canvas = document.getElementById('canvas');
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;


canvas.width = WIDTH;
canvas.height = HEIGHT;

ctx.translate(WIDTH/2, HEIGHT/2)
ctx.scale(1, -1);
ctx.fillStyle = 'white'


const axisLineWidth = 1;

ctx.fillRect(0,-HEIGHT/2, axisLineWidth, HEIGHT)
ctx.fillRect(-WIDTH/2, 0, WIDTH, axisLineWidth)


ctx.fillRect(0,0,10,10)
ctx.stroke()



// DFT


const maxn = 100;

const signal = []
for (let i = 0; i < maxn; ++i) {
    signal.push([i, Math.sin(i)])
}