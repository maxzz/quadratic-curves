import { Previews } from "./shape-preview";

export type PointXY = {
    x: number;
    y: number;
};

export type XY = [x: number, y: number];

export type CurvePoints = [p1: XY, p2: XY, p3: XY] | [p1: XY, p2: XY, p3: XY, p4: XY];

export type SingleCurve = {
    points: CurvePoints;
    color?: string;
};

export type AppContext = {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    code: HTMLPreElement;
    line: SingleCurve[];
    lines: SingleCurve[][];
    current: number;    // current line
    previews: Previews;
    checkDragGroup: HTMLInputElement;
};

export function scaleCurvePts(pts: CurvePoints, factor: number): CurvePoints {
    return pts.map((pt) => {
        const [x, y] = pt;
        return [x * factor, y * factor];
    }) as CurvePoints;
}
