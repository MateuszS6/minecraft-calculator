export function clampNetherY(val) {
    return Math.min(123, Math.max(2, val));
}

export function overworldToNether(x, y, z) {
    return {
        x: Math.floor(x / 8),
        y: clampNetherY(Math.floor(y / 8)),
        z: Math.floor(z / 8)
    };
}

export function netherToOverworld(x, y, z) {
    return {
        x: x * 8,
        y: y,
        z: z * 8
    };
}