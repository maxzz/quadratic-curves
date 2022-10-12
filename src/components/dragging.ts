import { AppContext, XY } from "./types";
import { curveHasPoint } from "./shape-line";
import { SingleCurve } from "./types";

type DraggingLine = {
    downPt?: XY;            // Down point to get move delta
    curve?: SingleCurve;    // Curve with curvePtIdx
    curvePtIdx: number;     // Point index inside curve.points[]
};

type RectContext = [down?: XY, current?: XY];

function getDragHandlersContext(appContext: AppContext, updateApp: (appContext: AppContext) => void) {
    let pointContext: DraggingLine[] = [];
    let rectContext: RectContext = [];


    function dragStart(event: MouseEvent) {
        //appContext.canvas.setPointerCapture(); //TODO: https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture

        pointContext = [];
        rectContext = [];

        const downPt = mousePos(event);

        const scene = appContext.scenes[appContext.current] || [];

        // Find the nearest point
        for (let i = 0; i < scene.length; i++) {
            const curve: SingleCurve = scene[i];

            let res = curveHasPoint(curve, downPt);
            if (res) {
                pointContext.push({ curve: res.curve, curvePtIdx: res.curvePtIdx, downPt, }); // So far, it's just one point per curve
                if (!appContext.checkDragGroup.checked) {
                    break;
                }
            }
        }

        if (!pointContext.length) {
            rectContext = [downPt, downPt];
        }

        if (pointContext.length) {
            //canvas.style.cursor = 'move';
            // canvas.classList.add('cursor-move');
            setTimeout(() => appContext.canvas.classList.add('cursor-move'), 0);
        }
    }

    function dragMove(event: MouseEvent) {
        if (pointContext.length) {
            let pos = mousePos(event);
            pointContext.forEach((draggingLine: DraggingLine) => {
                const point = draggingLine.curve?.points[draggingLine.curvePtIdx];
                if (point && draggingLine.downPt) {
                    point[0] += pos[0] - draggingLine.downPt[0];
                    point[1] += pos[1] - draggingLine.downPt[1];
                    draggingLine.downPt = pos;
                }
            });
            updateApp(appContext);
        } else if (rectContext.length) {
            let pos = mousePos(event);
            rectContext[1] = pos;
        }
    }

    function dragDone(event: MouseEvent) {
        pointContext = [];
        rectContext = [];
        //canvas.style.cursor = 'default';
        appContext.canvas.classList.remove('cursor-move');
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
