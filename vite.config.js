import { defineConfig } from 'vite';

export default ({command}) => {
    return defineConfig({
        base: command === 'build' ? '/quadratic-curves/' : '/',
    });
}
