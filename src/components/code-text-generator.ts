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
    const path = c2
        ? `cp1: {x: ${c1[0]}, y: ${c1[1]}}, cp2: {x: ${c2[0]}, y: ${c2[1]}}`
        : `cp1: {x: ${c1[0]}, y: ${c1[1]}}`;
    return `{ p1: {x: ${p1[0]}, y: ${p1[1]}}, p2: {x: ${p2[0]}, y: ${p2[1]}}, ${path}  }`;
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
    txt += `\n\nconst persistent = [\n    '${genAll(curves)}',\n];\n\n`;

    const allCurves = appCurves.map((sceneCurves) => `    '${genAll(sceneCurves)}',`).join('\n');

    txt += `\n\nconst persistent = [\n${allCurves}\n];\n\n`;

    return txt;
}

/*
     '[
        {"points":[[39,18],[49,282],[9,116],[15,195]],"color":"hsla(0, 100%, 50%, 0.95)"},
        {"points":[[119,18],[129,282],[89,116],[95,195]],"color":"hsla(40, 100%, 50%, 0.95)"},
        {"points":[[199,18],[209,282],[169,116],[175,195]],"color":"hsla(80, 100%, 50%, 0.95)"},
        {"points":[[279,18],[289,282],[249,116],[255,195]],"color":"hsla(120, 100%, 50%, 0.95)"},
        {"points":[[359,18],[369,282],[329,116],[335,195]],"color":"hsla(160, 100%, 50%, 0.95)"},
        {"points":[[439,18],[449,282],[409,116],[415,195]],"color":"hsla(200, 100%, 50%, 0.95)"},
        {"points":[[519,18],[529,282],[489,116],[495,195]],"color":"hsla(240, 100%, 50%, 0.95)"}
    ]',

 */

