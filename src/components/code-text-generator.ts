import { GRAPHSTYLE } from "./initials";
import { ILine, linePtsToCurvePts } from "./types";

function genLine(l: ILine) {
    const pts = l.points;
    const [p1, p2, c1, c2] = linePtsToCurvePts(l.points);
    const path = c2
        ? `ctx.bezierCurveTo(${c1[0]}, ${c1[1]}, ${c2[0]}, ${c2[1]}, ${p2[0]}, ${p2[1]});`
        : `ctx.quadraticCurveTo(${c1[0]}, ${c1[1]}, ${p2[0]}, ${p2[1]});`;
    return `ctx.beginPath();\nctx.moveTo(${p1[0]}, ${p1[1]});\n${path}\nctx.stroke();\n`;
}

// function genLine(l: ILine) {
//     const pts = l.points;
//     return "ctx.beginPath();\n" +
//         `ctx.moveTo(${pts.p1.x}, ${pts.p1.y});\n` +
//         (pts.cp2
//             ? `ctx.bezierCurveTo(${pts.cp1.x}, ${pts.cp1.y}, ${pts.cp2.x}, ${pts.cp2.y}, ${pts.p2.x}, ${pts.p2.y});\n`
//             : `ctx.quadraticCurveTo(${pts.cp1.x}, ${pts.cp1.y}, ${pts.p2.x}, ${pts.p2.y});\n`
//         ) +
//         "ctx.stroke();\n";
// }

function genLineAsArray(l: ILine) {
    const pts = l.points;
    return "{ " +
        `p1: {x: ${pts.p1.x}, y: ${pts.p1.y}}, p2: {x: ${pts.p2.x}, y: ${pts.p2.y}}, ` +
        (pts.cp2
            ? `cp1: {x: ${pts.cp1.x}, y: ${pts.cp1.y}}, cp2: {x: ${pts.cp2.x}, y: ${pts.cp2.y}}`
            : `cp1: {x: ${pts.cp1.x}, y: ${pts.cp1.y}}`
        ) +
        " }";
}

function genAll(lines: ILine[]) {
    return JSON.stringify(lines);
}

export function generateCodeText(lines: ILine[]): string {
    // 1. Build components
    let txt =
        "canvas = document.getElementById('canvas');\n" +
        "ctx = canvas.getContext('2d');\n" +
        `ctx.lineWidth = ${GRAPHSTYLE.curve.width};\n`;

    lines.forEach(ln => txt += `\n${genLine(ln)}`);

    // 2. Build points array
    let body = '\nconst points = [';
    lines.forEach(ln => body += `\n    ${genLineAsArray(ln)},`);
    txt += `${body}\n];`;

    txt += `\n// prev = '${genAll(lines)}';\n\n`;

    // 3. set text to DOM
    return txt;
}
