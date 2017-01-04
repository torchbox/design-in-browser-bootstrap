// babel transpiles ES6 to ordinary javascript
import babel from 'rollup-plugin-babel';

// resolve and commonjs add support for importing node modules
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

// uses UglifyJS2, and works with transpiled code only: https://github.com/TrySound/rollup-plugin-uglify#warning
import uglify from 'rollup-plugin-uglify';

// run eslint from rollup: it also uses .eslintrc
import eslint from 'rollup-plugin-eslint';


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
        eslint({
            exclude: ['node_modules/**', 'site/javascript/vendor/**']
        }),
        babel(),
        uglify(),  // TODO: run uglify for production build only
    ],
    sourceMap: true,
    globals: {}  // specify globals in .eslintrc to ignore linting errors
};