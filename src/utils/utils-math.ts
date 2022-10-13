import { GRAPHSTYLE } from "../components/initials";
import { CurvePoints, Rect, RectPoints, SingleCurve, XY } from "../components/types";

export function degToRad(degrees: number) {
	return degrees * Math.PI / 180;
}

export function radToDeg(radians: number) {
	return radians * 180 / Math.PI;
}

export function clamp(min: number, val: number, max: number) {
	return Math.min(Math.max(val, min), max);
}

function pointsCollocated(a: XY | undefined, b: XY | undefined) {
    return a?.[0] === b?.[0] && a?.[1] === b?.[1];
}

function arePointsTheSame(rect: RectPoints) {
    if (!rect.length || rect[0] === rect[1]) {
        return true;
    }
    if (!rect[0] || !rect[1]) {
        return false;
    }
    const theSame = rect[0][0] === rect[1][0] && rect[0][1] === rect[1][1];
    return theSame;
}

export function rectFromPoints(rectContext: RectPoints): Rect | undefined {
    const isEmpty = arePointsTheSame(rectContext);
    if (isEmpty) {
        return;
    }

    const [p1, p2] = rectContext;
    let [ax, ay] = p1!;
    let [bx, by] = p2!;

    (ax > bx) && ([bx, ax] = [ax, bx]);
    (ay > by) && ([by, ay] = [ay, by]);

    const w = bx - ax;
    const h = by - ay;

    return { x: ax, y: ay, w, h };
}

export function pointInRect(point: XY, rect: Rect): boolean {
    const [px, py] = point;
    const { x, y, w, h } = rect;
    return x <= px && px <= x + w && y <= py && py <= y + h;
}

export function nearbyPoints([ax, ay]: XY, [bx, by]: XY, zoneA: number) {
    let dx = ax - bx;
    let dy = ay - by;
    return (dx * dx) + (dy * dy) < Math.pow(zoneA, 2);
}

const hitZone = Math.pow(GRAPHSTYLE.point.radius, 2);

export function curveHasPoint(points: CurvePoints, [mouseX, mouseY]: XY): XY[] {
    
    const impacted = points.reduce((acc, cur) => {
        let dx = cur[0] - mouseX;
        let dy = cur[1] - mouseY;
        if ((dx * dx) + (dy * dy) < hitZone) {
            acc.push(cur);
        }
        return acc;
    }, [] as XY[]);

    return impacted;
}
// export function curveHasPoint(curve: SingleCurve, [mouseX, mouseY]: XY): { curve: SingleCurve, curvePtIdx: number; } | undefined {
//     for (const [idx, [x, y]] of Object.entries(curve.points)) {
//         let dx = x - mouseX;
//         let dy = y - mouseY;

//         if ((dx * dx) + (dy * dy) < hitZone) {
//             return { curve, curvePtIdx: +idx };
//         }
//     }
// }
