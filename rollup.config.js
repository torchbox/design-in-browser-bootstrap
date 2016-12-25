// babel transpiles ES6 to ordinary javascript
import babel from 'rollup-plugin-babel';

// resolve and commonjs add support for importing node modules
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    entry: 'site/javascript/main.js',
    dest: 'dist/js/main.js',
    format: 'umd',
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        commonjs(),
        babel(),
    ],
    sourceMap: true,
    globals: {
        // jquery: 'jQuery',
        // window: 'window'
    }
};