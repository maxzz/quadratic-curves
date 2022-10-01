export interface IPoint {
    x: number;
    y: number;
}

export interface ILine {
    p1: IPoint; // starting point
    p2: IPoint; // end point
    cp1?: IPoint;
    cp2?: IPoint;
    color?: string;
}
