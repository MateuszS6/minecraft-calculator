const xInput = document.getElementById('overworld-x');
const yInput = document.getElementById('overworld-y');
const zInput = document.getElementById('overworld-z');
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
    const netherY = isNaN(y) ? '~' : y;
    const netherZ = isNaN(z) ? '~' : Math.floor(z / 8);

    // Update result
    result.innerText = `${netherX} ${netherY} ${netherZ}`;
}