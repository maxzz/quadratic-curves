import { AppContext, Rect, RectPoints, Scene, XY } from "./types";
import { SingleCurve } from "./types";
import { getSceneSelected, hasSelected, hitTest, impactedPoints, pointInRect, rectFromPoints } from "../utils/utils-math";

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
        });
    });
}

function getDragHandlersContext(appContext: AppContext, updateApp: (appContext: AppContext) => void) {
    let hitOnly: XY[] = [];                     // Points from mouse down position
    let hitContext: XY[] = [];                  // Points from mouse down position plus all other selected
    let rectPoints: RectPoints | null = null;
    let downPt: XY = [0, 0];                    // Mouse down/move point to get move delta
    let moved: boolean;                         // true when mouse moved after down
    let isShift = false;
    let isCtrl = false;

    function dragStart(event: MouseEvent) {
        //appContext.canvas.setPointerCapture(); //TODO: https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture

        hitOnly = [];
        hitContext = [];
        rectPoints = null;
        appContext.rect = undefined;

        downPt = mousePos(event);
        moved = false;
        isShift = event.shiftKey;
        isCtrl = event.ctrlKey;

        const scene = appContext.scenes[appContext.current] || [];
        const workWithGroup = appContext.checkDragGroup.checked;

        // Find the nearest point to mouse hit
        for (let curveIdx = 0; curveIdx < scene.length; curveIdx++) {
            let res = impactedPoints(scene[curveIdx].points, downPt);
            if (res.length) {
                if (workWithGroup) {
                    hitOnly.push(...res);
                } else {
                    hitOnly.push(res[0]);
                    break;
                }
            }
        }

        hitContext = [...hitOnly];

        if (hitContext.length) {
            const areSelectedInHit = hasSelected(hitContext);
            if (areSelectedInHit || isShift) {
                const downSelection = getSceneSelected(scene);
                hitContext.push(...downSelection);
                const uniContext = new Set(hitContext);
                hitContext = [...uniContext.values()];
            } else {
                markPointsInRect(appContext.scenes[appContext.current], false, false);
            }
        } else {
            rectPoints = [downPt, downPt];
        }
    }

    function dragMove(event: MouseEvent) {
        moved = true;

        let mousePt = mousePos(event);
        const scene = appContext.scenes[appContext.current] || []; //TODO: this is unless we don't capture mouse
        appContext.canvas.classList[hitTest(scene, mousePt) ? 'add' : 'remove']('cursor-tm-move');

        if (hitContext.length) {
            const [dx, dy] = [mousePt[0] - downPt[0], mousePt[1] - downPt[1]];
            hitContext.forEach((pt: XY) => { pt[0] += dx; pt[1] += dy; });
            downPt = mousePt;
            updateApp(appContext);
        } else if (rectPoints) {
            isCtrl = event.ctrlKey;
            rectPoints[1] = mousePt;
            appContext.rect = rectFromPoints(rectPoints);
            appContext.rect && markPointsInRect(appContext.scenes[appContext.current], isShift, isCtrl, appContext.rect);
            updateApp(appContext);
        }
    }

    function dragDone(event: MouseEvent) {
        let clearSelection = !isShift && !moved;

        if (isShift && !moved && hitOnly.length) {
            hitOnly.forEach((pt) => pt[2] = !pt[2]);
            clearSelection = false;
        }

        //console.log('isShift', isShift, 'isMoved', isMoved, 'isClickWoMove =', isClickWoMove, 'rectContext[0][1] =', rectContext?.[0], rectContext?.[1]);

        if (clearSelection) {
            //console.log('clear');
            markPointsInRect(appContext.scenes[appContext.current], false, false);
        }

        hitContext = [];
        rectPoints = null;
        appContext.rect = undefined;

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
