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
