import { AppContext, ILine } from "./types";

export class Previews {
    appContext: AppContext;
    container: HTMLElement;

    constructor(appContext: AppContext) {
        this.appContext = appContext;
        this.container = document.getElementById('previews')!;
    }


    private singleBox(line: ILine[]) {
        return `
            <div class="p-4 w-12 h-12 border-slate-400 border rounded grid items-center justify-center">
                ${line.length}
            </div>`;
    }

    public update() {
        const boxes = this.appContext.lines.map((line) => {
            return this.singleBox(line);
        });
        this.container.innerHTML = boxes.join('\n');
    }

}
