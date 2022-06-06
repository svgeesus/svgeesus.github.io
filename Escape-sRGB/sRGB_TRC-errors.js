// Calculate error for 2.2 and 2.4 TRC approximations to sRGB transfer curve

let line_22 = [];
let line_24 = [];
let max22 = 0;
let min22 = 0;
let max24 = 0;
let min24 = 0;
let xaxis = [];
let yaxis = [];

// 10 bit precision
for (let i =0; i<1024; i++) {
    let v = i / 1023;
    let v_srgb = srgb_linearize(v);
    let v_22 = v ** 2.223;
    let v_24 = v ** 2.4;
    // console.log (v, v_srgb, v_22, v_24);
    let v_22err = (v_22 - v_srgb);
    if (v_22err < min22) { min22 = v_22err};
    if (v_22err > max22) { max22 = v_22err};
    let v_24err = (v_24 - v_srgb);
    if (v_24err < min24) { min24 = v_24err};
    if (v_24err > max24) { max24 = v_24err};

    // scaling for a convenient plot size
    line_22.push(`${i}, ${-v_22err * 5000} `);
    line_24.push(`${i}, ${-v_24err  * 5000} `);
    // console.log (v, v_22err, v_24err);
}

for (let i = 0; i <= 1024; i += 128) {
    let v = i / 1023;
    xaxis.push(`<text x='${i}' y='20' text-anchor='middle'>${Math.round(v * 100)/100}</text>`);
};

for (let i =-3; i<2; i++) {
    let v = i *50;
    yaxis.push(`<text x='-30' y='${-v}' text-anchor='right'>${Math.round(i * 100)/100}%</text>`)
}


console.log (min22, max22);
console.log (min24, max24);

let markup = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='-30 -70 1063 240'>
<g stroke='black' fill='none' stroke-width='1'>
<rect x='0' y='-70' width='1023' height='230' fill='none' stroke='green'/>
<polyline stroke='#777' points='0 0 1023 0'/>
<polyline points='${line_22.join('\n')}' stroke-width='2'/>
<polyline stroke='red' points='${line_24.join('\n')}'  stroke-width='2'/>
</g>
<g fill='#444' stroke='none' font-size='12' font-family='Helvetica Neue, Helvetica, Segoe UI, sans-serif'>
${xaxis.join('\n')};
${yaxis.join('\n')};
</g>
</svg>`

textarea.value = markup;
let blob = new Blob([markup], {type : "image/svg+xml"});
downloadLink.href = output.data = URL.createObjectURL(blob);
downloadLink.download = `errors.svg`;

function srgb_linearize (val) {
    let sign = val < 0? -1 : 1;
    let abs = Math.abs(val);

    if (abs < 0.04045) {
        return val / 12.92;
    }

    return sign * (Math.pow((abs + 0.055) / 1.055, 2.4));
};