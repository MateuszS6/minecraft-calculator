export function displacement({x1, y1, z1}, {x2, y2, z2}) {
    return {
        dx: x2 - x1,
        dy: y2 - y1,
        dz: z2 - z1
    };
}

export function formatDisplacement({dx, dy, dz}) {
    const signed = (value) => value > 0 ? `+${value}` : value;
    return `${signed(dx)} ${signed(dy)} ${signed(dz)}`;
}

export function distance({dx, dy, dz}) {
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function optimalPath({dx, dy, dz}) {
    const xDir = dx > 0 ? `${dx} East` : `${-dx} West`;
    const yDir = dy > 0 ? `${dy} Up` : `${-dy} Down`;
    const zDir = dz > 0 ? `${dz} South` : `${-dz} North`;

    const [first, second] = Math.abs(dx) >= Math.abs(dz) ? [xDir, zDir] : [zDir, xDir];

    return `${first}, ${second}, ${yDir}`;
}