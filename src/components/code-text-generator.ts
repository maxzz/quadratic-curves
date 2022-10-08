import { SingleCurve, XY } from "./types";
import { GRAPHSTYLE } from "./initials";

const allToString = (lines: SingleCurve[]) => JSON.stringify(lines);
const formatPt = ([x, y]: XY) => `${`${x}`.padStart(3, ' ')},${`${y}`.padStart(3, ' ')}`;

function gen1_JSCode(curves: SingleCurve[], lineWidth: number) {
    function genLine(line: SingleCurve) {
        const [p1, p2, c1, c2] = line.points;
        const path = c2
            ? `ctx.bezierCurveTo(${c1[0]}, ${c1[1]}, ${c2[0]}, ${c2[1]}, ${p2[0]}, ${p2[1]});`
            : `ctx.quadraticCurveTo(${c1[0]}, ${c1[1]}, ${p2[0]}, ${p2[1]});`;
        return `ctx.beginPath();\nctx.moveTo(${p1[0]}, ${p1[1]});\n${path}\nctx.stroke();\n`;
    }

    let txt =
        "canvas = document.getElementById('canvas');\n" +
        "ctx = canvas.getContext('2d');\n" +
        `ctx.lineWidth = ${lineWidth};\n\n`;

    txt += curves.map((line) => `${genLine(line)}`).join('\n');
    return txt;
}

function gen2_PointsArray(curves: SingleCurve[]) {
    function genLineAsArray(line: SingleCurve) {
        const [p1, p2, c1, c2] = line.points;
        const more = c2 ? ` [${formatPt(c2)}]` : '';
        return `{points: [ [${formatPt(p1)}], [${formatPt(p2)}], [${formatPt(c1)}],${more} ]}`;
    }
    
    return `\nconst points = [\n${curves.map((line) => `    ${genLineAsArray(line)},`).join('\n')}\n];`;
}

function gen3_Current(curves: SingleCurve[]) {
    return `\n\nconst current = [\n    '${allToString(curves)}',\n];\n`;
}

function gen4_Persistent(appCurves: SingleCurve[][]) {
    const allCurves = appCurves.map((sceneCurves) => `    '${allToString(sceneCurves)}',`).join('\n');
    return `\nconst persistent = [\n${allCurves}\n];\n`;
}

export function generateCodeText(curves: SingleCurve[], appCurves: SingleCurve[][]): string {

    let txt = gen1_JSCode(curves, GRAPHSTYLE.curve.width);
    txt += gen2_PointsArray(curves);
    txt += gen3_Current(curves);
    txt += gen4_Persistent(appCurves);

    return txt;
}
