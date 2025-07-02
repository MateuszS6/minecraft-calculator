import {netherToOverworld, overworldToNether} from "./conversion.js";
import {displacement, distance, optimalPath} from "./path.js";

const overYMin = -62;
const overYMax = 316;
const netherYMin = 2;
const netherYMax = 123;

const xInput = document.getElementById('x-input');
const yInput = document.getElementById('y-input');
const zInput = document.getElementById('z-input');
const result = document.getElementById('result');

const modeText = document.getElementById('mode-text');
const inputDimensionName = document.getElementById('input-dimension');
const outputDimensionName = document.getElementById('output-dimension');
const reverseButton = document.getElementById('reverse-button');
const clearButton = document.getElementById('clear-button');
const copyButton = document.getElementById('copy-button');

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
    const textToCopy = result.innerText;
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

    result.innerText = `${x} ${y} ${z}`;
}