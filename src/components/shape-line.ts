import { GRAPHSTYLE, hue } from "./initials";
import { ILine, ILinePosKeys, IPoint, LinePoints } from "./types";
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

    const highlightA1 = degToRad(180);
    const highlightA2 = degToRad(205);

    const highlightB1 = degToRad(220);
    const highlightB2 = degToRad(280);

    c.lineWidth = 1;
    c.strokeStyle = '#ffffffc0';

    c.beginPath();
    c.arc(x, y, style.radius - 4, highlightA1, highlightA2, false);
    c.stroke();

    c.beginPath();
    c.arc(x, y, style.radius - 4, highlightB1, highlightB2, false);
    c.stroke();
}

type XY = [x: number, y: number];

type CurvePoints = [p1: XY, p2: XY, p3: XY, p4?: XY];

function drawCurveLine(c: CanvasRenderingContext2D, curvePoints: CurvePoints) {
    const [p1, p2, cp1, cp2] = curvePoints;
    c.beginPath();
    c.moveTo(p1[0], p1[1]);
    if (cp2) {
        c.bezierCurveTo(cp1[0], cp1[1], cp2[0], cp2[1], p2[0], p2[1]);
    } else {
        c.quadraticCurveTo(cp1[0], cp1[1], p2[0], p2[1]);
    }
    c.stroke();
}

function linePtsToCurvePts(pts: LinePoints): CurvePoints {
    const curvePoints: CurvePoints = [[pts.p1.x, pts.p1.y], [pts.p2.x, pts.p2.y], [pts.cp1.x, pts.cp1.y], ];
    if (pts.cp2) {
        curvePoints.push([pts.cp2.x, pts.cp2.y]);
    }
    return curvePoints;
}

export function drawCurve(c: CanvasRenderingContext2D, ln: ILine) {
    const thisPoints = ln.points;

    // 1. Draw curves
    c.lineWidth = GRAPHSTYLE.curve.width;
    c.strokeStyle = ln.color || '';

    //const curvePoints: CurvePoints = linePtsToCurvePts(thisPoints);

    c.beginPath();
    c.moveTo(thisPoints.p1.x, thisPoints.p1.y);
    if (thisPoints.cp2) {
        c.bezierCurveTo(thisPoints.cp1.x, thisPoints.cp1.y, thisPoints.cp2.x, thisPoints.cp2.y, thisPoints.p2.x, thisPoints.p2.y);
    } else {
        c.quadraticCurveTo(thisPoints.cp1.x, thisPoints.cp1.y, thisPoints.p2.x, thisPoints.p2.y);
    }
    c.stroke();

    // 2.1. Draw line to control point 1
    c.setLineDash([2, 2]);

    c.lineWidth = GRAPHSTYLE.ctrlLine.width;
    c.strokeStyle = GRAPHSTYLE.ctrlLine.color;

    c.beginPath();
    c.moveTo(thisPoints.p1.x, thisPoints.p1.y);
    c.lineTo(thisPoints.cp1.x, thisPoints.cp1.y);

    // 2.2. Draw line to control point 2
    if (thisPoints.cp2) {
        c.moveTo(thisPoints.p2.x, thisPoints.p2.y);
        c.lineTo(thisPoints.cp2.x, thisPoints.cp2.y);
    } else {
        c.lineTo(thisPoints.p2.x, thisPoints.p2.y);
    }
    c.stroke();

    c.setLineDash([]);

    // 3. Draw circles
    for (const [key, val] of Object.entries(ln.points)) {
        let isControl = key === 'cp1' || key === 'cp2';

        if (!val) { continue; }
        const { x, y } = val;
        drawPoint(c, x, y, isControl, ln.color || '');
    }
} //drawLine()

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
