import { GRAPHSTYLE, hue } from "./initials";
import { ILine, ILinePosKeys, IPoint, LinePoints } from "./types";

export namespace Line {
    export function initLine(quad: boolean, n: number): ILine {
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

        if (quad) {
            delete line.points.cp2;
        }

        Object.values(line.points).forEach((val) => val.x = val.x + n * 80);

        line.color = hue(n * 40);

        return line;
    }

    export function drawLine(c: CanvasRenderingContext2D, ln: ILine) {
        // curve
        c.lineWidth = GRAPHSTYLE.curve.width;
        c.strokeStyle = ln.color || '';

        const thisPoints = ln.points;

        c.beginPath();
        c.moveTo(thisPoints.p1.x, thisPoints.p1.y);

        if (thisPoints.cp2) {
            c.bezierCurveTo(thisPoints.cp1.x, thisPoints.cp1.y, thisPoints.cp2.x, thisPoints.cp2.y, thisPoints.p2.x, thisPoints.p2.y);
        } else {
            c.quadraticCurveTo(thisPoints.cp1.x, thisPoints.cp1.y, thisPoints.p2.x, thisPoints.p2.y);
        }
        c.stroke();
        // c.fillStyle = 'black';
        // c.fill();

        // lines
        c.lineWidth = GRAPHSTYLE.pline.width;
        c.strokeStyle = GRAPHSTYLE.pline.color;

        c.beginPath();
        c.moveTo(thisPoints.p1.x, thisPoints.p1.y);
        c.lineTo(thisPoints.cp1.x, thisPoints.cp1.y);

        if (thisPoints.cp2) {
            c.moveTo(thisPoints.p2.x, thisPoints.p2.y);
            c.lineTo(thisPoints.cp2.x, thisPoints.cp2.y);
        } else {
            c.lineTo(thisPoints.p2.x, thisPoints.p2.y);
        }

        c.stroke();

        // control points
        for (const [key, val] of Object.entries(ln.points)) {
            let isControl = key === 'cp1' || key === 'cp2';

            c.lineWidth = isControl ? GRAPHSTYLE.cpoint.width : GRAPHSTYLE.circles.width;
            c.strokeStyle = GRAPHSTYLE.circles.color;
            c.fillStyle = isControl ? GRAPHSTYLE.circles.fill : ln.color || '';

            let stl = isControl ? GRAPHSTYLE.cpoint : GRAPHSTYLE.point;

            c.beginPath();
            c.arc(val.x, val.y, stl.radius, stl.arc1, stl.arc2, true);
            c.fill();
            c.stroke();
        }
    } //drawLine()

} //namespace Line

export function lineHasPoint(line: ILine, pos: IPoint): { line: ILine, member: ILinePosKeys; } | undefined {
    let member: ILinePosKeys | undefined = undefined;

    const point = (Object.entries(line.points) as EntriesTuple<LinePoints>)
        .find((point) => {
            const key = point?.[0] as ILinePosKeys;
            const val = point?.[1];
            if (!key || !val) {
                return;
            }

            let dx = val.x - pos.x;
            let dy = val.y - pos.y;

            if ((dx * dx) + (dy * dy) < GRAPHSTYLE.point.radius * GRAPHSTYLE.point.radius) {
                member = key;
                return true;
            }
        });

    if (member) {
        return { line, member };
    }
}
