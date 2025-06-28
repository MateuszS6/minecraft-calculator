const xInput = document.getElementById('x-input');
const yInput = document.getElementById('y-input');
const zInput = document.getElementById('z-input');
const result = document.getElementById('result');

const reverseButton = document.getElementById('reverse-button');
const inputDimension = document.getElementById('input-dimension');
const outputDimension = document.getElementById('output-dimension');

let isReversed = false;

[xInput, yInput, zInput].forEach(input => {
    input.addEventListener('input', updateResult);
});

reverseButton.addEventListener('click', () => {
    isReversed = !isReversed;

    // Update UI
    inputDimension.innerText = isReversed
        ? 'Nether Coords'
        : 'Overworld Coords';

    outputDimension.innerText = isReversed
        ? 'Overworld Coords'
        : 'Nether Coords';

    reverseButton.innerText = isReversed
        ? 'Switch to Overworld → Nether'
        : 'Switch to Nether → Overworld';

    if (!isReversed) {
        yInput.min = -62;
        yInput.max = 316;
    } else {
        yInput.min = 2;
        yInput.max = 123;
    }

    updateResult();
})

function updateResult() {
    const x = parseInt(xInput.value);
    const y = parseInt(yInput.value);
    const z = parseInt(zInput.value);

    if (!isReversed) {
        // Overworld → Nether
        const netherX = isNaN(x) ? '~' : Math.floor(x / 8);
        const netherY = isNaN(y) ? '~' : Math.min(123, Math.max(2, y));
        const netherZ = isNaN(z) ? '~' : Math.floor(z / 8);
        result.innerText = `${netherX} ${netherY} ${netherZ}`;
    } else {
        // Nether → Overworld
        const overX = isNaN(x) ? '~' : x * 8;
        const overY = isNaN(y) ? '~' : Math.min(316, Math.max(-62, y));
        const overZ = isNaN(z) ? '~' : z * 8;
        result.innerText = `${overX} ${overY} ${overZ}`;
    }
}