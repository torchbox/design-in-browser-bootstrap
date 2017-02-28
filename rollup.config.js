// babel transpiles ES6 to ordinary javascript
import babel from 'rollup-plugin-babel';

// resolve and commonjs add support for importing node modules
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

// uses UglifyJS2, and works with transpiled code only: https://github.com/TrySound/rollup-plugin-uglify#warning
import uglify from 'rollup-plugin-uglify';

// run eslint from rollup: it also uses .eslintrc
import eslint from 'rollup-plugin-eslint';

// plugins to display the original size of each import, and the final size of the bundle
import sizes from 'rollup-plugin-sizes';
import filesize from 'rollup-plugin-filesize';

// replace strings in files while bundling them
import replace from 'rollup-plugin-replace';

// handle jsx syntax, used by e.g. react as well
import jsx from 'rollup-plugin-jsx';

let plugins = [
    jsx({
        factory: 'React.createElement'
    }),
    resolve({
        jsnext: true,
        main: true,
        browser: true,
    }),
    commonjs(),
    replace({
        // https://github.com/rollup/rollup/issues/487#issuecomment-177596512
        // TODO: use 'development' mode locally, which supports the React Chrome extension
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    eslint({
        exclude: ['node_modules/**', 'site/javascript/vendor/**']
    }),
    babel(),
];

if(process.env.UGLIFY != '0'){
    plugins.push(uglify());
    plugins.push(sizes());
    plugins.push(filesize());
}


export default {
    entry: `site/javascript/${process.env.entry}`,
    dest: `dist/js/${process.env.entry}`,
    format: 'umd',
    plugins: plugins,
    sourceMap: true,
    globals: {}  // specify globals in .eslintrc to ignore linting errors
};