import { defineConfig } from 'vite';

export default ({command}) => {
    return defineConfig({
        base: '',
        server: {
            port: 3000,
        }
    });
}
