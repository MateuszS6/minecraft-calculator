const overYMin = -62;
const overYMax = 316;
const netherYMin = 2;
const netherYMax = 123;

const xInput = document.getElementById('x-input');
const yInput = document.getElementById('y-input');
const zInput = document.getElementById('z-input');
const result = document.getElementById('result');

const inputDimensionName = document.getElementById('input-dimension');
const outputDimensionName = document.getElementById('output-dimension');
const reverseButton = document.getElementById('reverse-button');
const clearButton = document.getElementById('clear-button');
const copyButton = document.getElementById('copy-button');

let isReversed = false;

[xInput, yInput, zInput].forEach(input => {
    input.addEventListener('input', updateResult);
});

reverseButton.addEventListener('click', () => {
    isReversed = !isReversed

    // Update UI
    inputDimensionName.innerText = isReversed ? 'Nether Coords' : 'Overworld Coords';
    outputDimensionName.innerText = isReversed ? 'Overworld Coords' : 'Nether Coords';
    reverseButton.innerText = isReversed ? 'Switch to Overworld → Nether' : 'Switch to Nether → Overworld';

    updateYInputRange();
    updateResult();
});

clearButton.addEventListener('click', () => {
    xInput.value = '';
    yInput.value = '';
    zInput.value = '';
    updateResult();
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
    if (!isReversed) {
        yInput.min = overYMin;
        yInput.max = overYMax;
    } else {
        yInput.min = netherYMin;
        yInput.max = netherYMax;
    }
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function updateResult() {
    const x = parseInt(xInput.value);
    const y = parseInt(yInput.value);
    const z = parseInt(zInput.value);

    if (!isReversed) {
        // Overworld → Nether
        const netherX = isNaN(x) ? '~' : Math.floor(x / 8);
        const netherY = isNaN(y) ? '~' : clamp(y, netherYMin, netherYMax);
        const netherZ = isNaN(z) ? '~' : Math.floor(z / 8);
        result.innerText = `${netherX} ${netherY} ${netherZ}`;
    } else {
        // Nether → Overworld
        const overX = isNaN(x) ? '~' : x * 8;
        const overY = isNaN(y) ? '~' : clamp(y, overYMin, overYMax);
        const overZ = isNaN(z) ? '~' : z * 8;
        result.innerText = `${overX} ${overY} ${overZ}`;
    }
}