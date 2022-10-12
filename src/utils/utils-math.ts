import { Rect, RectContext, XY } from "../components/types";

export function degToRad(degrees: number) {
	return degrees * Math.PI / 180;
}

export function radToDeg(radians: number) {
	return radians * 180 / Math.PI;
}

export function clamp(min: number, val: number, max: number) {
	return Math.min(Math.max(val, min), max);
}

export function pointsCollocated(a: XY | undefined, b: XY | undefined) {
    return a?.[0] === b?.[0] && a?.[1] === b?.[1];
}

function arePointsTheSame(rect: RectContext) {
    if (!rect.length || rect[0] === rect[1]) {
        return true;
    }
    if (!rect[0] || !rect[1]) {
        return false;
    }
    const theSame = rect[0][0] === rect[1][0] && rect[0][1] === rect[1][1];
    return theSame;
}

export function pointsToRect(rectContext: RectContext): Rect | undefined {
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
    return x <= px && x <= x + w && y <= py && y <= y + h;
}
