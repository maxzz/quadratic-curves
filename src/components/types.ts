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
    ctx: CanvasRenderingContext2D;
    lines: SingleCurve[][];
    current: number;    // current line
  
    canvas: HTMLCanvasElement;
    previews: Previews;
    code: HTMLPreElement;
    btnCopy: HTMLButtonElement;
    checkDragGroup: HTMLInputElement;
};

export function scaleCurvePts(pts: CurvePoints, factor: number): CurvePoints {
    return pts.map((pt) => {
        const [x, y] = pt;
        return [x * factor, y * factor];
    }) as CurvePoints;
}
