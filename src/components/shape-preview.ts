import { AppContext, Scene, SingleCurve } from "./types";
import { updateApp } from "./app";
import { generateDefaultScene } from "./shape-line";
import { clamp } from "../utils/utils-math";

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

    private frame(innerItem: string, idx: number, isCurrent: boolean, operation?: string) {
        const title = idx === -1 ? 'Create new scene' : `Line: ${idx}. Click to select this curve for editing`;
        return `
            <div class="preview-box relative group hover:bg-slate-800 border-slate-400 shadow-slate-700 border rounded shadow cursor-pointer active:scale-[.97] grid items-center justify-center ${isCurrent ? 'ring-2 ring-offset-[2px] ring-offset-slate-900 ring-sky-500' : ''}"
                data-idx="${idx}"
                ${operation ? `data-op="${operation}"` : ''}
                title="${title}"
            >
                ${innerItem}
            </div>`;
    }

    private frameSvg(scene: Scene, idx: number, isCurrent: boolean) {
        const { width, height } = this.appContext.ctx.canvas;
        const svg = `
            <svg class="w-12 h-12" viewBox="0 0 ${width} ${height}" stroke-width="15" fill="none">
                ${scene.map((line) => lineToPath(line)).join('\n')}
            </svg>
            ${this.frameBtnDelete(idx)}`;
        return this.frame(svg, idx, isCurrent);
    }

    private frameBtnAdd() {
        const { width, height } = this.appContext.ctx.canvas;
        const [w12, h12, l1, l2] = [width / 2, height / 2, 0.3, 0.7];
        const cross = `M${w12} ${height * l1} L${w12} ${height * l2} M${width * l1} ${h12} L ${width * l2} ${h12}`;
        const svg = `
            <svg class="w-6 h-6 text-slate-500" viewBox="0 0 ${width} ${height}" stroke-width="25" fill="none">
                <path d="${cross}" stroke="currentColor" />
            </svg>`;
        return this.frame(svg, -1, false, 'add');
    }

    private frameBtnDelete(idx: number) {
        const { width, height } = this.appContext.ctx.canvas;
        const [l1, l2] = [0.3, 0.7];
        const cross = `M${width * l1} ${height * l2} L${width * l2} ${height * l1} M${width * l1} ${height * l1} L ${width * l2} ${height * l2}`;
        //
        const svg = `
            <svg class="preview-box hidden group-hover:block absolute right-0.5 top-0.5 w-5 h-5 text-slate-200 bg-red-500 border-red-300 border rounded animate-fade-in" viewBox="0 0 ${width} ${height}" stroke-width="45" data-idx="${idx}" data-op="del">
                <path d="${cross}" stroke="currentColor" />
            </svg>`;
        return svg;
    }

    private onClickSelectcurve = (event: MouseEvent) => {
        const el = event.currentTarget as HTMLElement;
        if (el && el.dataset.idx !== undefined) {
            const idx = +el.dataset.idx;
            const op = el.dataset.op;
            if (op === 'del') {
                if (this.appContext.scenes.length > 0 && idx !== -1) {
                    this.appContext.scenes.splice(idx, 1);
                    this.appContext.current = clamp(0, idx, this.appContext.scenes.length - 1);
                    updateApp(this.appContext);
                }
            } else if (op === 'add') {
                const newScene = generateDefaultScene({ nLines: 9, doQuad: true });
                this.appContext.scenes.push(newScene);
                this.appContext.current = this.appContext.scenes.length - 1;
                updateApp(this.appContext);
            } else if (idx !== -1) {
                this.appContext.current = idx;
                updateApp(this.appContext);
            }
        }
    };

    public update() {
        // remove prev listeners
        let boxeEls = [...this.container.querySelectorAll('.preview-box')] as HTMLElement[];
        boxeEls.forEach((box) => box.removeEventListener('click', this.onClickSelectcurve));

        // generate
        const boxes = this.appContext.scenes.map((line, idx) => this.frameSvg(line, idx, idx === this.appContext.current));
        this.container.innerHTML = boxes.join('\n') + this.frameBtnAdd();

        // add new listeners
        boxeEls = [...this.container.querySelectorAll('.preview-box')] as HTMLElement[];
        boxeEls.forEach((box) => box.addEventListener('click', this.onClickSelectcurve));
    }
}
