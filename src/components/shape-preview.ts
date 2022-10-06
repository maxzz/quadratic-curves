import { AppContext } from "./types";

export class Previews {
    container: HTMLElement;

    constructor(appContext: AppContext) {
        this.container = document.getElementById('previews')!;
    }

}
