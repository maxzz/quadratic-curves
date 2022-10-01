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
