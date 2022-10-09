import { SingleCurve, XY } from "./types";
import { GRAPHSTYLE } from "./initials";

const allToString = (lines: SingleCurve[]) => JSON.stringify(lines);
const pt = ([x, y]: XY) => `${x},${y}`;
const formatPt = ([x, y]: XY) => `${`${x}`.padStart(3, ' ')},${`${y}`.padStart(3, ' ')}`;

function gen1_JSCode(curves: SingleCurve[], lineWidth: number) {
    function genLine(line: SingleCurve) {
        const [p1, p2, c1, c2] = line.points;
        const path = c2
            ? `ctx.bezierCurveTo(${c1[0]}, ${c1[1]}, ${c2[0]}, ${c2[1]}, ${p2[0]}, ${p2[1]});`
            : `ctx.quadraticCurveTo(${c1[0]}, ${c1[1]}, ${p2[0]}, ${p2[1]});`;

        return `ctx.beginPath();\nctx.moveTo(${p1[0]}, ${p1[1]});\n${path}\nctx.stroke();`;
    }

    return (
        "canvas = document.getElementById('canvas');\n" +
        "ctx = canvas.getContext('2d');\n" +
        `ctx.lineWidth = ${lineWidth};\n` +
        curves.map((line) => `\n${genLine(line)}`).join('\n')
    );
}

function gen2_PointsArray(curves: SingleCurve[]) {
    function genLineAsArray(line: SingleCurve) {
        const [p1, p2, c1, c2] = line.points;
        const more = c2 ? ` [${formatPt(c2)}]` : '';
        return `{points: [ [${formatPt(p1)}], [${formatPt(p2)}], [${formatPt(c1)}],${more} ]}`;
    }

    return `const points = [\n${curves.map((line) => `    ${genLineAsArray(line)},`).join('\n')}\n];`;
}

function gen3_Current(curves: SingleCurve[]) {
    return `const current = [\n    '${allToString(curves)}',\n];`;
}

function gen4_Persistent(appCurves: SingleCurve[][]) {
    const allCurves = appCurves.map((sceneCurves, idx) => `   /* ${`${idx + 1}`.padStart(2, ' ')} */ '${allToString(sceneCurves)}',`).join('\n'); // idx 0 for predefined
    return `const persistent = [\n${allCurves}\n];`;
}

export function generateCodeText(curves: SingleCurve[], appCurves: SingleCurve[][]): string {

    const txt1 = gen1_JSCode(curves, GRAPHSTYLE.curve.width);
    const txt2 = gen2_PointsArray(curves);
    const txt3 = gen3_Current(curves);
    const txt4 = gen4_Persistent(appCurves);

    return `${txt3}\n\n${txt4}\n\n${txt2}\n\n${txt1}\n\n`;
}
