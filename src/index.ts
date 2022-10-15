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

//TODO: points persistence

//TODO: [ ] when points overlapping set the same pos for them
//TODO: [ ] select one from overlapping points under cursor

//TODO: [ ] copy state points
//TODO: [ ] code: js, ts, array, persist JSON
//TODO: [ ] add button to copy state

//TODO: [x] link to GitHub
//TODO: [x] update link and preview on maxzz.github.io
//TODO: [ ] show app version

//TODO: [ ] show/hide control points and show/hide points
//TODO: [x] add line preview as render wo/ circles

//TODO: [x] rectangular marque
//TODO: [x] add move rectangle

//TODO: [ ] add blank preview to add default new blank

//TODO: [ ] add scale factor

//TODO: [x] add point to selection by click
//TODO: [ ] undo/redo

//TODO: [x] show grid
//TODO: [x] snap to grid
//TODO: [ ] add grid step
//TODO: [ ] point selection info
