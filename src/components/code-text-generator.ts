import { GRAPHSTYLE } from "./initials";
import { ILine } from "./types";

export namespace GenCode {
    function genLine(l: ILine) {
        return "ctx.beginPath();\n" +
            `ctx.moveTo(${l.p1.x}, ${l.p1.y});\n` +
            (l.cp2 ?
                `ctx.bezierCurveTo(${l.cp1.x}, ${l.cp1.y}, ${l.cp2.x}, ${l.cp2.y}, ${l.p2.x}, ${l.p2.y});\n` :
                `ctx.quadraticCurveTo(${l.cp1.x}, ${l.cp1.y}, ${l.p2.x}, ${l.p2.y});\n`
            ) +
            "ctx.stroke();\n";
    }

    function genLineAsArray(l: ILine) {
        return "{ " +
            `p1: {x: ${l.p1.x}, y: ${l.p1.y}}, p2: {x: ${l.p2.x}, y: ${l.p2.y}}, ` +
            (l.cp2 ?
                `cp1: {x: ${l.cp1.x}, y: ${l.cp1.y}}, cp2: {x: ${l.cp2.x}, y: ${l.cp2.y}}` :
                `cp1: {x: ${l.cp1.x}, y: ${l.cp1.y}}`
            ) +
            " }";
    }

    function genAll(lines: ILine[]) {
        return JSON.stringify(lines);
    }

    export function showCode(code: HTMLPreElement, lines: ILine[]) {
        if (code) {
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
            code.firstChild.nodeValue = txt;
        }
    }
} //namespace GenCode
