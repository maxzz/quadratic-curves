import { AppContext } from "./types";
import { curveHasPoint } from "./shape-line";
import { SingleCurve, PointXY } from "./types";

type DraggingLine = {
    pt?: PointXY;
    line?: SingleCurve;
    idx: number;
};

function getDragHandlers(appContext: AppContext, draw: (appContext: AppContext) => void) {
    let drag: DraggingLine[] = [];

    function dragStart(event: MouseEvent) {
        //appContext.canvas.setPointerCapture(); //TODO: https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture

        drag = [];
        let pt = mousePos(event);

        // find the nearest point
        for (var i = 0; i < appContext.line.length; i++) {
            var line: SingleCurve = appContext.line[i];

            //line.color === 'hsla(240, 100%, 50%, 0.95)' && console.log('----------', line);

            let res = curveHasPoint(line, pt);
            if (res) {
                drag.push({
                    line: res.line,
                    idx: res.idx,
                    pt: pt,

                });
                if (!appContext.checkDragGroup.checked) {
                    break;
                }
            }
        }

        if (drag.length) {
            //canvas.style.cursor = 'move';
            // canvas.classList.add('cursor-move');
            setTimeout(() => appContext.canvas.classList.add('cursor-move'), 0);
        }
    }

    function dragMove(event: MouseEvent) {
        if (drag.length) {
            let pos = mousePos(event);
            drag.forEach((draggingLine: DraggingLine) => {
                const line = draggingLine.line?.points[draggingLine.idx];
                if (line && draggingLine.pt) {
                    line[0] += pos.x - draggingLine.pt.x;
                    line[1] += pos.y - draggingLine.pt.y;
                    draggingLine.pt = pos;
                }
            });
            draw(appContext);
        }
    }

    function dragDone(event: MouseEvent) {
        drag = [];
        //canvas.style.cursor = 'default';
        appContext.canvas.classList.remove('cursor-move');
        draw(appContext);
    }

    function round(v: number) {
        return Math.round(v);
    }

    function mousePos(event: MouseEvent): PointXY {
        return {
            x: round(event.pageX - appContext.canvas.offsetLeft),
            y: round(event.pageY - appContext.canvas.offsetTop),
        };
    }

    return {
        dragStart,
        dragMove,
        dragDone,
    };
}

export function initDraggingListeners(appContext: AppContext, draw: (appContext: AppContext) => void) {
    const { dragStart, dragMove: dragging, dragDone, } = getDragHandlers(appContext, draw);

    const events: { name: keyof Pick<HTMLElementEventMap, 'mousedown' | 'mousemove' | 'mouseup' | 'mouseout'>, fn: (event: MouseEvent) => void; }[] = [
        { name: 'mousedown', fn: dragStart, },
        { name: 'mousemove', fn: dragging, },
        { name: 'mouseup', fn: dragDone, }, // { name: 'mouseout', fn: dragDone, },
    ];
    events.forEach(({ name, fn }) => appContext.canvas.addEventListener(name, fn));
}
