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

ctx.translate(WIDTH / 4, HEIGHT / 2)
ctx.scale(1, -1);
ctx.fillStyle = 'white'

const axisLineWidth = 1;

ctx.fillRect(0, -HEIGHT / 2, axisLineWidth, HEIGHT)
ctx.fillRect(-WIDTH / 4, 0, WIDTH, axisLineWidth)

ctx.stroke()




// DFT

const complex = (re, im, freq) => {
    return {
        re,
        im,
        freq,
        normalize(n) {
            return complex(this.re / n, this.im / n, this.freq);
        },

        magnitude(){
            return Math.sqrt(this.re * this.re + this.im * this.im);
        },

        phase() {
            return Math.atan2(this.im, this.re)
        }
    }
}

const signal = []
// const signal = [100, 100, 100, -100, -100, -100, 100, 100, 100, -100, -100, -100]
const N = 128;
const freq = 4;
const freq2 = 5;
const amp = 100;
const duration = 1;
const delta_t = duration / N;

for (let i = 0; i < N ; i+=.1) {
    signal.push(((amp * Math.sin(i * 2)) + (50 * Math.sin(i * 8))))
}

function dft(x) {
    const X = []
    const N = x.length;

    for (let k = 0; k < N; ++k) {
        const c = complex(0, 0, k);

        for (let n = 0; n < N; ++n) {
            const xn = x[n];
            const exp = (2 * Math.PI * k * n) / N;
            const e = complex(Math.cos(exp), Math.sin(exp));
            c.re += xn * e.re;
            c.im += -(xn * e.im);
        }

        X.push(c.normalize(N));
    }

    return X;
}


// Canvas Function drawer

const squareSize = 2;

signal.forEach((val, i) => {
    ctx.fillRect(i * squareSize, val * squareSize, squareSize, squareSize)
})

const values = dft(signal)

values.forEach((c, i) => {
    ctx.fillRect(i * squareSize, 0 * squareSize, squareSize, squareSize * c.magnitude())
})