import { GRAPHSTYLE } from "./initials";
import { ILine } from "./types";

export namespace GenCode {
    function genLine(l: ILine) {
        const pts = l.points;
        return "ctx.beginPath();\n" +
            `ctx.moveTo(${pts.p1.x}, ${pts.p1.y});\n` +
            (pts.cp2 ?
                `ctx.bezierCurveTo(${pts.cp1.x}, ${pts.cp1.y}, ${pts.cp2.x}, ${pts.cp2.y}, ${pts.p2.x}, ${pts.p2.y});\n` :
                `ctx.quadraticCurveTo(${pts.cp1.x}, ${pts.cp1.y}, ${pts.p2.x}, ${pts.p2.y});\n`
            ) +
            "ctx.stroke();\n";
    }

    function genLineAsArray(l: ILine) {
        const pts = l.points;
        return "{ " +
            `p1: {x: ${pts.p1.x}, y: ${pts.p1.y}}, p2: {x: ${pts.p2.x}, y: ${pts.p2.y}}, ` +
            (pts.cp2 ?
                `cp1: {x: ${pts.cp1.x}, y: ${pts.cp1.y}}, cp2: {x: ${pts.cp2.x}, y: ${pts.cp2.y}}` :
                `cp1: {x: ${pts.cp1.x}, y: ${pts.cp1.y}}`
            ) +
            " }";
    }

    function genAll(lines: ILine[]) {
        return JSON.stringify(lines);
    }

    export function showCode(lines: ILine[]): string {
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
} //namespace GenCode
