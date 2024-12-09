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