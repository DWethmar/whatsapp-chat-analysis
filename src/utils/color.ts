export const colors = [
    "red", 
    "blue", 
    "green", 
    "yellow", 
    "orange", 
    "brown",
    "purple",
    "pink",
    "darkturquoise",
    "darkkhaki",
    "slateblue",
    "rosybrown",
];

export function getColorFromIndex(i: number) {
    return colors[Math.ceil(i % colors.length)];
}
