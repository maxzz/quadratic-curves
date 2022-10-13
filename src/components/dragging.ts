import { AppContext, Rect, RectPoints, Scene, XY } from "./types";
import { SingleCurve } from "./types";
import { curveHasPoint, pointInRect, rectFromPoints } from "../utils/utils-math";

function markPointsInRect(scene: Scene, isShift: boolean, isCtrl: boolean, rect?: Rect | undefined): void {
    //console.log(`markPointsInRect isShift: ${isShift}, isCtrl: ${isCtrl}, rect: ${rect && JSON.stringify(rect)}`);

    //console.log(`markPointsInRect isShift: ${isShift}, isCtrl: ${isCtrl}, rect: ${rect}`);

    scene.forEach((curve: SingleCurve) => {
        curve.points.forEach((point) => {
            if (rect) {
                const inRect = pointInRect(point, rect);
                if (inRect) {
                    point[2] = true;
                } else {
                    if (!isShift) {
                        point[2] = false;
                    }
                }
            } else {
                if (!isShift) {
                    point[2] = false;
                }
            }

            //point[2] = rect ? pointInRect(point, rect) : false;
        });
    });
}

function getDragHandlersContext(appContext: AppContext, updateApp: (appContext: AppContext) => void) {
    let pointContext: XY[] = [];
    let rectContext: RectPoints | null = null;
    let downPt: XY = [0, 0]; // Down point to get move delta
    let isShift = false;
    let isCtrl = false;

    function dragStart(event: MouseEvent) {
        //appContext.canvas.setPointerCapture(); //TODO: https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture

        pointContext = [];
        rectContext = null;
        appContext.rect = undefined;

        downPt = mousePos(event);
        isShift = event.shiftKey;
        isCtrl = event.ctrlKey;

        const scene = appContext.scenes[appContext.current] || [];
        const workWithGroup = appContext.checkDragGroup.checked;

        // Find the nearest point to mouse hit
        for (let curveIdx = 0; curveIdx < scene.length; curveIdx++) {
            let res = curveHasPoint(scene[curveIdx].points, downPt);
            if (res.length) {
                if (workWithGroup) {
                    pointContext.push(...res);
                } else {
                    pointContext.push(res[0]);
                    break;
                }
            }
        }

        if (!pointContext.length) {
            rectContext = [downPt, downPt];
        }

        // if (pointContext.length) {
        //     //canvas.style.cursor = 'move';
        //     // canvas.classList.add('cursor-move');
        //     setTimeout(() => appContext.canvas.classList.add('cursor-move'), 0);
        // }
    }

    function dragMove(event: MouseEvent) {
        if (pointContext.length) {
            let mouse = mousePos(event);
            const [dx, dy] = [mouse[0] - downPt[0], mouse[1] - downPt[1]];

            pointContext.forEach((pt: XY) => {
                pt[0] += dx;
                pt[1] += dy;
            });

            downPt = mouse;
            updateApp(appContext);
        } else if (rectContext) {
            isCtrl = event.ctrlKey;
            let pos = mousePos(event);
            //console.log('shift,ctrl', isShift, isCtrl);

            rectContext[1] = pos;
            appContext.rect = rectFromPoints(rectContext);

            if (appContext.rect) {
                markPointsInRect(appContext.scenes[appContext.current], isShift, isCtrl, appContext.rect);
            }

            updateApp(appContext);
        }
    }

    function dragDone(event: MouseEvent) {
        const isMoved = rectContext && rectContext[0] !== rectContext[1];

        let isClickWoMove = !isShift;
        if (isClickWoMove) {
            isClickWoMove = !isMoved;
        }
        //console.log('isShift', isShift, 'isMoved', isMoved, 'isClickWoMove =', isClickWoMove, 'rectContext[0][1] =', rectContext?.[0], rectContext?.[1]);

        if (isClickWoMove) {
            //console.log('clear');
            markPointsInRect(appContext.scenes[appContext.current], false, false);
        }

        pointContext = [];
        rectContext = null;
        appContext.rect = undefined;

        //canvas.style.cursor = 'default';
        // appContext.canvas.classList.remove('cursor-move');
        
        updateApp(appContext);
    }

    function mousePos(event: MouseEvent): XY {
        return [
            Math.round(event.pageX - appContext.canvas.offsetLeft),
            Math.round(event.pageY - appContext.canvas.offsetTop),
        ];
    }

    return {
        dragStart,
        dragMove,
        dragDone,
    };
}

export function initDraggingListeners(appContext: AppContext, updateApp: (appContext: AppContext) => void) {
    const { dragStart, dragMove, dragDone, } = getDragHandlersContext(appContext, updateApp);

    const events: { name: keyof Pick<HTMLElementEventMap, 'mousedown' | 'mousemove' | 'mouseup' | 'mouseout'>, fn: (event: MouseEvent) => void; }[] = [
        { name: 'mousedown', fn: dragStart, },
        { name: 'mousemove', fn: dragMove, },
        { name: 'mouseup', fn: dragDone, }, // { name: 'mouseout', fn: dragDone, },
    ];
    events.forEach(({ name, fn }) => appContext.canvas.addEventListener(name, fn));
}
