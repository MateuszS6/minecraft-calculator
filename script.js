const xInput = document.getElementById('x-input');
const yInput = document.getElementById('y-input');
const zInput = document.getElementById('z-input');
const result = document.getElementById('result');

[xInput, yInput, zInput].forEach(input => {
    input.addEventListener('input', updateResult);
});

function updateResult() {
    const x = parseInt(xInput.value);
    const y = parseInt(yInput.value);
    const z = parseInt(zInput.value);

    // Convert to Nether
    const netherX = isNaN(x) ? '~' : Math.floor(x / 8);
    const netherY = isNaN(y) ? '~' : Math.max(2, Math.min(y, 122));
    const netherZ = isNaN(z) ? '~' : Math.floor(z / 8);

    // Update result
    result.innerText = `${netherX} ${netherY} ${netherZ}`;
}