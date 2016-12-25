import babel from 'rollup-plugin-babel';

export default {
    entry: 'site/javascript/main.js',
    dest: 'dist/js/main.js',
    format: 'umd',
    plugins: [ babel() ],
    sourceMap: true,
    globals: {
        // jquery: 'jQuery',
        // window: 'window'
    }
};