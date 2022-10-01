import { AppContext } from "..";
import { lineHasPoint } from "./Line";
import { ILine, ILinePosKeys, IPoint } from "./types";

type DraggingLine = {
    pt?: IPoint;
    line?: ILine;
    member: ILinePosKeys | null;
};

export function initDrag(appContext: AppContext, draw: () => void) {
    let drag: DraggingLine[] = [];

    function dragStart(event: MouseEvent) {
        drag = [];
        let pt = mousePos(event);

        // find the nearest point
        for (var i = 0; i < appContext.lines.length; i++) {
            var line: ILine = appContext.lines[i];

            let res = lineHasPoint(line, pt);
            if (res) {
                drag.push({
                    line: res.line,
                    member: res.member,
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

    function dragging(event: MouseEvent) {
        if (drag.length) {
            let pos = mousePos(event);
            drag.forEach((item: DraggingLine) => {
                const line = item.member && item.line?.[item.member];
                if (line && item.pt) {
                    line.x += pos.x - item.pt.x;
                    line.y += pos.y - item.pt.y;
                    item.pt = pos;
                }
            });
            draw();
        }
    }

    function dragDone(event: MouseEvent) {
        drag = [];
        //canvas.style.cursor = 'default';
        appContext.canvas.classList.remove('cursor-move');
        draw();
    }

    function mousePos(event: MouseEvent): IPoint {
        return {
            x: event.pageX - appContext.canvas.offsetLeft,
            y: event.pageY - appContext.canvas.offsetTop
        };
    }

    return {
        dragStart,
        dragging,
        dragDone,
    };
}
