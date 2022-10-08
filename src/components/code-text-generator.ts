import { SingleCurve, XY } from "./types";
import { GRAPHSTYLE } from "./initials";

function genLine(line: SingleCurve) {
    const [p1, p2, c1, c2] = line.points;
    const path = c2
        ? `ctx.bezierCurveTo(${c1[0]}, ${c1[1]}, ${c2[0]}, ${c2[1]}, ${p2[0]}, ${p2[1]});`
        : `ctx.quadraticCurveTo(${c1[0]}, ${c1[1]}, ${p2[0]}, ${p2[1]});`;
    return `ctx.beginPath();\nctx.moveTo(${p1[0]}, ${p1[1]});\n${path}\nctx.stroke();\n`;
}

const pt = ([x, y]: XY) => `${`${x}`.padStart(3, ' ')},${`${y}`.padStart(3, ' ')}`;

function genLineAsArray(line: SingleCurve) {
    const [p1, p2, c1, c2] = line.points;
    const more = c2 ? ` [${pt(c2)}]` : '';
    return `{points: [ [${pt(p1)}], [${pt(p2)}], [${pt(c1)}],${more} ]}`;
}

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
