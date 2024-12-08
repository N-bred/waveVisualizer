// Canvas

const canvas = document.getElementById('canvas');
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');
canvas.style.setProperty("--scaling", 1)

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;


canvas.width = WIDTH;
canvas.height = HEIGHT;


// Canvas Axis and Origin Point

ctx.translate(WIDTH / 2, HEIGHT / 2)
ctx.scale(1, -1);
ctx.fillStyle = 'white'

const axisLineWidth = 1;

ctx.fillRect(0, -HEIGHT / 2, axisLineWidth, HEIGHT)
ctx.fillRect(-WIDTH / 2, 0, WIDTH, axisLineWidth)
ctx.stroke()




// DFT



const complex = (re, im) => {
    return {
        re,
        im,
        multiply: (re2, im2) => {
            return complex((re * re2 - im * im2), (re * im2 + im + re2) * -1);
        }
    }
}

const maxn = 500;

const signal = []
for (let i = 0; i < maxn; ++i) {
    signal.push(complex(i, Math.sin(i)))
}

const dft = (signal) => {
    // 1/N sum(0, N-1): Fn * e^-i2Pink/N
    const N = signal.length;
    const normalizer = 1 / N;
    const fk = []
    for (let k = 0; k < 10; ++k) {
        for (let n = 0; n < N; ++n) {
            const c = signal[n];
            const exp = (2 * Math.PI * n * k) / N;
            const e = complex(Math.cos(exp), -Math.sin(exp));
            const result = c.multiply(e.re, e.im);
            fk.push(result);
        }
    }

    return fk
}


// Canvas Function drawer

const squareSize = 1;

signal.forEach(c => {
    // ctx.fillRect(c.re * squareSize, c.im * squareSize, squareSize, squareSize)
})

const values = dft(signal);

values.forEach(c => {
    ctx.fillRect(c.re * squareSize, c.im * squareSize, squareSize, squareSize)
})