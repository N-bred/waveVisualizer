// Canvas

const canvas = document.getElementById('canvas');
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');
canvas.style.setProperty("--scaling", 1)
const axisLineWidth = 1;
let WIDTH = null;
let HEIGHT = null;

const buildWindow = () => {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx.translate(WIDTH / 4, HEIGHT / 2)
    ctx.scale(1, -1);
    ctx.fillStyle = 'white'
    ctx.stroke()
}

buildWindow()


let signal = []

const props = {
    N: 128,
    freq: 4,
    freq2: 8,
    amp: 100,
    amp2: 50,
    detail: 0.1,
    squareSize: 1,
    timer: 1000,
    animationAmplitude: 2,
    showingDft: true,
    showingAnimation: false,
}

const createArray = () => {
    for (let i = 0; i < props.N; i += props.detail) {
        signal.push(((props.amp * Math.sin(i * props.freq)) + (props.amp2 * Math.sin(i * props.freq2))))
    }
}

// Canvas Function drawer
let values = dft(signal)
let frameRequest = null;

const animate = (iTime) => {
    ctx.clearRect(-WIDTH / 2, -HEIGHT / 2, WIDTH * 2, HEIGHT * 2);
    ctx.fillRect(0, -HEIGHT / 2, axisLineWidth, HEIGHT)
    ctx.fillRect(0, 0, WIDTH, axisLineWidth)

    if (props.showingAnimation) {

        signal.forEach((val, i) => {
            ctx.fillRect(i * props.squareSize, val * props.squareSize, props.squareSize * props.animationAmplitude * Math.cos(iTime / props.timer), props.squareSize * props.animationAmplitude * Math.sin(iTime / props.timer))
        })

    } else {
        signal.forEach((val, i) => {
            ctx.fillRect(i * props.squareSize, val * props.squareSize, props.squareSize, props.squareSize)
        })
    }

    if (props.showingDft) {

        values.forEach((c, i) => {
            ctx.fillRect(i * props.squareSize, 0 * props.squareSize, props.squareSize, props.squareSize * c.magnitude())
        })

    }

    frameRequest = requestAnimationFrame(animate)
}

const rebuild = () => {
    signal = [];
    createArray();
    values = dft(signal);
}

rebuild()
animate()

window.addEventListener('resize', e => {
    buildWindow()
})