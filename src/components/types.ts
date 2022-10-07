import { Previews } from "./shape-preview";

export interface IPoint {
    x: number;
    y: number;
}

export type LinePoints = {
    p1: IPoint; // starting point
    p2: IPoint; // end point
    cp1: IPoint;
    cp2?: IPoint;   // will be missing in case of quad
}

export interface ILine {
    points: LinePoints;
    color?: string;
}

export type ILinePosKeys = keyof LinePoints;

export type AppContext = {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    code: HTMLPreElement;
    line: ILine[];
    lines: ILine[][];
    current: number;    // current line
    previews: Previews;
    checkDragGroup: HTMLInputElement;
};

export type XY = [x: number, y: number];

export type CurvePoints = [p1: XY, p2: XY, p3: XY] | [p1: XY, p2: XY, p3: XY, p4: XY];

export function linePtsToCurvePts(pts: LinePoints): CurvePoints {
    const curvePoints: CurvePoints = [[pts.p1.x, pts.p1.y], [pts.p2.x, pts.p2.y], [pts.cp1.x, pts.cp1.y],];
    if (pts.cp2) {
        curvePoints.push([pts.cp2.x, pts.cp2.y]);
    }
    return curvePoints;
}

export function scaleCurvePts(pts: CurvePoints, factor: number): CurvePoints {
    return pts.map((pt) => {
        const [x, y] = pt;
        return [x * factor, y * factor];
    }) as CurvePoints;
}
