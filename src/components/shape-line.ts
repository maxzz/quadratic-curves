import { GRAPHSTYLE, hue } from "./initials";
import { CurvePoints, SingleCurve, PointXY, XY } from "./types";
import { degToRad } from "../utils/utils-math";
import Color from "color";

export function createCurve(doQuad: boolean, lineIdx: number): SingleCurve {
    const def = '{"points":[[60,19],[66,279],[23,110],[113,174]],"color":"hsla(0, 100%, 50%, 0.95)"}'; // for deep copy

    let line: SingleCurve = JSON.parse(def);
    doQuad && line.points.pop();

    line.points = line.points.map(([x, y]) => [x + lineIdx * 80, y]) as CurvePoints;
    line.color = hue(lineIdx * 40);

    return line;
}

export function generateDefaultScene({ nLines, doQuad }: { nLines: number; doQuad: boolean; }): SingleCurve[] { // TODO: this may go as static text definition, no need code (unless scale but it should be done anyway)
    // const nLines: number = 7; // init(appContext, 7, canvas.className == 'quadratic', oldStrings ? oldStrings[0] : undefined);
    // const doQuad: boolean = false;
    const rv: SingleCurve[] = [];
    for (let idx = 0; idx < nLines; idx++) {
        rv.push(createCurve(doQuad, idx));
    }
    return rv;
}

function drawCurveLine(c: CanvasRenderingContext2D, curvePoints: CurvePoints, color: string) {
    const [p1, p2, c1, c2] = curvePoints;

    c.lineWidth = GRAPHSTYLE.curve.width;
    c.strokeStyle = color;

    c.beginPath();
    c.moveTo(p1[0], p1[1]);
    if (c2) {
        c.bezierCurveTo(c1[0], c1[1], c2[0], c2[1], p2[0], p2[1]);
    } else {
        c.quadraticCurveTo(c1[0], c1[1], p2[0], p2[1]);
    }
    c.stroke();
}

function drawControlPointLines(c: CanvasRenderingContext2D, curvePoints: CurvePoints) {
    const [p1, p2, c1, c2] = curvePoints;

    c.setLineDash([2, 2]);
    c.lineWidth = GRAPHSTYLE.ctrlLine.width;
    c.strokeStyle = GRAPHSTYLE.ctrlLine.color;

    c.beginPath();

    // 2.1. Draw line to control point 1
    c.moveTo(p1[0], p1[1]);
    c.lineTo(c1[0], c1[1]);

    // 2.2. Draw line to control point 2
    if (c2) {
        c.moveTo(p2[0], p2[1]);
        c.lineTo(c2[0], c2[1]);
    } else {
        c.lineTo(p2[0], p2[1]); // close quadratic bezier curve
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

function drawPoint(c: CanvasRenderingContext2D, xy: XY, isControl: boolean, color: string) {
    if (!xy) { return; }
    const [x, y] = xy;

    let style = isControl ? GRAPHSTYLE.cpoint : GRAPHSTYLE.point;

    const circleColor = color || ''; //const circleColor = isControl ? GRAPHSTYLE.circles.fill : color || '';
    const shadowColor = isControl ? GRAPHSTYLE.circles.fill : color ? Color(color).alpha(.5).darken(0.5).hexa() : '';

    // shadow
    c.fillStyle = shadowColor;
    c.beginPath();
    c.arc(x + 1, y + 1, style.radius + 1, style.startAngle, style.endAngle, true);
    c.fill();

    // main circle
    c.lineWidth = isControl ? 5 : GRAPHSTYLE.circles.width;
    c.strokeStyle = isControl ? '#00000040' : '#00000040'; // GRAPHSTYLE.circles.color
    c.fillStyle = circleColor;

    c.beginPath();
    c.arc(x, y, style.radius, style.startAngle, style.endAngle, true);
    c.fill();
    c.stroke();

    // highlight
    c.lineWidth = 1;
    c.strokeStyle = '#ffffffc0';

    c.beginPath();
    c.arc(x, y, style.radius - 4, highligts.a1, highligts.a2, false);
    c.stroke();

    c.beginPath();
    c.arc(x, y, style.radius - 4, highligts.b1, highligts.b2, false);
    c.stroke();
}

export function drawCurve(c: CanvasRenderingContext2D, ln: SingleCurve) {
    const curvePoints: CurvePoints = ln.points;

    drawCurveLine(c, curvePoints, ln.color || '');
    drawControlPointLines(c, curvePoints);
    curvePoints.forEach((point, idx) => drawPoint(c, point, idx > 1, ln.color || ''));
}

const hitZone = Math.pow(GRAPHSTYLE.point.radius, 2);

export function curveHasPoint(line: SingleCurve, pos: PointXY): { line: SingleCurve, idx: number; } | undefined {
    for (const [idx, pt] of Object.entries(line.points)) {
        let dx = pt[0] - pos.x;
        let dy = pt[1] - pos.y;

        if ((dx * dx) + (dy * dy) < hitZone) {
            return { line, idx: +idx };
        }
    }
}
