import { draw } from "./app";
import { AppContext, ILine } from "./types";

export class Previews {
    appContext: AppContext;
    container: HTMLElement;

    constructor(appContext: AppContext) {
        this.appContext = appContext;
        this.container = document.getElementById('previews')!;
    }

    private singleBox(line: ILine[], idx: number) {
        return `
            <div class="p-4 w-12 h-12 
                hover:bg-slate-800 active:scale-[.97]
                border-slate-400 border rounded shadow shadow-slate-700 cursor-pointer grid items-center justify-center preview-box"
                data-idx="${idx}"
                title="Select this curve for editing"
            >
                ${line.length}
            </div>`;
    }

    public update() {
        const boxes = this.appContext.lines.map((line, idx) => {
            return this.singleBox(line, idx);
        });
        this.container.innerHTML = boxes.join('\n');

        const boxeEls = [...this.container.querySelectorAll('.preview-box')] as HTMLElement[];
        boxeEls.forEach((box) => {
            box.addEventListener('click', (event) => {
                const el = event.target as HTMLElement;
                if (el && el.dataset.idx !== undefined) {
                    this.appContext.line = this.appContext.lines[+el.dataset.idx];
                    draw(this.appContext);
                }
            })
        })
    }

}
