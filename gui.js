// GUI

const N1el = document.getElementById('numberOfSamples')
const freq1el = document.getElementById('freq1')
const freq2el = document.getElementById('freq2')
const amp1el = document.getElementById('amp1')
const amp2el = document.getElementById('amp2')
const detailel = document.getElementById('detail')
const squareSizeel = document.getElementById('squareSize')
const timerel = document.getElementById('timer')
const animationAmplitudeel = document.getElementById('animationAmplitude')
const showingDFTel = document.getElementById('showingDft')
const showingAnimationel = document.getElementById('showingAnimation')

N1el.value = props.N
freq1el.value = props.freq
freq2el.value = props.freq2
amp1el.value = props.amp
amp2el.value = props.amp2
detailel.value = props.detail
squareSizeel.value = props.squareSize
timerel.value = props.timer
animationAmplitudeel.value = props.animationAmplitude
showingDFTel.checked = props.showingDft
showingAnimationel.checked = props.showingAnimation

N1el.addEventListener('mousemove', e => {
    const val = parseFloat(e.target.value);
    props.N = val;
    rebuild()
})

N1el.addEventListener('change', e => {
    const val = parseFloat(e.target.value);
    props.N = val;
    rebuild()
})

freq1el.addEventListener('mousemove', e => {
    let val = parseFloat(e.target.value);
    props.freq = val;
    rebuild()
})

freq1el.addEventListener('change', e => {
    let val = parseFloat(e.target.value);
    props.freq = val;
    rebuild()
})


freq2el.addEventListener('mousemove', e => {
    const val = parseFloat(e.target.value);
    props.freq2 = val;
    rebuild()
})

freq2el.addEventListener('change', e => {
    const val = parseFloat(e.target.value);
    props.freq2 = val;
    rebuild()
})


amp1el.addEventListener('mousemove', e => {
    const val = parseFloat(e.target.value);
    props.amp = val;
    rebuild()
})
amp1el.addEventListener('change', e => {
    const val = parseFloat(e.target.value);
    props.amp = val;
    rebuild()
})

amp2el.addEventListener('mousemove', e => {
    const val = parseFloat(e.target.value);
    props.amp2 = val;
    rebuild()
})
amp2el.addEventListener('change', e => {
    const val = parseFloat(e.target.value);
    props.amp2 = val;
    rebuild()
})

detailel.addEventListener('mousemove', e => {
    const val = parseFloat(e.target.value);
    props.detail = val;
    rebuild()
})
detailel.addEventListener('change', e => {
    const val = parseFloat(e.target.value);
    props.detail = val;
    rebuild()
})

squareSizeel.addEventListener('mousemove', e => {
    const val = parseFloat(e.target.value);
    props.squareSize = val;
    rebuild()
})
squareSizeel.addEventListener('change', e => {
    const val = parseFloat(e.target.value);
    props.squareSize = val;
    rebuild()
})

timerel.addEventListener('mousemove', e => {
    const val = parseFloat(e.target.value);
    props.timer = val;
    rebuild()
})

timerel.addEventListener('change', e => {
    const val = parseFloat(e.target.value);
    props.timer = val;
    rebuild()
})

animationAmplitudeel.addEventListener('mousemove', e => {
    const val = parseFloat(e.target.value);
    props.animationAmplitude = val;
    rebuild()
})

animationAmplitudeel.addEventListener('change', e => {
    const val = parseFloat(e.target.value);
    props.animationAmplitude = val;
    rebuild()
})

showingDFTel.addEventListener('change', e => {
    const val = e.target.checked;
    props.showingDft = val;
    rebuild()
})

showingAnimationel.addEventListener('change', e => {
    const val = e.target.checked;
    props.showingAnimation = val;
    rebuild()
})


let paused = false;

window.addEventListener('keyup', (e) => {
    if (e.key === 'p') {
        if (paused) {
            animate();
            paused = false;
        } else {
            cancelAnimationFrame(frameRequest)
            paused = true;
        }
    }
})