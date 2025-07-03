import {netherToOverworld, overworldToNether} from "./conversion.js";
import {displacement, formatDisplacement, distance, optimalPath} from "./path.js";

const overYMin = -62;
const overYMax = 316;
const netherYMin = 2;
const netherYMax = 123;

const xInput = document.getElementById('x-input');
const yInput = document.getElementById('y-input');
const zInput = document.getElementById('z-input');
const conversion = document.getElementById('conversion');

const modeText = document.getElementById('mode-text');
const inputDimensionName = document.getElementById('input-dimension');
const outputDimensionName = document.getElementById('output-dimension');

const reverseButton = document.getElementById('reverse-button');
const clearButton = document.getElementById('clear-button');
const copyButton = document.getElementById('copy-button');

const x1Input = document.getElementById('x1-input');
const y1Input = document.getElementById('y1-input');
const z1Input = document.getElementById('z1-input');
const x2Input = document.getElementById('x2-input');
const y2Input = document.getElementById('y2-input');
const z2Input = document.getElementById('z2-input');

const displacementResult = document.getElementById('displacement-result');
const followResult = document.getElementById('follow-result');
const distanceResult = document.getElementById('distance-result');

const clear1Button = document.getElementById('clear-1-button');
const clear2Button = document.getElementById('clear-2-button');

let isReversed = false;

[xInput, yInput, zInput].forEach(input => {
    input.addEventListener('input', updateConversion);
});

reverseButton.addEventListener('click', () => {
    isReversed = !isReversed

    // Update UI
    modeText.innerText = isReversed ? 'Nether to Overworld' : 'Overworld to Nether';
    inputDimensionName.innerText = isReversed ? '(Nether)' : '(Overworld)';
    outputDimensionName.innerText = isReversed ? '(Overworld)' : '(Nether)';

    updateYInputRange();
    updateConversion();
});

clearButton.addEventListener('click', () => {
    xInput.value = '';
    yInput.value = '';
    zInput.value = '';
    updateConversion();
});

copyButton.addEventListener('click', () => {
    const textToCopy = conversion.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Coordinates copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy coordinates.');
    });
});

updateYInputRange();

function updateYInputRange() {
    yInput.min = isReversed ? netherYMin : overYMin;
    yInput.max = isReversed ? netherYMax : overYMax;
}

function updateConversion() {
    let x = parseInt(xInput.value);
    let y = parseInt(yInput.value);
    let z = parseInt(zInput.value);

    const coords = isReversed
        ? netherToOverworld(x, y, z)
        : overworldToNether(x, y, z);

    x = isNaN(coords.x) ? '~' : coords.x;
    y = isNaN(coords.y) ? '~' : coords.y;
    z = isNaN(coords.z) ? '~' : coords.z;

    conversion.innerText = `${x} ${y} ${z}`;
}

[x1Input, y1Input, z1Input, x2Input, y2Input, z2Input].forEach(input => {
    input.addEventListener('input', updatePathResult);
});

clear1Button.addEventListener('click', () => {
    x1Input.value = '';
    y1Input.value = '';
    z1Input.value = '';
    updatePathResult();
});

clear2Button.addEventListener('click', () => {
    x2Input.value = '';
    y2Input.value = '';
    z2Input.value = '';
    updatePathResult();
});

function updatePathResult() {
    const x1 = parseInt(x1Input.value);
    const y1 = parseInt(y1Input.value);
    const z1 = parseInt(z1Input.value);
    const x2 = parseInt(x2Input.value);
    const y2 = parseInt(y2Input.value);
    const z2 = parseInt(z2Input.value);

    if (isNaN(x1) || isNaN(y1) || isNaN(z1) || isNaN(x2) || isNaN(y2) || isNaN(z2)) {
        displacementResult.innerText = '~ ~ ~';
        followResult.innerText = '~ ~ ~';
        distanceResult.innerText = '~';
        return;
    }

    const origin = {x1, y1, z1};
    const target = {x2, y2, z2};
    const d = displacement(origin, target);

    displacementResult.innerText = formatDisplacement(d);
    followResult.innerText = optimalPath(d);
    distanceResult.innerText = distance(d).toFixed(2);
}