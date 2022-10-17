import { AppContext } from './components/types';
import { initAppContext, initApp } from './components/app';
import './index.css';

function main() {
    const appContext: AppContext = initAppContext()!;
    if (!appContext) {
        return;
    }
    initApp(appContext);
}

main();

//TODO: [x] code: js, ts, array, persist JSON
//TODO: [x] copy state points
//TODO: [x] add button to copy state

//TODO: [x] link to GitHub
//TODO: [x] update link and preview on maxzz.github.io
//TODO: [ ] show app version

//TODO: [x] show/hide all control points
//TODO: [x] add line preview as render wo/ circles

//TODO: [x] rectangular marque
//TODO: [x] add move rectangle

//TODO: [x] add blank preview to add default new blank

//TODO: [x] add point to selection by click
//TODO: [x] point selection info

//TODO: [x] show grid
//TODO: [ ] snap to grid
//TODO: [ ] add grid step
//TODO: [ ] add scale factor
//TODO: [ ] draw selection boundary to allow scale
//TODO: [ ] slide point to duplicate: need to know points on path
//TODO: [ ] solid scene background wo/ gradient

//TODO: [ ] when points overlapping set the same pos for them
//TODO: [ ] select one from overlapping points under cursor

//TODO: [ ] switch cubic/quadratic
//TODO: [ ] add/remove points to curve
//TODO: [ ] merge/split curves
//TODO: [ ] switch to pointer events instead of mouse events, and capture mouse

//TODO: [ ] points persistence, i.e. local storage
//TODO: [ ] undo/redo
