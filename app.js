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

        magnitude() {
            return Math.sqrt(this.re * this.re + this.im * this.im);
        },

        phase() {
            return Math.atan2(this.im, this.re)
        }
    }
}

let signal = []

const props = {
    N: 128,
    freq: 4,
    freq2: 8,
    amp: 100,
    amp2: 50,
    detail: 0.1,
    squareSize: 1,
}

const createArray = () => {
    for (let i = 0; i < props.N; i += props.detail) {
        signal.push(((props.amp * Math.sin(i * props.freq)) + (props.amp2 * Math.sin(i * props.freq2))))
    }
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
let values = dft(signal)
let frameRequest = null;

const animate = (i) => {
    ctx.clearRect(-WIDTH / 2, -HEIGHT / 2, WIDTH * 2, HEIGHT * 2);
    ctx.fillRect(0, -HEIGHT / 2, axisLineWidth, HEIGHT)
    ctx.fillRect(0, 0, WIDTH, axisLineWidth)

    signal.forEach((val, i) => {
        ctx.fillRect(i * props.squareSize, val * props.squareSize, props.squareSize, props.squareSize)
    })

    values.forEach((c, i) => {
        ctx.fillRect(i * props.squareSize, 0 * props.squareSize, props.squareSize, props.squareSize * c.magnitude())
    })

    frameRequest = requestAnimationFrame(animate)
}

const rebuild = () => {
    signal = [];
    createArray();
    values = dft(signal);
}

rebuild()
animate()

