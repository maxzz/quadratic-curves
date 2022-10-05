import { GRAPHSTYLE, hue } from "./initials";
import { ILine, ILinePosKeys, IPoint, LinePoints } from "./types";
import Color from "color";

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
        const thisPoints = ln.points;

        // 1. Draw curves
        c.lineWidth = GRAPHSTYLE.curve.width;
        c.strokeStyle = ln.color || '';

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

        // 2.1. Draw line cp1
        c.setLineDash([2, 2]);

        c.lineWidth = GRAPHSTYLE.ctrlLine.width;
        c.strokeStyle = GRAPHSTYLE.ctrlLine.color;

        c.beginPath();
        c.moveTo(thisPoints.p1.x, thisPoints.p1.y);
        c.lineTo(thisPoints.cp1.x, thisPoints.cp1.y);

        // 2.1. Draw line cp2
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

            const { x, y } = val;

            let style = isControl ? GRAPHSTYLE.cpoint : GRAPHSTYLE.point;

            //console.log('color', ln.color, Color(ln.color).hexa(), Color(ln.color).alpha(.2).darken(0.5).hexa());

            c.fillStyle = c.fillStyle = isControl ? GRAPHSTYLE.circles.fill : ln.color ? Color(ln.color).alpha(.5).darken(0.5).hexa() : '';
            c.beginPath();
            c.arc(x + 1, y + 1, style.radius + 1, style.startAngle, style.endAngle, true);
            c.fill();

            c.lineWidth = isControl ? 5 : GRAPHSTYLE.circles.width;
            c.strokeStyle = isControl ? '#00000040' : '#00000040'; // GRAPHSTYLE.circles.color
            c.fillStyle = isControl ? GRAPHSTYLE.circles.fill : ln.color || '';


            c.beginPath();
            c.arc(x, y, style.radius, style.startAngle, style.endAngle, true);
            c.fill();
            c.stroke();

            // c.fillStyle = 'green';
            // c.beginPath();
            // c.arc(x + 1, y + 1, style.radius - 1, style.startAngle, style.endAngle, true);
            // c.fill();

            // c.beginPath();
            // c.arc(x, y, style.radius, style.startAngle, style.endAngle, true);
            // c.fill();
            // c.stroke();
        }
    } //drawLine()

} //namespace Line

export function lineHasPoint(line: ILine, pos: IPoint): { line: ILine, member: ILinePosKeys; } | undefined {
    let member: ILinePosKeys | undefined = undefined;

    const hitZone = Math.pow(GRAPHSTYLE.point.radius, 2);

    for (const [key, pt] of Object.entries(line.points)) {
        let dx = pt.x - pos.x;
        let dy = pt.y - pos.y;

        // line.color === 'hsla(240, 100%, 50%, 0.95)' && key === 'p2' &&
        //     console.log(
        //         'pt',
        //         pt,
        //         'mouse',
        //         pos,
        //         'dx,dy',
        //         `${dx}`.padStart(5, ' '),
        //         `${dy}`.padStart(5, ' '),
        //         `    (dx * dx) =`,
        //         `${(dx * dx)}`.padStart(5, ' '),
        //         `    (dy * dy) =`,
        //         `${(dy * dy)}`.padStart(5, ' '),
        //         `(dx2 + dy2) =`,
        //         `${(dx * dx) + (dy * dy)}`.padStart(5, ' '),
        //         (dx * dx) + (dy * dy) < hitZone,
        //         `distance`,
        //         `${Math.sqrt((dx * dx) + (dy * dy))}`
        //     );

        if ((dx * dx) + (dy * dy) < hitZone) {
            return { line, member: key as ILinePosKeys };
        }
    }

    // const point = (Object.entries(line.points) as EntriesTuple<LinePoints>)
    //     .find((point) => {
    //         const key = point?.[0] as ILinePosKeys;
    //         const val = point?.[1];
    //         if (!key || !val) {
    //             return;
    //         }

    //         let dx = val.x - pos.x;
    //         let dy = val.y - pos.y;

    //         if ((dx * dx) + (dy * dy) < GRAPHSTYLE.point.radius * GRAPHSTYLE.point.radius) {
    //             member = key;
    //             return true;
    //         }
    //     });

    // if (member) {
    //     return { line, member };
    // }
}
