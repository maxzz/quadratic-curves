import { GRAPHSTYLE, hue } from "./initials";
import { ILine, IPoint } from "./types";

export namespace Line {
    export function initLine(quad: boolean, n: number): ILine {
        let defLine: ILine = {
            p1: { x: 39, y: 18 },
            p2: { x: 49, y: 282 },
            cp1: { x: 9, y: 116 },
            cp2: { x: 15, y: 195 },
            color: hue(10),
        };

        let line: ILine = JSON.parse(JSON.stringify(defLine)); // deep copy

        if (quad) {
            delete line.cp2;
        }

        for (var p in line) {
            if (typeof line[p] === 'string') {
                continue; // skip color
            }
            line[p].x = line[p].x + n * 80;
        }

        line.color = hue(n * 40);

        return line;
    }

    export function drawLine(c: CanvasRenderingContext2D, ln: ILine) {
        // curve
        c.lineWidth = GRAPHSTYLE.curve.width;
        c.strokeStyle = ln.color;

        c.beginPath();
        c.moveTo(ln.p1.x, ln.p1.y);

        if (ln.cp2) {
            c.bezierCurveTo(ln.cp1.x, ln.cp1.y, ln.cp2.x, ln.cp2.y, ln.p2.x, ln.p2.y);
        } else {
            c.quadraticCurveTo(ln.cp1.x, ln.cp1.y, ln.p2.x, ln.p2.y);
        }
        c.stroke();
        // c.fillStyle = 'black';
        // c.fill();

        // lines
        c.lineWidth = GRAPHSTYLE.pline.width;
        c.strokeStyle = GRAPHSTYLE.pline.color;

        c.beginPath();
        c.moveTo(ln.p1.x, ln.p1.y);
        c.lineTo(ln.cp1.x, ln.cp1.y);

        if (ln.cp2) {
            c.moveTo(ln.p2.x, ln.p2.y);
            c.lineTo(ln.cp2.x, ln.cp2.y);
        } else {
            c.lineTo(ln.p2.x, ln.p2.y);
        }

        c.stroke();

        // control points
        for (var p in ln) {
            let isControl = p === 'cp1' || p === 'cp2';

            c.lineWidth = isControl ? GRAPHSTYLE.cpoint.width : GRAPHSTYLE.circles.width;
            c.strokeStyle = GRAPHSTYLE.circles.color;
            c.fillStyle = isControl ? GRAPHSTYLE.circles.fill : ln.color;

            let stl = isControl ? GRAPHSTYLE.cpoint : GRAPHSTYLE.point;

            c.beginPath();
            c.arc(ln[p].x, ln[p].y, stl.radius, stl.arc1, stl.arc2, true);
            c.fill();
            c.stroke();
        }
    } //drawLine()

    export function lineHasPoint(line: ILine, pos: IPoint): { line: ILine, member: string; } | undefined {
        for (var member in line) {
            if (typeof line[member] === 'string') {
                continue; // skip color
            }

            let dx = line[member].x - pos.x;
            let dy = line[member].y - pos.y;

            if ((dx * dx) + (dy * dy) < GRAPHSTYLE.point.radius * GRAPHSTYLE.point.radius) {
                return { line, member };
            }
        }
    }

} //namespace Line
