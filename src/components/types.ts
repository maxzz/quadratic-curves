import { Previews } from "./shape-preview";

export type XY = [x: number, y: number] | [x: number, y: number, selected?: boolean];

export type CurvePoints = [p1: XY, p2: XY, p3: XY] | [p1: XY, p2: XY, p3: XY, p4: XY];

export type SingleCurve = {
    points: CurvePoints;
    color: string;
};

export type Scene = SingleCurve[];

export type AppContext = {
    scenes: Scene[];
    current: number;    // current line: -1 if there is none
  
    canvas: HTMLCanvasElement;
    previews: Previews;
    code: HTMLPreElement;
    btnCopy: HTMLButtonElement;
    checkDragGroup: HTMLInputElement;
    checkHidePoints: HTMLInputElement;

    ctx: CanvasRenderingContext2D;
};

export function scaleCurvePts(pts: CurvePoints, factor: number): CurvePoints {
    return pts.map((pt) => {
        const [x, y] = pt;
        return [x * factor, y * factor];
    }) as CurvePoints;
}
