import { AppContext, SingleCurve } from "./types";
import { updateApp } from "./app";

function lineToPath(ln: SingleCurve) {
    const [p1, p2, c1, c2] = ln.points;
    if (c2) {
        return `<path d="M${p1[0]}, ${p1[1]} C ${c1[0]}, ${c1[1]}, ${c2[0]}, ${c2[1]}, ${p2[0]}, ${p2[1]}" stroke="${ln.color}" />`;
    } else {
        return `<path d="M${p1[0]}, ${p1[1]} S ${c1[0]}, ${c1[1]}, ${p2[0]}, ${p2[1]}" stroke="${ln.color}" />`;
    }
}

export class Previews {
    private appContext: AppContext;
    private container: HTMLElement;

    constructor(appContext: AppContext) {
        this.appContext = appContext;
        this.container = document.getElementById('previews')!;
    }

    private frame(innerItem: string, idx: number, isCurrent: boolean) {
        const title = idx === -1 ? 'Create new scene': `Line: ${idx}. Click to select this curve for editing`;
        return `
            <div class="hover:bg-slate-800 border-slate-400 border rounded shadow shadow-slate-700 cursor-pointer active:scale-[.97] grid items-center justify-center preview-box ${isCurrent?'ring-1 ring-offset-2 ring-offset-slate-800 ring-sky-500':''}"
                data-idx="${idx}"
                title="${title}"
            >
                ${innerItem}
            </div>`;
    }
    
    private frameSvg(lines: SingleCurve[], idx: number, isCurrent: boolean) {
        const { width, height } = this.appContext.ctx.canvas;
        const svg = `
            <svg class="w-12 h-12" viewBox="0 0 ${width} ${height}" stroke-width="15" fill="none">
                ${lines.map((line) => lineToPath(line)).join('\n')}
            </svg>`;
        return this.frame(svg, idx, isCurrent);
    }

    // private singleBox(lines: SingleCurve[], idx: number, isCurrent: boolean) {
    //     const { width, height } = this.appContext.ctx.canvas;
    //     return `
    //         <div class="hover:bg-slate-800 border-slate-400 border rounded shadow shadow-slate-700 cursor-pointer active:scale-[.97] grid items-center justify-center preview-box ${isCurrent?'ring-1 ring-offset-2 ring-offset-slate-800 ring-sky-500':''}"
    //             data-idx="${idx}"
    //             title="Line: ${idx}. Click to select this curve for editing"
    //         >
    //             <svg class="w-12 h-12" viewBox="0 0 ${width} ${height}" stroke-width="15" fill="none">
    //                 ${lines.map((line) => lineToPath(line)).join('\n')}
    //             </svg>
    //         </div>`;
    // }

    private onClickSelectcurve = (event: MouseEvent) => {
        const el = event.currentTarget as HTMLElement;
        if (el && el.dataset.idx !== undefined) {
            this.appContext.current = +el.dataset.idx;
            this.appContext.line = this.appContext.lines[this.appContext.current];
            updateApp(this.appContext);
        }
    }

    public update() {
        // remove prev listeners
        let boxeEls = [...this.container.querySelectorAll('.preview-box')] as HTMLElement[];
        boxeEls.forEach((box) => box.removeEventListener('click', this.onClickSelectcurve));

        // generate
        const boxes = this.appContext.lines.map((line, idx) => this.frameSvg(line, idx, idx === this.appContext.current));
        this.container.innerHTML = boxes.join('\n');

        // add new listeners
        boxeEls = [...this.container.querySelectorAll('.preview-box')] as HTMLElement[];
        boxeEls.forEach((box) => box.addEventListener('click', this.onClickSelectcurve));
    }
}
