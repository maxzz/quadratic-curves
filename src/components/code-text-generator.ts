import { GRAPHSTYLE } from "./initials";
import { SingleCurve } from "./types";

function genLine(line: SingleCurve) {
    const [p1, p2, c1, c2] = line.points;
    const path = c2
        ? `ctx.bezierCurveTo(${c1[0]}, ${c1[1]}, ${c2[0]}, ${c2[1]}, ${p2[0]}, ${p2[1]});`
        : `ctx.quadraticCurveTo(${c1[0]}, ${c1[1]}, ${p2[0]}, ${p2[1]});`;
    return `ctx.beginPath();\nctx.moveTo(${p1[0]}, ${p1[1]});\n${path}\nctx.stroke();\n`;
}

function genLineAsArray(line: SingleCurve) {
    const [p1, p2, c1, c2] = line.points;
    const more = c2 ? ` [${c2[0]},${c2[1]}]` : '';
    return `{points: [ [${p1[0]},${p1[1]}], [${p2[0]},${p2[1]}], [${c1[0]},${c1[1]}],${more} ]}`;
}

// function genLineAsArray(line: SingleCurve) {
//     const [p1, p2, c1, c2] = line.points;
//     const path = c2
//         ? `cp1: {x: ${c1[0]}, y: ${c1[1]}}, cp2: {x: ${c2[0]}, y: ${c2[1]}}`
//         : `cp1: {x: ${c1[0]}, y: ${c1[1]}}`;
//     return `{ p1: {x: ${p1[0]}, y: ${p1[1]}}, p2: {x: ${p2[0]}, y: ${p2[1]}}, ${path}  }`;
// }

function genAll(lines: SingleCurve[]) {
    return JSON.stringify(lines);
}

export function generateCodeText(curves: SingleCurve[], appCurves: SingleCurve[][]): string {
    // 1. Build components
    let txt =
        "canvas = document.getElementById('canvas');\n" +
        "ctx = canvas.getContext('2d');\n" +
        `ctx.lineWidth = ${GRAPHSTYLE.curve.width};\n\n`;

    txt += curves.map((line) => `${genLine(line)}`).join('\n');

    // 2. Build points array
    txt += `\nconst points = [\n${curves.map((line) => `    ${genLineAsArray(line)},`).join('\n')}\n];`;

    // 3. Build persistent state
    txt += `\n\nconst current = [\n    '${genAll(curves)}',\n];\n`;

    const allCurves = appCurves.map((sceneCurves) => `    '${genAll(sceneCurves)}',`).join('\n');

    txt += `\nconst persistent = [\n${allCurves}\n];\n`;

    return txt;
}
