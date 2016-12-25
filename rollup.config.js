// babel transpiles ES6 to ordinary javascript
import babel from 'rollup-plugin-babel';

// resolve and commonjs add support for importing node modules
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

// uses UglifyJS2, and works with transpiled code only: https://github.com/TrySound/rollup-plugin-uglify#warning
import uglify from 'rollup-plugin-uglify';


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
        uglify(),  // TODO: run uglify for production build only
    ],
    sourceMap: true,
    globals: {
        // jquery: 'jQuery',
        // window: 'window'
    }
};