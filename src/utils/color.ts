const palette = require('google-palette');

const colors = palette(['tol', 'qualitative'], 50, 0).map((c: string) => `#${c}`);

export function getColorFromIndex(i: number) {
    return colors[i % colors.length];
}
