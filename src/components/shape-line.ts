import { GRAPHSTYLE, hue } from "./initials";
import { CurvePoints, ILine, ILinePosKeys, IPoint, LinePoints, linePtsToCurvePts, scaleCurvePts, XY } from "./types";
import Color from "color";
import { degToRad } from "../utils/utils-math";

export function createCurve(doQuad: boolean, n: number): ILine {
    let defLine: ILine = {
        points: {
            p1: { x: 39, y: 18 },
            p2: { x: 49, y: 282 },
            cp1: { x: 9, y: 116 },
            cp2: { x: 15, y: 195 },
        },
        color: hue(10),
    };

    let line: ILine = JSON.parse(JSON.stringify(defLine)); // deep copy

    if (doQuad) {
        delete line.points.cp2;
    }

    Object.values(line.points).forEach((val) => val.x = val.x + n * 80);

    line.color = hue(n * 40);

    return line;
}

function drawCurveLine(c: CanvasRenderingContext2D, curvePoints: CurvePoints, color: string) {
    const [p1, p2, cp1, cp2] = curvePoints;

    c.lineWidth = GRAPHSTYLE.curve.width;
    c.strokeStyle = color;

    c.beginPath();
    c.moveTo(p1[0], p1[1]);
    if (cp2) {
        c.bezierCurveTo(cp1[0], cp1[1], cp2[0], cp2[1], p2[0], p2[1]);
    } else {
        c.quadraticCurveTo(cp1[0], cp1[1], p2[0], p2[1]);
    }
    c.stroke();
}

function drawControlPointLines(c: CanvasRenderingContext2D, curvePoints: CurvePoints) {
    const [p1, p2, cp1, cp2] = curvePoints;

    // 2.1. Draw line to control point 1
    c.setLineDash([2, 2]);
    c.lineWidth = GRAPHSTYLE.ctrlLine.width;
    c.strokeStyle = GRAPHSTYLE.ctrlLine.color;

    c.beginPath();
    c.moveTo(p1[0], p1[1]);
    c.lineTo(cp1[0], cp1[1]);

    // 2.2. Draw line to control point 2
    if (cp2) {
        c.moveTo(p2[0], p2[1]);
        c.lineTo(cp2[0], cp2[1]);
    } else {
        c.lineTo(p2[0], p2[1]);
    }
    c.stroke();

    c.setLineDash([]);
}

const highligts = {
    a1: degToRad(180),
    a2: degToRad(205),
    b1: degToRad(220),
    b2: degToRad(280),
};

function drawPoint(c: CanvasRenderingContext2D, x: number, y: number, isControl: boolean, color: string) {
    let style = isControl ? GRAPHSTYLE.cpoint : GRAPHSTYLE.point;

    c.fillStyle = c.fillStyle = isControl ? GRAPHSTYLE.circles.fill : color ? Color(color).alpha(.5).darken(0.5).hexa() : '';
    c.beginPath();
    c.arc(x + 1, y + 1, style.radius + 1, style.startAngle, style.endAngle, true);
    c.fill();

    c.lineWidth = isControl ? 5 : GRAPHSTYLE.circles.width;
    c.strokeStyle = isControl ? '#00000040' : '#00000040'; // GRAPHSTYLE.circles.color
    c.fillStyle = isControl ? GRAPHSTYLE.circles.fill : color || '';

    c.beginPath();
    c.arc(x, y, style.radius, style.startAngle, style.endAngle, true);
    c.fill();
    c.stroke();

    c.lineWidth = 1;
    c.strokeStyle = '#ffffffc0';

    c.beginPath();
    c.arc(x, y, style.radius - 4, highligts.a1, highligts.a2, false);
    c.stroke();

    c.beginPath();
    c.arc(x, y, style.radius - 4, highligts.b1, highligts.b2, false);
    c.stroke();
}

export function drawCurve(c: CanvasRenderingContext2D, ln: ILine) {
    const curvePoints: CurvePoints = linePtsToCurvePts(ln.points);

    drawCurveLine(c, curvePoints, ln.color || '');

    drawControlPointLines(c, curvePoints);

    curvePoints.forEach((point, idx) => {
        if (point) {
            const isControl = idx > 2;
            drawPoint(c, point[0], point[1], isControl, ln.color || '');
        }
    });
}

export function curveHasPoint(line: ILine, pos: IPoint): { line: ILine, member: ILinePosKeys; } | undefined {
    const hitZone = Math.pow(GRAPHSTYLE.point.radius, 2);

    for (const [key, pt] of Object.entries(line.points)) {
        let dx = pt.x - pos.x;
        let dy = pt.y - pos.y;

        if ((dx * dx) + (dy * dy) < hitZone) {
            return { line, member: key as ILinePosKeys };
        }
    }
}
