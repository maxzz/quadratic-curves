import { AppContext, ILine, linePtsToCurvePts } from "./types";
import { draw } from "./app";

export class Previews {
    appContext: AppContext;
    container: HTMLElement;

    constructor(appContext: AppContext) {
        this.appContext = appContext;
        this.container = document.getElementById('previews')!;
    }

    private singleBox(lines: ILine[], idx: number) {
        const { width, height } = this.appContext.ctx.canvas;

        function lineToPath(ln: ILine) {
            const [p1, p2, c1, c2] = linePtsToCurvePts(ln.points);
            if (c2) {
                return `<path d="M${p1[0]}, ${p1[1]} C ${c1[0]}, ${c1[1]}, ${c2[0]}, ${c2[1]}, ${p2[0]}, ${p2[1]}" stroke="${ln.color}" />`;
            } else {
                return `<path d="M${p1[0]}, ${p1[1]} S ${c1[0]}, ${c1[1]}, ${p2[0]}, ${p2[1]}" stroke="${ln.color}" />`
            }
        }

        return `
            <div class=" 
                hover:bg-slate-800 active:scale-[.97]
                border-slate-400 border rounded shadow shadow-slate-700 cursor-pointer grid items-center justify-center preview-box"
                data-idx="${idx}"
                title="Select this curve for editing"
            >
                <svg class="w-12 h-12" viewBox="0 0 ${width} ${height}" stroke-width="15" fill="none">
                    ${lines.map((line) => lineToPath(line)).join('\n')}
                </svg>
            </div>`;
    }
    //<path d="M39, 18 C 9, 116, 15, 195, 49, 282" stroke="red" stroke-width="20" fill="none" />

    // private singleBox(lines: ILine[], idx: number) {
    //     return `
    //         <div class="p-4 w-12 h-12 
    //             hover:bg-slate-800 active:scale-[.97]
    //             border-slate-400 border rounded shadow shadow-slate-700 cursor-pointer grid items-center justify-center preview-box"
    //             data-idx="${idx}"
    //             title="Select this curve for editing"
    //         >
    //             ${lines.length}
    //         </div>`;
    // }

    private onClick(event: MouseEvent) {
        const el = event.currentTarget as HTMLElement;
        console.log('clcil', el);
        if (el && el.dataset.idx !== undefined) {
            console.log('clcil');
            this.appContext.line = this.appContext.lines[+el.dataset.idx];
            draw(this.appContext);
        }
    }

    onClickBing = this.onClick.bind(this)

    public update() {
        // remove prev listeners
        let boxeEls = [...this.container.querySelectorAll('.preview-box')] as HTMLElement[];
        boxeEls.forEach((box) => box.removeEventListener('click', this.onClickBing));

        // generate
        const boxes = this.appContext.lines.map((line, idx) => this.singleBox(line, idx));
        this.container.innerHTML = boxes.join('\n');

        // add new listeners
        boxeEls = [...this.container.querySelectorAll('.preview-box')] as HTMLElement[];
        boxeEls.forEach((box) => box.addEventListener('click', this.onClickBing));
    }

}