/*



const persistent = [
    '[{"points":[[39,18],[49,282],[9,116],[15,195]],"color":"hsla(0, 100%, 50%, 0.95)"},{"points":[[119,18],[129,282],[89,116],[95,195]],"color":"hsla(40, 100%, 50%, 0.95)"},{"points":[[199,18],[209,282],[169,116],[175,195]],"color":"hsla(80, 100%, 50%, 0.95)"},{"points":[[279,18],[289,282],[249,116],[255,195]],"color":"hsla(120, 100%, 50%, 0.95)"},{"points":[[359,18],[369,282],[329,116],[335,195]],"color":"hsla(160, 100%, 50%, 0.95)"},{"points":[[439,18],[449,282],[409,116],[415,195]],"color":"hsla(200, 100%, 50%, 0.95)"},{"points":[[519,18],[529,282],[489,116],[495,195]],"color":"hsla(240, 100%, 50%, 0.95)"}]',
    '[{"points":[[126,174],[121,429],[55,246],[80,324]],"color":"hsla(0, 100%, 50%, 0.95)"},{"points":[[177,244],[122,429],[136,287],[125,329]],"color":"hsla(40, 100%, 50%, 0.95)"},{"points":[[127,174],[179,243],[155,183],[167,209]],"color":"hsla(80, 100%, 50%, 0.95)"},{"points":[[164,138],[223,229],[195,145],[216,177]],"color":"hsla(120, 100%, 50%, 0.95)"},{"points":[[166,136],[261,82],[191,98],[230,91]],"color":"hsla(160, 100%, 50%, 0.95)"},{"points":[[318,174],[225,230],[293,196],[266,215]],"color":"hsla(200, 100%, 50%, 0.95)"},{"points":[[262,83],[319,175],[312,98],[320,143]],"color":"hsla(240, 100%, 50%, 0.95)"}]',
    '[{"points":[[133,33],[32,160],[78,51],[52,81]],"color":"hsla(0, 100%, 50%, 0.95)"},{"points":[[184,89],[30,162],[119,89],[79,119]],"color":"hsla(40, 100%, 50%, 0.95)"},{"points":[[134,33],[189,90],[152,54],[165,77]],"color":"hsla(80, 100%, 50%, 0.95)"}]',
    '[{"points":[[146,92],[49,282],[46,92]],"color":"hsla(0, 100%, 50%, 0.95)"},{"points":[[147,92],[196,138],[177,102]],"color":"hsla(40, 100%, 50%, 0.95)"},{"points":[[197,139],[48,285],[90,143]],"color":"hsla(80, 100%, 50%, 0.95)"}]',
    '[{"points":[[17,281],[51,53],[9,116]],"color":"hsla(0, 100%, 50%, 0.95)"},{"points":[[51,53],[112,100],[105,72]],"color":"hsla(40, 100%, 50%, 0.95)"},{"points":[[111,100],[16,282],[56,161]],"color":"hsla(80, 100%, 50%, 0.95)"},{"points":[[97,23],[197,18],[154,14]],"color":"hsla(120, 100%, 50%, 0.95)"},{"points":[[198,18],[234,59],[238,28]],"color":"hsla(160, 100%, 50%, 0.95)"},{"points":[[234,59],[157,74],[218,77]],"color":"hsla(200, 100%, 50%, 0.95)"},{"points":[[158,75],[99,23],[180,54]],"color":"hsla(240, 100%, 50%, 0.95)"}]',
    '[{"points":[[36,279],[107,84],[39,129]],"color":"hsla(0, 100%, 50%, 0.95)"},{"points":[[107,84],[157,133],[139,99]],"color":"hsla(40, 100%, 50%, 0.95)"},{"points":[[157,133],[36,280],[83,173]],"color":"hsla(80, 100%, 50%, 0.95)"},{"points":[[144,54],[211,16],[174,23]],"color":"hsla(120, 100%, 50%, 0.95)"},{"points":[[211,14],[267,78],[249,32]],"color":"hsla(160, 100%, 50%, 0.95)"},{"points":[[266,76],[197,105],[228,81]],"color":"hsla(200, 100%, 50%, 0.95)"},{"points":[[198,106],[143,54],[186,65]],"color":"hsla(240, 100%, 50%, 0.95)"}]',
    '[{"points":[[106,654],[39,324],[452,334]],"color":"hsla(0, 100%, 50%, 0.95)"},{"points":[[39,324],[512,160],[60,561]],"color":"hsla(40, 100%, 50%, 0.95)"},{"points":[[512,160],[106,655],[619,645]],"color":"hsla(80, 100%, 50%, 0.95)"},{"points":[[145,133],[212,78],[38,55]],"color":"hsla(120, 100%, 50%, 0.95)"},{"points":[[212,76],[252,142],[477,66]],"color":"hsla(160, 100%, 50%, 0.95)"},{"points":[[251,140],[188,187],[313,267]],"color":"hsla(200, 100%, 50%, 0.95)"},{"points":[[189,188],[144,133],[40,326]],"color":"hsla(240, 100%, 50%, 0.95)"}]',
    '[{"points":[[589,37],[32,160],[51,31],[602,178]],"color":"hsla(0, 100%, 50%, 0.95)"},{"points":[[412,394],[30,162],[313,140],[30,378]],"color":"hsla(40, 100%, 50%, 0.95)"},{"points":[[590,37],[417,395],[325,35],[599,402]],"color":"hsla(80, 100%, 50%, 0.95)"}]',
    '[{"points":[[687,309],[56,664],[51,31],[602,178]],"color":"hsla(0, 100%, 50%, 0.95)"},{"points":[[486,664],[54,666],[98,111],[30,378]],"color":"hsla(40, 100%, 50%, 0.95)"},{"points":[[688,309],[485,665],[99,110],[76,478]],"color":"hsla(80, 100%, 50%, 0.95)"}]',
    '[{"points":[[119,16],[270,304],[9,116],[41,293]],"color":"hsla(0, 100%, 50%, 0.95)"},{"points":[[119,18],[271,300],[89,116],[111,281]],"color":"hsla(40, 100%, 50%, 0.95)"},{"points":[[199,18],[264,301],[169,116],[175,195]],"color":"hsla(80, 100%, 50%, 0.95)"},{"points":[[266,18],[269,300],[262,118],[262,197]],"color":"hsla(120, 100%, 50%, 0.95)"},{"points":[[359,18],[278,299],[365,125],[335,195]],"color":"hsla(160, 100%, 50%, 0.95)"},{"points":[[439,18],[275,297],[409,116],[434,265]],"color":"hsla(200, 100%, 50%, 0.95)"},{"points":[[438,19],[271,300],[525,112],[521,277]],"color":"hsla(240, 100%, 50%, 0.95)"}]',
];

*/